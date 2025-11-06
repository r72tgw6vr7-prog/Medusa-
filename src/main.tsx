// Import scheduler first to ensure it's initialized before React tries to use it
import 'scheduler';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/parallax-fix.css';
import './styles/motion-fix.css';
import './styles/motion-containers.css';
import { UniversalTextureBackground } from './components/atoms/UniversalTextureBackground';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      {/* Texture rendered OUTSIDE App */}
      <UniversalTextureBackground />
      {/* App rendered ON TOP */}
      <App />
    </>
  </React.StrictMode>
);
