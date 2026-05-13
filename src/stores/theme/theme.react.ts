import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { $theme, initializeThemeStore, toggleTheme } from './theme.store';

export function useTheme() {
  const theme = useStore($theme);

  useEffect(() => {
    initializeThemeStore();
  }, []);

  return {
    theme,
    toggleTheme,
  };
}
