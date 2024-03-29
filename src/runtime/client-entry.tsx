import { createRoot } from 'react-dom/client';
import { App } from './app';
import { BrowserRouter } from 'react-router-dom';

import siteData from 'island:site-data';

function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

renderInBrowser();
