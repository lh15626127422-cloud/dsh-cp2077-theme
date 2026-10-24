#!/usr/bin/env node
/**
 * Links this folder into a DeepSeek Harness profile so the bundle activates.
 *
 *   node scripts/install.mjs                 # uses ~/.dsh/profiles/web
 *   node scripts/install.mjs <profileDir>    # e.g. ~/.dsh/profiles/web
 *
 * Prints the package.json line to add when the profile does not use links.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const here = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')));
const repo = path.dirname(here);
const profile = path.resolve(process.argv[2] || path.join(os.homedir(), '.dsh', 'profiles', 'web'));
const modules = path.join(profile, 'node_modules', '@local', 'cp2077-theme');

if (!fs.existsSync(profile)) {
  console.error('profile not found: ' + profile);
  console.error('pass the profile directory explicitly: node scripts/install.mjs C:/Users/me/.dsh/profiles/web');
  process.exit(1);
}

fs.mkdirSync(path.dirname(modules), { recursive: true });
try {
  const stat = fs.lstatSync(modules);
  if (stat.isSymbolicLink() || stat.isDirectory()) fs.rmSync(modules, { recursive: true, force: true });
} catch {
  /* nothing linked yet */
}

// Windows needs a junction/dir link when not elevated; try the plain call first.
try {
  fs.symlinkSync(repo, modules, process.platform === 'win32' ? 'junction' : 'dir');
  console.log('linked: ' + modules + ' -> ' + repo);
} catch (error) {
  console.error('link failed: ' + error.message);
  process.exit(1);
}

console.log('');
console.log('Make sure ' + path.join(profile, 'package.json') + ' contains:');
console.log('  "@local/cp2077-theme": "link:' + repo.replace(/\\/g, '/') + '"');
console.log('Then restart DeepSeek Harness and refresh the page.');
