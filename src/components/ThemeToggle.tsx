import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-40 w-10 h-10 rounded-full
        bg-[var(--color-surface)] border border-[var(--color-border)]
        shadow-md flex items-center justify-center
        hover:shadow-lg transition-all duration-200 hover:scale-105"
      title={theme === 'light' ? 'Karanlık tema' : 'Aydınlık tema'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
