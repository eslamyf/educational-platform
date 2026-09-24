import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 18 }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`icon-btn theme-toggle ${className}`}
      aria-label="تبديل المظهر الليلي والنهاري"
      title={theme === 'dark' ? 'التحويل إلى المظهر النهاري' : 'التحويل إلى المظهر الليلي'}
      onClick={() => toggleTheme?.()}
    >
      {theme === 'dark' ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
};

export default ThemeToggle;
