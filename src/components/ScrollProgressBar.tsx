/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const totalScrollable = documentHeight - windowHeight;
      if (totalScrollable <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = (scrollTop / totalScrollable) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    calculateScrollProgress();

    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-slate-900/40 pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-150 ease-out shadow-sm shadow-indigo-500/50"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
