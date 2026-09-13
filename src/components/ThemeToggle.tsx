/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to High-Contrast Light Theme' : 'Switch to Dark Theme'}
      title={isDark ? 'Switch to High-Contrast Light Theme' : 'Switch to Dark Theme'}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 border font-semibold text-xs shadow-sm ${
        isDark
          ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-slate-800 hover:border-amber-500/40'
          : 'bg-white hover:bg-slate-100 text-indigo-700 border-slate-300 hover:border-indigo-400'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45 duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12 duration-300" />
      )}
      {showLabel && (
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  );
};

export default ThemeToggle;
