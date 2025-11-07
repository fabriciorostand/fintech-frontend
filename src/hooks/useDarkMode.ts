import { useCallback, useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Verifica preferência salva no carregamento inicial
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'enabled';
  });

  // Função para alternar modo escuro
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Função para ativar modo escuro
  const enableDarkMode = useCallback(() => {
    setIsDarkMode(true);
  }, []);

  // Função para desativar modo escuro
  const disableDarkMode = useCallback(() => {
    setIsDarkMode(false);
  }, []);

  // Aplica o modo escuro sempre que o estado mudar
  useEffect(() => {
    console.log('Dark mode changed:', isDarkMode);
    console.log('HTML classes before:', document.documentElement.classList.toString());
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
    
    console.log('HTML classes after:', document.documentElement.classList.toString());
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode,
  };
}