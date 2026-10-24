/**
 * Host half of the Cyberpunk 2077 theme bundle.
 *
 * The visual work lives in the browser module (`client.js`). This file only
 * exists for one reason: the Client half cannot read local image bytes, so the
 * Wallpaper Engine library is scanned here (real `fs` access) and served over
 * two same-origin routes on the Harness web server:
 *
 *   GET /cp2077-wallpaper/index       -> { ok, root, count, items: [...] }
 *   GET /cp2077-wallpaper/file/<id>   -> the project's `preview` image bytes
 *   GET /cp2077-wallpaper/still/<id>  -> a full-resolution frame pulled out of a
 *                                       video project with ffmpeg (cached on disk),
 *                                       falling back to the preview image
 *   GET /cp2077-wallpaper/anim/<id>   -> a short looping animated WebP encoded from
 *                                       the same video (cached on disk). Animated
 *                                       images still run in background-image, unlike
 *                                       <video>, which this WebView never composites.
 *
 * Everything is read-only, path-traversal guarded, and degrades to an empty
 * list when the library is missing.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile, execFileSync } from 'node:child_process';

const SOURCE = '@local/cp2077-theme';
const ROUTE_PREFIX = '/cp2077-wallpaper';
const SCAN_TTL_MS = 60_000;

/** Wallpaper Engine's Steam app id. Workshop content always lives under
 *  <library>/steamapps/workshop/content/<appid>, so one id is all we need to
 *  turn any Steam library folder into a wallpaper root. */
const WORKSHOP_APP_ID = '431960';

/** Only used when detection finds nothing at all, so `/index` still reports a
 *  plausible path instead of an empty string. */
const FALLBACK_ROOT = 'G:/steam/steamapps/workshop/content/431960';

const IMAGE_TYPES = new Map([
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.gif', 'image/gif'],
  ['.webp', 'image/webp'],
]);

const VIDEO_TYPES = new Map([
  ['.mp4', 'video/mp4'],
  ['.webm', 'video/webm'],
  ['.mov', 'video/quicktime'],
]);

/** Where extracted video frames are cached. Wallpaper covers are only 1024px
 *  wide while many videos are 4K, so a native frame is dramatically sharper
 *  once the backdrop covers the whole window. */
const STILL_DIR = path.join(os.tmpdir(), 'cp2077-stills');
const STILL_MAX_WIDTH = 2560;
const stillJobs = new Map();

/** Animated WebP settings kept deliberately modest: the backdrop sits behind a
 *  wash, so a 1600px loop reads sharper than the 1024px cover while staying
 *  small enough to decode smoothly (a few MB, encoded once and cached). */
const ANIM_DIR = path.join(os.tmpdir(), 'cp2077-anim');
const ANIM_WIDTH = 1600;
const ANIM_FPS = 12;
const ANIM_SECONDS = 8;
const ANIM_QUALITY = 68;
/* ANIM_WIDTH / ANIM_FPS / ANIM_QUALITY describe the first rung of ANIM_TIERS;
 *  they stay exported so the older single-pass callers keep working. */
const animJobs = new Map();

/** A single loop from an 8K source can land above 20 MB, so the encoder walks
 *  this ladder until the result fits the per-file budget. */
const ANIM_TIERS = [
  { width: 1600, fps: 12, quality: 68 },
  { width: 1280, fps: 10, quality: 52 },
  { width: 960, fps: 8, quality: 38 },
];
const ANIM_MAX_BYTES = 8 * 1024 * 1024;

/** Both cache folders live under the OS temp dir, so they are budgeted and
 *  pruned together. Without a cap every wallpaper ever previewed would stay
 *  on disk forever. */
const CACHE_MAX_BYTES = 200 * 1024 * 1024;

function cacheDirs() {
  return [ANIM_DIR, STILL_DIR];
}

/** Newest first. Missing folders are simply skipped. */
function cacheEntries() {
  const entries = [];
  for (const dir of cacheDirs()) {
    let names = [];
    try {
      names = fs.readdirSync(dir);
    } catch {
      names = [];
    }
    for (const name of names) {
      const file = path.join(dir, name);
      try {
        const stat = fs.statSync(file);
        if (!stat.isFile()) continue;
        entries.push({ file, bytes: stat.size, at: stat.mtimeMs });
      } catch {
        /* vanished mid-scan */
      }
    }
  }
  entries.sort((a, b) => b.at - a.at);
  return entries;
}

