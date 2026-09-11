/* Static prerender for GitHub Pages.
   Runs after `vite build` (client) and `vite build --ssr` (server bundle):
   renders every route to dist/<route>/index.html with its own <head>,
   writes dist/404.html and a fresh sitemap.xml, then removes dist-ssr. */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> markers.');
}

const { render, PRERENDER_ROUTES, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

// Preload the one font file every page needs above the fold.
const assets = await fs.readdir(path.join(dist, 'assets'));
const font = assets.find((f) => /^archivo-latin-standard-normal-.*\.woff2$/.test(f));
const preload = font
  ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />`
  : '';

const page = (url) => {
  const { html, head } = render(url);
  return template
    .replace('<!--app-head-->', [preload, head].filter(Boolean).join('\n    '))
    .replace('<!--app-html-->', html);
};

for (const url of PRERENDER_ROUTES) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page(url));
}
await fs.writeFile(path.join(dist, '404.html'), page('/404/'));

const today = new Date().toISOString().slice(0, 10);
const entries = PRERENDER_ROUTES.map(
  (u) => `  <url>\n    <loc>${SITE_URL}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
).join('\n');
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${PRERENDER_ROUTES.length} routes + 404.html (font preload: ${font ?? 'none'}).`);
