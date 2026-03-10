import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initI18n } from '@/i18n';

// Wait for i18n initialization before rendering to prevent raw translation keys
initI18n()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <BrowserRouter>
          {/* Clean dark background - no decorative elements */}
          <div className='min-h-screen bg-luxury-bg-dark text-luxury-text-inverse'>
            <App />
          </div>
        </BrowserRouter>
      </StrictMode>,
    );
  })
  .catch((err) => {
    console.error('Failed to initialize i18n:', err);
  });
