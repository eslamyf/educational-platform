import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
export const ThemeToggle = ({ className = '', size = 18 }) => {
    const { theme, toggleTheme } = useTheme();
    return (<button type="button" className={`icon-btn theme-toggle ${className}`} aria-label="تبديل المظهر الليلي والنهاري" title={theme === 'dark' ? 'التحويل إلى المظهر النهاري' : 'التحويل إلى المظهر الليلي'} onClick={() => toggleTheme?.()}>
      {theme === 'dark' ? <Sun size={size}/> : <Moon size={size}/>}
    </button>);
};
export default ThemeToggle;
