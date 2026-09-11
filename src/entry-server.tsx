/* Prerender entry: built with `vite build --ssr` and called by
   scripts/prerender.mjs once per route. */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { headHtml, metaFor } from './site/routes';

export { PRERENDER_ROUTES } from './site/routes';
export { SITE_URL } from './content/profile';

export function render(url: string): { html: string; head: string } {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html, head: headHtml(metaFor(url)) };
}
