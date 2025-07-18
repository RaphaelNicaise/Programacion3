import { useTheme } from '../hooks/useTheme';

export const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle-floating"
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};