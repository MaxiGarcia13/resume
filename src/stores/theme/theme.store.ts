import { atom } from 'nanostores';

export type Theme = 'light' | 'dark';

const DEFAULT_THEME: Theme = 'dark';
const STORAGE_KEY = 'theme';

let isInitialized = false;

export const $theme = atom<Theme>(DEFAULT_THEME);

const isBrowser = () => typeof window !== 'undefined';

function readInitialTheme(): Theme {
  if (!isBrowser()) {
    return DEFAULT_THEME;
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  const datasetTheme = document.documentElement.dataset.theme;
  if (datasetTheme === 'light' || datasetTheme === 'dark') {
    return datasetTheme;
  }

  return DEFAULT_THEME;
}

export function setTheme(theme: Theme): void {
  $theme.set(theme);

  if (!isBrowser()) {
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function toggleTheme(): void {
  const nextTheme: Theme = $theme.get() === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
}

export function initializeThemeStore(): void {
  if (isInitialized) {
    return;
  }

  setTheme(readInitialTheme());
  isInitialized = true;
}
