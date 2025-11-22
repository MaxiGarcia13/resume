import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
  </StrictMode>,
);
