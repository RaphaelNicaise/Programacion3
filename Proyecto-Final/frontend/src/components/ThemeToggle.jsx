import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? '🌙' : '☀️'}
      {theme === 'light' ? ' Modo Oscuro' : ' Modo Claro'}
    </button>
  );
};