import { createContext } from 'react';

export type ThemeContextType = 'light' | 'dark';

interface Context {
  theme: ThemeContextType
  toggleTheme: () => void
}

export const ThemeContext = createContext<Context>({
  theme: 'dark',
  toggleTheme: () => { },
});
