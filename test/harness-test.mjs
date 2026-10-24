/**
 * Crash harness for the CP2077 theme client.
 *
 * Replays the real client.js against a hand-rolled DOM stub under hostile
 * conditions: missing context, throwing theme service, null <body>, disposal
 * followed by a late MutationObserver callback, reduced-motion, low core count.
 * The invariant under test: the factory and apply() must never throw, and the
 * plugin must never resurrect itself after disposal.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC_PATH = path.join(HERE, '..', 'client.js');
const SRC = fs.readFileSync(SRC_PATH, 'utf8');

/* ------------------------------ DOM stub ------------------------------ */
class El {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.attrs = new Map();
    this.style = {
      cssText: '',
      writes: 0,
      setProperty(key, value) { this.writes += 1; this[key] = value; },
      removeProperty(key) { this.writes += 1; delete this[key]; },
    };
    this.className = '';
    this.innerHTML = '';
    this.id = '';
    this.parentNode = null;
    this.textWrites = 0;
    this.attrWrites = new Map();
    this._text = '';
    if (this.tagName === 'STYLE') this.readOnly = false;
  }
  get textContent() { return this._text; }
  set textContent(v) { this.textWrites += 1; this._text = String(v); }
  setAttribute(k, v) {
    this.attrs.set(k, String(v));
    this.attrWrites.set(k, (this.attrWrites.get(k) || 0) + 1);
    if (k === 'id') this.id = String(v);
  }
  removeAttribute(k) { this.attrs.delete(k); }
  getAttribute(k) { return this.attrs.has(k) ? this.attrs.get(k) : null; }
  appendChild(c) { c.parentNode = this; this.children.push(c); return c; }
  remove() {
    if (!this.parentNode) return;
    const i = this.parentNode.children.indexOf(this);
    if (i >= 0) this.parentNode.children.splice(i, 1);
    this.parentNode = null;
  }
}

const walk = (n, out) => { out.push(n); for (const c of n.children) walk(c, out); return out; };
const nodes = (root) => walk(root, []);

function query(doc, sel) {
  if (!doc.documentElement) return null;
  const all = nodes(doc.documentElement);
  if (sel.startsWith('#')) {
    const id = sel.slice(1);
    return all.find((n) => n.id === id) || null;
  }
  if (sel.startsWith('.')) {
    const cls = sel.slice(1);
    return all.find((n) => String(n.className).split(/\s+/).includes(cls)) || null;
  }
  const m = sel.match(/^([a-z]+)\[([\w-]+)\]$/i);
  if (m) {
    return all.find((n) => n.tagName === m[1].toUpperCase() && n.attrs.has(m[2])) || null;
  }
  return null;
}

/* ------------------------------ harness ------------------------------ */
function setup(opts = {}) {
  const html = new El('html');
  const head = new El('head');
  const body = new El('body');
  html.appendChild(head);
  html.appendChild(body);

  const doc = {
    documentElement: html,
    head,
    body,
    readyState: 'complete',
    createElement: (t) => new El(t),
    addEventListener() {},
    removeEventListener() {},
    querySelector: (sel) => query(doc, sel),
    getElementById: (id) => query(doc, '#' + id),
  };

  const observers = [];
  const timers = [];
  const rafQueue = [];
  const errors = [];

  class MO {
    constructor(cb) { this.cb = cb; this.targets = new Set(); observers.push(this); }
    observe(t) { this.targets.add(t); }
    unobserve(t) { this.targets.delete(t); }
    disconnect() { this.targets.clear(); }
    takeRecords() { return []; }
  }

  const sandbox = {
    console: {
      warn(...a) { errors.push(a.join(' ')); },
      log() {},
      error() {},
    },
    document: doc,
    navigator: { hardwareConcurrency: opts.cores ?? 8 },
    MutationObserver: MO,
    requestAnimationFrame: (cb) => { rafQueue.push(cb); return rafQueue.length; },
    cancelAnimationFrame: () => {},
    matchMedia: (q) => ({ matches: Boolean(opts.reduce), media: q, addEventListener() {}, removeEventListener() {} }),
    addEventListener() {},
    removeEventListener() {},
    setTimeout: (fn) => {
      if (!opts.queuedTimers) { fn(); return 0; }
      timers.push(fn);
      return timers.length;
    },
    clearTimeout: (id) => {
      if (opts.queuedTimers && id > 0) timers[id - 1] = null;
    },
    __ModuleLoader__: { load(m) { sandbox.__mod = m; } },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox, { filename: 'client.js' });

  const mod = sandbox.__mod;
  if (!mod || typeof mod.factory !== 'function') throw new Error('factory not captured');

  const flush = () => {
    const q = rafQueue.splice(0, rafQueue.length);
    for (const cb of q) cb();
  };
  const fire = () => {
    for (const o of observers) {
      if (o.targets.size) o.cb([], o);
    }
  };

  const tick = () => {
    const queue = timers.splice(0, timers.length);
    for (const fn of queue) if (typeof fn === 'function') fn();
  };
  const pendingTimers = () => timers.filter((fn) => typeof fn === 'function').length;

  return { doc, mod, flush, fire, errors, observers, tick, pendingTimers };
}

