import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Header, SwitchTheme, WroksExperience } from './components';
import { ThemeProvider } from './context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SwitchTheme className="absolute right-4 top-4 w-[40px]" />
      <Header />
      <WroksExperience />
    </ThemeProvider>
  </StrictMode>,
);
