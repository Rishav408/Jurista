import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';

/** Resolve the initial theme with localStorage → system preference fallback. */
function resolveInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Theme state synced to <html class="dark"> and localStorage.
 * The root ThemeContext mounts a single instance of this.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(resolveInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next === 'dark' ? 'dark' : 'light');
  }, []);

  return { theme, toggle, setTheme, isDark: theme === 'dark' };
}

export default useTheme;
