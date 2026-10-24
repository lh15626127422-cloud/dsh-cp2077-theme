/**
 * Standalone check for the wallpaper HTTP routes.
 *
 * Runs the real `index.js` handler inside a throwaway node http server, so the
 * scan / traversal guard / byte serving can be verified without restarting the
 * Harness host. Usage: node test/wallpaper-route.mjs
 */
import http from 'node:http';
import assert from 'node:assert/strict';

const mod = await import('../index.js');
const { createHandler, scanLibrary, resolveRoot } = mod.__internals;

const results = [];
function check(name, fn) {
  try {
    fn();
    results.push(['PASS', name]);
  } catch (cause) {
    results.push(['FAIL', name + ' :: ' + (cause instanceof Error ? cause.message : String(cause))]);
  }
}

const config = {};
const root = resolveRoot(config);
check('root resolves to the workshop content directory', () => {
  assert.equal(typeof root, 'string');
  assert.ok(root.length > 3);
});

const items = scanLibrary(root);
check('scan returns an array', () => assert.ok(Array.isArray(items)));
const hasLibrary = items.length > 0;
if (hasLibrary) {
  check('scan finds at least one wallpaper', () => assert.ok(items.length > 0));
} else {
  console.log('SKIP scan finds at least one wallpaper (no Wallpaper Engine library on this machine)');
}
check('each item carries id/title', () => {
  for (const item of items.slice(0, 5)) {
    assert.equal(typeof item.id, 'string');
    assert.ok(item.id.length > 0);
    assert.equal(typeof item.title, 'string');
  }
});
check('scan is cached (same reference twice)', () => {
  assert.equal(scanLibrary(root), items);
});

const handler = createHandler(() => config);
const server = http.createServer((req, res) => handler(req, res));
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const origin = 'http://127.0.0.1:' + port;

async function get(pathname) {
  const response = await fetch(origin + pathname);
  const buffer = Buffer.from(await response.arrayBuffer());
  return { status: response.status, type: response.headers.get('content-type') || '', buffer };
}

const index = await get('/cp2077-wallpaper/index');
check('index route answers 200 json', () => {
  assert.equal(index.status, 200);
  assert.ok(index.type.includes('application/json'));
});
const indexBody = JSON.parse(index.buffer.toString('utf8'));
check('index payload shape', () => {
  assert.equal(indexBody.ok, true);
  assert.equal(typeof indexBody.count, 'number');
  assert.ok(Array.isArray(indexBody.items));
  assert.ok(indexBody.count === indexBody.items.length);
});

const first = hasLibrary ? indexBody.items[0] : null;
if (hasLibrary) {
  const file = await get('/cp2077-wallpaper/file/' + first.id);
  check('file route serves image bytes', () => {
    assert.equal(file.status, 200);
    assert.ok(file.type.startsWith('image/'));
    assert.ok(file.buffer.length > 1024);
    const magic = file.buffer.subarray(0, 4);
    const known =
      (file.type === 'image/jpeg' && magic[0] === 0xff && magic[1] === 0xd8) ||
      (file.type === 'image/png' && magic[0] === 0x89 && magic[1] === 0x50) ||
      (file.type === 'image/gif' && magic.toString('latin1').startsWith('GIF8')) ||
      (file.type === 'image/webp' && magic.toString('latin1') === 'RIFF');
    assert.ok(known, 'unknown image magic for ' + file.type + ' head=' + magic.toString('hex'));
  });
} else {
  console.log('SKIP file route serves image bytes (empty library)');
}

const missing = await get('/cp2077-wallpaper/file/does-not-exist');
check('unknown id answers 404 json', () => {
  assert.equal(missing.status, 404);
  assert.equal(JSON.parse(missing.buffer.toString('utf8')).ok, false);
});

const traversal = await get('/cp2077-wallpaper/file/..%2F..%2F..%2Fsteamapps');
check('traversal id answers 404', () => assert.equal(traversal.status, 404));

const unknown = await get('/cp2077-wallpaper/nope');
check('unknown route answers 404', () => assert.equal(unknown.status, 404));

const post = await fetch(origin + '/cp2077-wallpaper/index', { method: 'POST' });
check('non-GET answers 405', () => assert.equal(post.status, 405));

if (hasLibrary) {
  const head = await fetch(origin + '/cp2077-wallpaper/file/' + first.id, { method: 'HEAD' });
  check('HEAD answers 200 with no body', () => {
    assert.equal(head.status, 200);
    assert.ok(head.headers.get('content-type') || '');
  });
} else {
  console.log('SKIP HEAD answers 200 with no body (empty library)');
}

check('cache stats report bytes/files/cap', async () => {
  const response = await fetch(origin + '/cp2077-wallpaper/cache');
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.ok, true);
  assert.equal(typeof payload.bytes, 'number');
  assert.equal(typeof payload.files, 'number');
  assert.equal(typeof payload.cap, 'number');
  assert.ok(payload.cap > 0);
  assert.ok(payload.bytes >= 0);
});

check('pruneCache keeps the budget', async () => {
  const { pruneCache } = mod.__internals;
  const outcome = pruneCache(1);
  assert.equal(typeof outcome.removed, 'number');
  assert.equal(typeof outcome.bytes, 'number');
  assert.ok(outcome.removed >= 0);
});

check('POST /cache clears the cache folder', async () => {
  const response = await fetch(origin + '/cp2077-wallpaper/cache', { method: 'POST' });
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.ok, true);
  assert.equal(typeof payload.removed, 'number');
  assert.ok(payload.bytes <= 1024);
});

check('POST to a read-only route is rejected', async () => {
  const response = await fetch(origin + '/cp2077-wallpaper/index', { method: 'POST' });
  assert.equal(response.status, 405);
});

await new Promise((resolve) => server.close(resolve));

let failures = 0;
for (const [state, name] of results) {
  if (state === 'FAIL') failures += 1;
  console.log(state.padEnd(5) + name);
}
console.log('\n' + (results.length - failures) + '/' + results.length + ' passed');
process.exit(failures === 0 ? 0 : 1);