/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LINKEDIN_URL } from '../data/mockData';
import { LinkedInButton, LinkedInIconSVG } from './LinkedInButton';
import { Terminal, ArrowUpRight, Heart, Mail, CheckCircle2, Copy, Check, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  const handleCopyFooterLink = () => {
    navigator.clipboard.writeText(LINKEDIN_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <footer className="bg-[#050810] text-slate-400 border-t border-slate-800/90 relative overflow-hidden">
      
      {/* Glow background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Info & High-Converting LinkedIn CTA */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Build with Mannat
                </span>
                <p className="text-xs text-slate-400">AI Engineering & Technical Leadership</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Empowering 12,000+ developers and founders with high-converting ChatGPT prompts, LLM mental models, Python AI code templates, and agentic workflows.
            </p>

            {/* Prominent LinkedIn Follow Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkedInIconSVG className="w-5 h-5 text-[#0A66C2]" />
                  <span className="text-sm font-bold text-white">Official LinkedIn Page</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                  12.4k+ Followers
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Join our professional community on LinkedIn for weekly AI architecture breakdowns and prompt templates.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-2">
                <LinkedInButton 
                  variant="primary" 
                  size="md" 
                  customText="Follow on LinkedIn"
                  className="w-full sm:w-auto"
                />

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Build with Mannat LinkedIn company profile page (opens in a new tab)"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
                >
                  <span>Company Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#content-highlights" className="hover:text-indigo-400 transition-colors">
                  Core Highlights
                </a>
              </li>
              <li>
                <a href="#prompts-library" className="hover:text-indigo-400 transition-colors">
                  ChatGPT & Claude Prompts
                </a>
              </li>
              <li>
                <a href="#mental-models" className="hover:text-indigo-400 transition-colors">
                  LLM Visual Mental Models
                </a>
              </li>
              <li>
                <a href="#python-workflows" className="hover:text-indigo-400 transition-colors">
                  Python AI Code Snippets
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Company Page (opens in new tab)"
                  className="inline-flex items-center gap-1.5 text-[#0A66C2] hover:text-blue-400 font-semibold"
                >
                  <LinkedInIconSVG className="w-4 h-4" />
                  <span>LinkedIn Network</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Weekly AI Insights Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Weekly AI Prompt Newsletter
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest ChatGPT system prompts, Python Gemini SDK updates, and mental model diagrams sent to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you! You are subscribed to Build with Mannat insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="enter.your.email@company.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-500">No spam ever. Unsubscribe anytime.</span>
              </form>
            )}

            {/* Direct Copy URL Utility */}
            <div className="pt-2">
              <button
                onClick={handleCopyFooterLink}
                className="w-full py-2 px-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-between transition-colors"
                aria-label="Copy exact LinkedIn company page URL"
              >
                <span className="truncate font-mono text-[11px] text-slate-400">
                  {LINKEDIN_URL}
                </span>
                {copiedLink ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <span className="text-indigo-400 flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy Link
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Security Metadata */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong>Build with Mannat</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Build with Mannat LinkedIn URL with target _blank and rel noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <LinkedInIconSVG className="w-4 h-4 text-[#0A66C2]" />
              <span>linkedin.com/company/buildwithmannat/</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
