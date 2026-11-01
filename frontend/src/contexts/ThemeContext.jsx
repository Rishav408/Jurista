import { createContext, useContext } from 'react';
import useTheme from '../hooks/useTheme';

const ThemeContext = createContext(null);

/** Provides { theme, toggle, setTheme, isDark } to the whole app. */
export function ThemeProvider({ children }) {
  const value = useTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within <ThemeProvider>');
  return ctx;
}

export default ThemeContext;
