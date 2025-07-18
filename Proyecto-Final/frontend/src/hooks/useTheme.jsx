import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    // Si no hay tema guardado, usar preferencia del sistema
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Establecer atributo data-theme en el HTML
    root.setAttribute('data-theme', theme);
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};