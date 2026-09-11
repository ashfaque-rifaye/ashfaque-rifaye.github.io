import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/archivo/standard.css';
import '@fontsource-variable/martian-mono/standard.css';
import './styles.css';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages arrive prerendered (hydrate); `vite dev` serves an empty shell.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