function cacheStats() {
  const entries = cacheEntries();
  let bytes = 0;
  for (const entry of entries) bytes += entry.bytes;
  return { bytes, files: entries.length, cap: CACHE_MAX_BYTES };
}

/** Least-recently-used eviction so %TEMP% cannot grow without bound. */
function pruneCache(maxBytes) {
  const cap = typeof maxBytes === "number" && maxBytes > 0 ? maxBytes : CACHE_MAX_BYTES;
  const entries = cacheEntries();
  let bytes = 0;
  for (const entry of entries) bytes += entry.bytes;
  if (bytes <= cap) return { removed: 0, bytes, cap };
  let removed = 0;
  for (let index = entries.length - 1; index >= 0 && bytes > cap; index -= 1) {
    const entry = entries[index];
    try {
      fs.unlinkSync(entry.file);
      bytes -= entry.bytes;
      removed += 1;
    } catch {
      /* locked by an in-flight download; keep it and try next round */
    }
  }
  return { removed, bytes, cap };
}

function clearCache() {
  const entries = cacheEntries();
  let removed = 0;
  for (const entry of entries) {
    try {
      fs.unlinkSync(entry.file);
      removed += 1;
    } catch {
      /* locked; skip */
    }
  }
  return { removed, ...cacheStats() };
}

function stillTarget(id) {
  return path.join(STILL_DIR, id + '.jpg');
}

/** Extracts (and caches) one frame from a video project. Resolves with the
 *  jpg path, rejects when ffmpeg is missing or the decode fails. */
function ensureStill(id, clip) {
  const target = stillTarget(id);
  try {
    const made = fs.statSync(target);
    const clipStat = fs.statSync(clip.path);
    if (made.size > 4096 && made.mtimeMs >= clipStat.mtimeMs) return Promise.resolve(target);
  } catch {
    /* not generated yet */
  }
  const running = stillJobs.get(id);
  if (running) return running;
  const job = new Promise((resolve, reject) => {
    try {
      fs.mkdirSync(STILL_DIR, { recursive: true });
    } catch {
      /* already exists */
    }
    const args = [
      '-y', '-loglevel', 'error',
      '-ss', '1.5', '-i', clip.path,
      '-frames:v', '1',
      '-vf', "scale='min(" + STILL_MAX_WIDTH + ",iw)':-2",
      '-q:v', '2',
      target,
    ];
    execFile('ffmpeg', args, { timeout: 30000, windowsHide: true }, (error) => {
      stillJobs.delete(id);
      if (error) {
        reject(error);
        return;
      }
      pruneCache();
      resolve(target);
    });
  });
  stillJobs.set(id, job);
  return job;
}

function animTarget(id) {
  return path.join(ANIM_DIR, id + '.webp');
}

/** Encodes (and caches) a short looping animated WebP from a video project. */
function ensureAnim(id, clip) {
  const target = animTarget(id);
  try {
    const made = fs.statSync(target);
    const clipStat = fs.statSync(clip.path);
    if (made.size > 4096 && made.mtimeMs >= clipStat.mtimeMs) return Promise.resolve(target);
  } catch {
    /* not generated yet */
  }
  const running = animJobs.get(id);
  if (running) return running;
  const job = new Promise((resolve, reject) => {
    try {
      fs.mkdirSync(ANIM_DIR, { recursive: true });
    } catch {
      /* already exists */
    }
    /* Two-tier encode: the modest spec first, then a cheaper one only when
     * the result is still oversized. scale=min(width,iw) avoids upscaling
     * small sources, which used to waste bytes for nothing. */
    const buildArgs = (width, fps, quality) => [
      '-y', '-loglevel', 'error',
      '-ss', '2', '-t', String(ANIM_SECONDS), '-i', clip.path,
      '-vf', 'fps=' + fps + ",scale='min(" + width + ",iw)':-2:flags=lanczos",
      '-c:v', 'libwebp_anim', '-lossless', '0', '-q:v', String(quality),
      '-loop', '0', '-an',
      target,
    ];
    const encode = (args) => new Promise((done, fail) => {
      execFile('ffmpeg', args, { timeout: 90000, windowsHide: true }, (error) => {
        if (error) fail(error);
        else done();
      });
    });
    const sizeOf = () => {
      try {
        return fs.statSync(target).size;
      } catch {
        return 0;
      }
    };
    const run = async () => {
      let size = 0;
      for (const tier of ANIM_TIERS) {
        await encode(buildArgs(tier.width, tier.fps, tier.quality));
        size = sizeOf();
        if (size > 0 && size <= ANIM_MAX_BYTES) break;
      }
      pruneCache();
      resolve(target);
    };
    run().catch(reject).finally(() => animJobs.delete(id));
  });
  animJobs.set(id, job);
  return job;
}

