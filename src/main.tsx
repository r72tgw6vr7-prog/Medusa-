import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initI18n } from '@/i18n';

void initI18n().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        {/* Clean dark background - no decorative elements */}
        <div className="min-h-screen bg-luxury-bg-dark text-luxury-text-inverse">
          <App />
        </div>
      </BrowserRouter>
    </StrictMode>
  );
});
