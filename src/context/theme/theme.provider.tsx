import type { ThemeContextType } from './theme.context';
import { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './theme.context';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeContextType>(() => localStorage.getItem('theme') as ThemeContextType ?? document.documentElement.dataset.theme ?? 'dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const next = prevTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      return next;
    });
  };

  const data = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext value={data}>
      {children}
    </ThemeContext>
  );
}