/** Serves the preview image, used both by /file and as the /still fallback. */
function sendPreview(req, res, dir, meta) {
  const preview = meta ? previewFileOf(dir, meta) : null;
  if (!preview) {
    sendJson(res, 404, { ok: false, error: 'preview missing' });
    return;
  }
  let bytes;
  try {
    bytes = fs.readFileSync(preview.path);
  } catch {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('read failed');
    return;
  }
  res.writeHead(200, {
    'content-type': preview.mime,
    'content-length': bytes.length,
    'cache-control': 'public, max-age=86400',
  });
  if (req.method === 'HEAD') res.end();
  else res.end(bytes);
}

/** @type {{ root: string, items: any[] } | null} */
let scanCache = null;
let scanCacheAt = 0;

/** Steam library folders, best guess first. Covers the default install on each
 *  platform plus whatever extra drives the libraryfolders VDF lists. */
/** Same folder can arrive as 'G:/steam' and 'G:\steam'; compare
 *  on a normalised key so the candidate list stays short. */
function pathKey(value) {
  const resolved = path.resolve(value);
  return process.platform === 'win32' ? resolved.toLowerCase() : resolved;
}

function steamLibraries() {
  const found = [];
  const seen = new Set();
  const push = (value) => {
    if (typeof value !== 'string') return;
    const clean = value.trim().replace(/[\\/]+$/, '');
    if (!clean) return;
    const key = pathKey(clean);
    if (seen.has(key)) return;
    seen.add(key);
    found.push(clean);
  };
  const home = os.homedir();
  const seeds = [];
  const seedSeen = new Set();
  const pushSeed = (value) => {
    if (typeof value !== 'string') return;
    const clean = value.trim().replace(/[\\/]+$/, '');
    if (!clean) return;
    const key = pathKey(clean);
    if (seedSeen.has(key)) return;
    seedSeen.add(key);
    seeds.push(clean);
  };

  if (process.platform === 'win32') {
    // Steam stores its own path in the registry; custom drives are listed in
    // the VDF next to steamapps, so registry + VDF covers a non-C: install.
    try {
      const raw = execFileSync('reg', ['query', 'HKCU\\Software\\Valve\\Steam', '/v', 'SteamPath'], {
        timeout: 4000,
        windowsHide: true,
        encoding: 'utf8',
      });
      const match = /SteamPath\s+REG_SZ\s+(.+)/.exec(raw || '');
      if (match) pushSeed(match[1]);
    } catch {
      /* registry unavailable; fall back to the usual suspects below */
    }
    const pf86 = process.env['ProgramFiles(x86)'];
    const pf = process.env.ProgramFiles;
    if (pf86) pushSeed(path.join(pf86, 'Steam'));
    if (pf) pushSeed(path.join(pf, 'Steam'));
    pushSeed('C:/Program Files (x86)/Steam');
    pushSeed('D:/Steam');
    pushSeed('E:/Steam');
  } else if (process.platform === 'darwin') {
    pushSeed(path.join(home, 'Library/Application Support/Steam'));
  } else {
    pushSeed(path.join(home, '.steam/steam'));
    pushSeed(path.join(home, '.local/share/Steam'));
  }

  for (const base of seeds) {
    push(base);
    let text = '';
    try {
      text = fs.readFileSync(path.join(base, 'steamapps', 'libraryfolders.vdf'), 'utf8');
    } catch {
      continue;
    }
    const re = /"path"\s+"([^"]+)"/g;
    let match;
    while ((match = re.exec(text))) {
      // VDF escapes separators as \\; unescape so path.join works.
      push(match[1].replace(/\\\\/g, '\\'));
    }
  }
  return found;
}

