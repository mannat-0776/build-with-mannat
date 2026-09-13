/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LinkedInButton } from './LinkedInButton';
import { ThemeToggle } from './ThemeToggle';
import { Sparkles, Terminal, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAiGenerator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiGenerator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
          aria-label="Build with Mannat Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-indigo-400 group-hover:scale-110 group-hover:text-emerald-400 transition-all duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                Build with Mannat
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI & Dev
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              LLM Mental Models & Prompts
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs lg:text-sm font-medium text-slate-300">
          <a
            href="#linkedin-feed"
            className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1 text-blue-300 font-semibold"
          >
            LinkedIn Posts
          </a>
          <a
            href="#reddit-ai-news"
            className="hover:text-orange-400 transition-colors duration-200 flex items-center gap-1 text-orange-300 font-semibold"
          >
            Reddit AI News
          </a>
          <a
            href="#github-trending"
            className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1 text-emerald-300 font-semibold"
          >
            Trending Repos
          </a>
          <a
            href="#prompts-library"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Prompts
          </a>
          <a
            href="#mental-models"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Mental Models
          </a>
          <a
            href="#python-workflows"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Python Code
          </a>

          {/* AI Generator Button Trigger */}
          {onOpenAiGenerator && (
            <button
              onClick={onOpenAiGenerator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all duration-200 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>AI Assistant</span>
            </button>
          )}
        </nav>

        {/* Header CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <LinkedInButton variant="primary" size="sm" showBadge followerCount="12.4k" />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F19]/98 border-b border-slate-800/90 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-200">
            <a
              href="#linkedin-feed"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800/60 text-blue-400 font-semibold"
            >
              LinkedIn Posts Feed
            </a>
            <a
              href="#reddit-ai-news"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800/60 text-orange-400 font-semibold"
            >
              Reddit AI News Stream
            </a>
            <a
              href="#github-trending"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800/60 text-emerald-400 font-semibold"
            >
              Trending AI Repos
            </a>
            <a
              href="#prompts-library"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800/60"
            >
              Prompts Library
            </a>
            <a
              href="#mental-models"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800/60"
            >
              Mental Models
            </a>
            <a
              href="#python-workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800/60"
            >
              Python Workflows
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Theme Preference</span>
              <ThemeToggle showLabel />
            </div>

            {onOpenAiGenerator && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiGenerator();
                }}
                className="w-full py-3 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center gap-2 font-medium"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Launch AI Prompt Assistant
              </button>
            )}

            <LinkedInButton variant="primary" size="md" showBadge className="w-full justify-center" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
