// Import scheduler first to ensure it's initialized before React tries to use it
import 'scheduler';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Imports system.css now
import { UniversalTextureBackground } from '@/components/atoms/UniversalTextureBackground';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      {/* Texture rendered OUTSIDE App */}
      <UniversalTextureBackground />
      {/* App rendered ON TOP */}
      <App />
    </>
  </React.StrictMode>,
);