/** Every path that could plausibly hold the workshop folder. */
function workshopCandidates() {
  const out = [];
  const seen = new Set();
  const push = (value) => {
    if (typeof value !== 'string') return;
    const clean = value.trim().replace(/[\\/]+$/, '');
    if (!clean) return;
    const key = pathKey(clean);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(clean);
  };
  push(process.env.CP2077_WORKSHOP_ROOT);
  for (const lib of steamLibraries()) {
    push(path.join(lib, 'steamapps', 'workshop', 'content', WORKSHOP_APP_ID));
  }
  return out;
}

function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
}

/** Precedence: plugin config -> env var -> auto-detected Steam library.
 *  source is surfaced to the panel so users can tell "I pointed it somewhere
 *  wrong" from "Wallpaper Engine is not installed". */
function detectRoot(config) {
  const configured = typeof config?.workshopRoot === 'string' ? config.workshopRoot.trim() : '';
  if (configured) {
    const clean = configured.replace(/[\\/]+$/, '');
    return { root: clean, source: isDirectory(clean) ? 'config' : 'config-missing' };
  }
  const fromEnv = typeof process.env.CP2077_WORKSHOP_ROOT === 'string' ? process.env.CP2077_WORKSHOP_ROOT.trim() : '';
  if (fromEnv) {
    const clean = fromEnv.replace(/[\\/]+$/, '');
    return { root: clean, source: isDirectory(clean) ? 'env' : 'env-missing' };
  }
  for (const candidate of workshopCandidates()) {
    if (isDirectory(candidate)) return { root: candidate, source: 'detected' };
  }
  return { root: FALLBACK_ROOT, source: 'fallback' };
}

/** ffmpeg is optional: without it, video wallpapers simply serve their cover
 *  image instead of an extracted frame or an animated loop. */
let ffmpegReady = null;
let ffmpegProbe = null;
function ffmpegAvailable() {
  if (ffmpegReady !== null) return Promise.resolve(ffmpegReady);
  if (ffmpegProbe) return ffmpegProbe;
  ffmpegProbe = new Promise((resolve) => {
    execFile('ffmpeg', ['-version'], { timeout: 8000, windowsHide: true }, (error) => {
      ffmpegReady = !error;
      ffmpegProbe = null;
      resolve(ffmpegReady);
    });
  });
  return ffmpegProbe;
}

function resolveRoot(config) {
  return detectRoot(config).root;
}

function readProjectMeta(dir) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(dir, 'project.json'), 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function previewFileOf(dir, meta) {
  const name = typeof meta?.preview === 'string' ? meta.preview.trim() : '';
  if (!name) return null;
  const target = path.resolve(dir, name);
  const base = path.resolve(dir) + path.sep;
  if (!target.startsWith(base)) return null;
  const mime = IMAGE_TYPES.get(path.extname(target).toLowerCase());
  if (!mime) return null;
  try {
    const stat = fs.statSync(target);
    if (!stat.isFile()) return null;
    return { path: target, mime, size: stat.size };
  } catch {
    return null;
  }
}

function videoFileOf(dir, meta) {
  const name = typeof meta?.file === 'string' ? meta.file.trim() : '';
  if (!name) return null;
  const target = path.resolve(dir, name);
  const base = path.resolve(dir) + path.sep;
  if (!target.startsWith(base)) return null;
  const mime = VIDEO_TYPES.get(path.extname(target).toLowerCase());
  if (!mime) return null;
  try {
    const stat = fs.statSync(target);
    if (!stat.isFile() || stat.size < 1024) return null;
    return { path: target, mime, size: stat.size };
  } catch {
    return null;
  }
}

