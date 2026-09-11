import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { initMockBackend } from './services/mockBackend';

// Initialize hybrid backend adapter for cloud environments (Vercel, Netlify, etc.)
initMockBackend();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