function makeCtx(overrides = {}) {
  const disposers = [];
  const ctx = {
    effect(fn) {
      const cleanup = fn();
      if (typeof cleanup === 'function') disposers.push(cleanup);
      return () => {
        const i = disposers.indexOf(cleanup);
        if (i >= 0) disposers.splice(i, 1);
        cleanup();
      };
    },
    theme: { overrideTokens: () => () => {} },
  };
  return Object.assign(ctx, overrides, { __disposers: disposers });
}

/* ------------------------------ tests ------------------------------ */
const results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (error) {
    results.push({ name, ok: false, detail: String(error && error.message || error) });
  }
}
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

test('factory exports inject + apply', () => {
  const { mod } = setup();
  const inst = mod.factory(() => undefined);
  assert(Array.isArray(inst.inject) && inst.inject.includes('theme'), 'inject contract broken');
  assert(typeof inst.apply === 'function', 'apply missing');
});

test('healthy apply mounts style + layer + glitch host', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx());
  assert(h.doc.querySelector('style[data-cp2077-theme]'), 'style not mounted');
  assert(h.doc.querySelector('.cp2077-layer'), 'layer not mounted');
  assert(h.doc.getElementById('cp2077-glitch-host'), 'glitch host not mounted');
});

test('apply({}) does not throw', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply({});
});

test('apply(undefined) does not throw', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(undefined);
});

test('ctx.effect throwing does not throw', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply({ effect() { throw new Error('kernel switch'); }, theme: { overrideTokens: () => () => {} } });
});

test('missing theme service does not throw', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx({ theme: undefined }));
  assert(h.doc.querySelector('.cp2077-layer'), 'layer should still mount without theme');
});

test('throwing overrideTokens does not abort later scopes', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx({
    theme: { overrideTokens() { throw new Error('theme gone'); } },
  }));
  assert(h.doc.querySelector('.cp2077-layer'), 'decoration skipped after token failure');
});

test('null <body> does not throw', () => {
  const h = setup();
  h.doc.body = null;
  h.mod.factory(() => undefined).apply(makeCtx());
  h.doc.body = new El('body');
  h.doc.documentElement.appendChild(h.doc.body);
  h.fire();
  h.flush();
  assert(h.doc.querySelector('.cp2077-layer'), 'layer did not recover after body appeared');
});

test('disposal is final — observer cannot resurrect', () => {
  const h = setup();
  const ctx = makeCtx();
  h.mod.factory(() => undefined).apply(ctx);
  assert(h.doc.querySelector('.cp2077-layer'), 'precondition');
  for (const d of ctx.__disposers.slice()) d();
  assert(!h.doc.querySelector('.cp2077-layer'), 'layer survived disposal');
  h.fire();
  h.flush();
  assert(!h.doc.querySelector('.cp2077-layer'), 'layer resurrected after disposal');
  assert(!h.doc.getElementById('cp2077-glitch-host'), 'glitch host resurrected after disposal');
});

test('reduced-motion skips the filter and marks html', () => {
  const h = setup({ reduce: true });
  h.mod.factory(() => undefined).apply(makeCtx());
  assert(!h.doc.getElementById('cp2077-glitch-host'), 'filter mounted despite reduced-motion');
  assert(h.doc.documentElement.getAttribute('data-cp2077-glitch') === 'off', 'html marker missing');
});

test('2-core machine skips the filter', () => {
  const h = setup({ cores: 2 });
  h.mod.factory(() => undefined).apply(makeCtx());
  assert(!h.doc.getElementById('cp2077-glitch-host'), 'filter mounted on 2 cores');
});

