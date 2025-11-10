import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context-definition.ts';

export function useDarkMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useDarkMode deve ser usado dentro de um ThemeProvider');
  }

  return context;
}