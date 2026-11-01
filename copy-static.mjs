// Runs after `astro build`. Astro only ships /public, so the plain-HTML site files
// (content, images, project page, admin, etc.) would be missing from dist/ and the
// page would fall back to slow GitHub requests. This copies them in and tells
// Cloudflare to serve them as plain static files (not through the Astro worker).
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'dist';
if (!fs.existsSync(OUT)) { console.error('[copy-static] dist/ not found - run astro build first'); process.exit(1); }

// [source, is-directory]
const ITEMS = [
  ['index.html', false],            // the real site page (root index.html is the single source of truth)
  ['project.html', false],
  ['experience.html', false],
  ['publication.html', false],
  ['config.js', false],
  ['nepal-districts.geojson', false],
  ['_redirects', false],
  ['admin', true],
  ['content', true],
  ['images', true],
];

const skip = p => path.normalize(p) === path.join('content', 'index.html'); // stray old page

const staticPaths = [];
for (const [src, isDir] of ITEMS) {
  if (!fs.existsSync(src)) continue;
  fs.cpSync(src, path.join(OUT, src), { recursive: true, force: true, filter: p => !skip(p) });
  if (src !== 'index.html' && src !== '_redirects') staticPaths.push('/' + src + (isDir ? '/*' : ''));
  console.log('[copy-static] copied', src);
}

// Make Cloudflare serve these directly instead of sending them to the Astro worker.
const routesFile = path.join(OUT, '_routes.json');
if (fs.existsSync(routesFile)) {
  const routes = JSON.parse(fs.readFileSync(routesFile, 'utf8'));
  routes.exclude = Array.from(new Set([...(routes.exclude || []), ...staticPaths]));
  fs.writeFileSync(routesFile, JSON.stringify(routes, null, 2));
  console.log('[copy-static] _routes.json excludes:', routes.exclude.join(', '));
}