test('second apply() is idempotent', () => {
  const h = setup();
  const inst = h.mod.factory(() => undefined);
  inst.apply(makeCtx());
  inst.apply(makeCtx());
  const all = nodes(h.doc.documentElement);
  const layers = all.filter((n) => String(n.className).includes('cp2077-layer'));
  const styles = all.filter((n) => n.tagName === 'STYLE' && n.attrs.has('data-cp2077-theme'));
  const hosts = all.filter((n) => n.id === 'cp2077-glitch-host');
  assert(layers.length === 1, 'layer duplicated: ' + layers.length);
  assert(styles.length === 1, 'style duplicated: ' + styles.length);
  assert(hosts.length === 1, 'glitch host duplicated: ' + hosts.length);
});

test('body rebuild is repaired by self-heal', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx());
  const oldBody = h.doc.body;
  const freshBody = new El('body');
  oldBody.remove();
  h.doc.body = freshBody;
  h.doc.documentElement.appendChild(freshBody);
  h.fire();
  h.flush();
  assert(h.doc.querySelector('.cp2077-layer'), 'layer not rebuilt in new body');
  assert(h.doc.getElementById('cp2077-glitch-host'), 'filter not rebuilt in new body');
});

test('reverse-order disposal is final too', () => {
  const h = setup();
  const ctx = makeCtx();
  h.mod.factory(() => undefined).apply(ctx);
  for (const d of ctx.__disposers.slice().reverse()) d();
  h.fire();
  h.flush();
  assert(!h.doc.querySelector('.cp2077-layer'), 'layer resurrected after reverse disposal');
});

test('mutation storm converges without duplication', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx());
  for (let i = 0; i < 8; i += 1) { h.fire(); h.flush(); }
  const all = nodes(h.doc.documentElement);
  assert(all.filter((n) => String(n.className).includes('cp2077-layer')).length === 1, 'layer duplicated under storm');
  assert(all.filter((n) => n.id === 'cp2077-glitch-host').length === 1, 'filter host duplicated under storm');
});

test('no html marker leaks when the filter is active', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx());
  assert(h.doc.documentElement.getAttribute('data-cp2077-glitch') === null, 'stale off-marker');
});

test('disposal drops every pending timer', () => {
  const h = setup({ queuedTimers: true });
  const ctx = makeCtx();
  h.mod.factory(() => undefined).apply(ctx);
  assert(h.pendingTimers() > 0, 'no deferred work was scheduled');
  for (const d of ctx.__disposers.slice()) d();
  assert(h.pendingTimers() === 0, 'timers survived disposal: ' + h.pendingTimers());
  h.tick();
  assert(!h.doc.querySelector('.cp2077-layer'), 'deferred task resurrected the layer');
});

test('self-heal leaves the cursor sheet untouched when options are stable', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx());
  const sheet = h.doc.querySelector('style[data-cp2077-cursor]');
  assert(sheet, 'cursor sheet missing');
  const writesAfterMount = sheet.textWrites;
  const attrAfterMount = sheet.attrWrites.get('data-cp2077-cursor') || 0;
  for (let i = 0; i < 6; i += 1) { h.fire(); h.flush(); }
  assert(sheet.textWrites === writesAfterMount, 'cursor css rewritten on every heal: ' + sheet.textWrites);
  assert((sheet.attrWrites.get('data-cp2077-cursor') || 0) === attrAfterMount, 'cursor sheet re-created on heal');
});

test('self-heal leaves the wallpaper markers untouched when nothing changed', () => {
  const h = setup();
  h.mod.factory(() => undefined).apply(makeCtx());
  const root = h.doc.documentElement;
  const writesAfterMount = root.style.writes;
  const markers = root.attrWrites.get('data-cp2077-wallpaper') || 0;
  for (let i = 0; i < 6; i += 1) { h.fire(); h.flush(); }
  assert(root.style.writes === writesAfterMount, 'canvas variables rewritten on every heal: ' + root.style.writes);
  assert((root.attrWrites.get('data-cp2077-wallpaper') || 0) === markers, 'wallpaper marker rewritten on every heal');
});

/* ------------------------------ report ------------------------------ */
let failed = 0;
for (const r of results) {
  if (!r.ok) failed += 1;
  console.log((r.ok ? 'PASS  ' : 'FAIL  ') + r.name + (r.ok ? '' : '  -> ' + r.detail));
}
console.log('\n' + (results.length - failed) + '/' + results.length + ' passed');
process.exitCode = failed ? 1 : 0;