/** Streams a file, honouring a single-range Range header (video seeking needs it). */
function sendFile(req, res, file, mime, size) {
  const raw = typeof req.headers.range === 'string' ? req.headers.range.trim() : '';
  const match = raw ? /^bytes=(\d*)-(\d*)$/.exec(raw) : null;
  if (match) {
    let start = match[1] === '' ? NaN : Number(match[1]);
    let end = match[2] === '' ? NaN : Number(match[2]);
    if (Number.isNaN(start)) {
      start = Math.max(0, size - (Number.isNaN(end) ? 0 : end));
      end = size - 1;
    } else if (Number.isNaN(end)) {
      end = size - 1;
    }
    if (start >= size || start > end) {
      res.writeHead(416, { 'content-range': 'bytes */' + size, 'accept-ranges': 'bytes' });
      res.end();
      return;
    }
    end = Math.min(end, size - 1);
    res.writeHead(206, {
      'content-type': mime,
      'content-length': end - start + 1,
      'content-range': 'bytes ' + start + '-' + end + '/' + size,
      'accept-ranges': 'bytes',
      'cache-control': 'public, max-age=86400',
    });
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, {
    'content-type': mime,
    'content-length': size,
    'accept-ranges': 'bytes',
    'cache-control': 'public, max-age=86400',
  });
  if (req.method === 'HEAD') res.end();
  else fs.createReadStream(file).pipe(res);
}

function scanLibrary(root) {
  const now = Date.now();
  if (scanCache && scanCache.root === root && now - scanCacheAt < SCAN_TTL_MS) {
    return scanCache.items;
  }
  /** @type {any[]} */
  const items = [];
  let dirents = [];
  try {
    dirents = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    dirents = [];
  }
  for (const dirent of dirents) {
    if (!dirent.isDirectory()) continue;
    const dir = path.join(root, dirent.name);
    const meta = readProjectMeta(dir);
    if (!meta) continue;
    const preview = previewFileOf(dir, meta);
    if (!preview) continue;
    const video = videoFileOf(dir, meta);
    const title = typeof meta.title === 'string' && meta.title.trim() ? meta.title.trim() : dirent.name;
    items.push({
      id: dirent.name,
      title,
      type: typeof meta.type === 'string' ? meta.type : '',
      tags: Array.isArray(meta.tags)
        ? meta.tags.filter((tag) => typeof tag === 'string' && tag).slice(0, 6)
        : [],
      bytes: preview.size,
      hasVideo: Boolean(video),
      videoMime: video ? video.mime : '',
    });
  }
  items.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN'));
  scanCache = { root, items };
  scanCacheAt = now;
  return items;
}

function sendJson(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}

function createHandler(getConfig) {
  return function handleWallpaperRoute(req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'POST') {
      res.writeHead(405, { allow: 'GET, HEAD, POST' });
      res.end();
      return;
    }
    let route = '/';
    try {
      route = new URL(req.url ?? '/', 'http://127.0.0.1').pathname.slice(ROUTE_PREFIX.length) || '/';
    } catch {
      sendJson(res, 400, { ok: false, error: 'bad request' });
      return;
    }
    if (req.method === 'POST' && route !== '/cache') {
      res.writeHead(405, { allow: 'GET, HEAD' });
      res.end();
      return;
    }
    const root = resolveRoot(getConfig());

    if (route === '/' || route === '/index' || route === '/index.json') {
      let items = [];
      let error;
      try {
        items = scanLibrary(root);
      } catch (cause) {
        error = cause instanceof Error ? cause.message : String(cause);
      }
      const resolved = detectRoot(getConfig());
      ffmpegAvailable().then((ffmpeg) => {
        sendJson(res, 200, {
          ok: !error,
          root: resolved.root,
          rootSource: resolved.source,
          ffmpeg,
          platform: process.platform,
          count: items.length,
          items,
          ...(error ? { error } : {}),
        });
      });
      return;
    }

    const videoMatch = /^\/video\/([A-Za-z0-9_-]+)$/.exec(route);
    if (videoMatch) {
      const all = scanLibrary(root);
      if (!all.some((item) => item.id === videoMatch[1])) {
        sendJson(res, 404, { ok: false, error: 'wallpaper not registered' });
        return;
      }
      const vdir = path.join(root, videoMatch[1]);
      const vmeta = readProjectMeta(vdir);
      const clip = vmeta ? videoFileOf(vdir, vmeta) : null;
      if (!clip) {
        sendJson(res, 404, { ok: false, error: 'video missing' });
        return;
      }
      sendFile(req, res, clip.path, clip.mime, clip.size);
      return;
    }

    const animMatch = /^\/anim\/([A-Za-z0-9_-]+)$/.exec(route);
    if (animMatch) {
      const id = animMatch[1];
      if (!scanLibrary(root).some((item) => item.id === id)) {
        sendJson(res, 404, { ok: false, error: 'wallpaper not registered' });
        return;
      }
      const adir = path.join(root, id);
      const ameta = readProjectMeta(adir);
      const aclip = ameta ? videoFileOf(adir, ameta) : null;
      if (!aclip) {
        sendPreview(req, res, adir, ameta);
        return;
      }
      ensureAnim(id, aclip).then(
        (anim) => {
          let bytes;
          try {
            bytes = fs.readFileSync(anim);
          } catch {
            sendPreview(req, res, adir, ameta);
            return;
          }
          res.writeHead(200, {
            'content-type': 'image/webp',
            'content-length': bytes.length,
            'cache-control': 'public, max-age=3600',
          });
          if (req.method === 'HEAD') res.end();
          else res.end(bytes);
        },
        () => sendPreview(req, res, adir, ameta),
      );
      return;
    }

    const stillMatch = /^\/still\/([A-Za-z0-9_-]+)$/.exec(route);
    if (stillMatch) {
      const id = stillMatch[1];
      if (!scanLibrary(root).some((item) => item.id === id)) {
        sendJson(res, 404, { ok: false, error: 'wallpaper not registered' });
        return;
      }
      const sdir = path.join(root, id);
      const smeta = readProjectMeta(sdir);
      const scase = smeta ? videoFileOf(sdir, smeta) : null;
      if (!scase) {
        sendPreview(req, res, sdir, smeta);
        return;
      }
      ensureStill(id, scase).then(
        (still) => {
          let bytes;
          try {
            bytes = fs.readFileSync(still);
          } catch {
            sendPreview(req, res, sdir, smeta);
            return;
          }
          res.writeHead(200, {
            'content-type': 'image/jpeg',
            'content-length': bytes.length,
            'cache-control': 'public, max-age=86400',
          });
          if (req.method === 'HEAD') res.end();
          else res.end(bytes);
        },
        () => sendPreview(req, res, sdir, smeta),
      );
      return;
    }

    if (route === '/cache') {
      if (req.method === 'POST') {
        sendJson(res, 200, { ok: true, ...clearCache() });
        return;
      }
      sendJson(res, 200, { ok: true, ...cacheStats() });
      return;
    }

    const fileMatch = /^\/file\/([A-Za-z0-9_-]+)$/.exec(route);
    if (!fileMatch) {
      sendJson(res, 404, { ok: false, error: 'unknown route' });
      return;
    }
    const items = scanLibrary(root);
    if (!items.some((item) => item.id === fileMatch[1])) {
      sendJson(res, 404, { ok: false, error: 'wallpaper not registered' });
      return;
    }
    sendPreview(req, res, path.join(root, fileMatch[1]), readProjectMeta(path.join(root, fileMatch[1])));
  };
}

export const name = 'cp2077-theme';
/**
 * Cordis function-plugin dependency declaration: a PLAIN ARRAY of service
 * names. `{ required: [...] }` is not a recognised shape here — it makes the
 * Loader wait forever on a service literally called "required".
 */
export const inject = ['webServer'];

/** Test seam: lets `test/wallpaper-route.mjs` exercise the handler outside a running Harness. */
export const __internals = {
  createHandler,
  scanLibrary,
  resolveRoot,
  detectRoot,
  workshopCandidates,
  steamLibraries,
  ffmpegAvailable,
  ensureStill,
  stillTarget,
  ensureAnim,
  animTarget,
  cacheStats,
  pruneCache,
  clearCache,
  CACHE_MAX_BYTES,
  ROUTE_PREFIX,
};

/**
 * @param {import('cordis').Context} ctx
 * @param {{ workshopRoot?: string } | undefined} config
 */
export function apply(ctx, config) {
  const server = ctx.webServer ?? ctx.get('webServer');
  if (!server || typeof server.register !== 'function') {
    console.warn(SOURCE + ': webServer unavailable, wallpaper routes disabled');
    return;
  }
  ctx.effect(() =>
    server.register({
      kind: 'prefix',
      path: ROUTE_PREFIX,
      handler: createHandler(() => config),
    }),
  );
  console.log(SOURCE + ': wallpaper routes mounted at ' + ROUTE_PREFIX);
}