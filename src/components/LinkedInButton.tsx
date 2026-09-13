/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LINKEDIN_URL } from '../data/mockData';
import { Check, Copy, ExternalLink, Users } from 'lucide-react';
import { LinkedInButtonProps } from '../types';

/**
 * Official LinkedIn Icon SVG Component with authentic branding geometry.
 */
export const LinkedInIconSVG: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

/**
 * High-converting LinkedIn Follow Button & Social link component.
 * Features official SVG icon, target="_blank", rel="noopener noreferrer", ARIA labels,
 * hover state transitions, and drop shadow.
 */
export const LinkedInButton: React.FC<LinkedInButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showBadge = false,
  followerCount = '12.4k',
  customText,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(LINKEDIN_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Base styling with hover transitions and subtle drop shadow
  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = 'bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-[#0A66C2]/25 hover:shadow-[#0A66C2]/40 border border-[#0A66C2]/50 hover:border-[#004182]';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/60 hover:border-[#0A66C2]/60 shadow-md shadow-black/40 hover:shadow-[#0A66C2]/20';
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent hover:bg-[#0A66C2]/10 text-[#0A66C2] hover:text-white border border-[#0A66C2] shadow-sm hover:shadow-md hover:shadow-[#0A66C2]/20';
  } else if (variant === 'compact') {
    variantClasses = 'bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/30 shadow-sm';
  } else if (variant === 'badge') {
    variantClasses = 'bg-gradient-to-r from-[#0A66C2] to-indigo-600 hover:from-[#004182] hover:to-indigo-700 text-white shadow-xl shadow-[#0A66C2]/30 hover:shadow-[#0A66C2]/50 border border-blue-400/30';
  }

  // Size padding adjustments
  let sizeClasses = 'px-5 py-2.5 text-sm gap-2.5';
  if (size === 'sm') sizeClasses = 'px-3.5 py-1.5 text-xs gap-2';
  if (size === 'lg') sizeClasses = 'px-7 py-3.5 text-base gap-3 font-semibold';

  const defaultLabel = customText || 'Follow on LinkedIn';

  return (
    <div className={`inline-flex items-center gap-2 group ${className}`}>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Build with Mannat on LinkedIn (opens in a new tab)"
        className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 transform active:scale-[0.98] select-none ${variantClasses} ${sizeClasses}`}
      >
        <LinkedInIconSVG className={`transition-transform duration-300 group-hover:scale-110 ${size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <span>{defaultLabel}</span>

        {showBadge && (
          <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-white/20 text-white rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" />
            {followerCount}
          </span>
        )}

        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-0.5" />
      </a>

      {/* Quick copy link utility button */}
      <button
        onClick={handleCopyLink}
        title="Copy LinkedIn company profile link"
        aria-label="Copy LinkedIn URL to clipboard"
        className="p-2.5 text-slate-400 hover:text-slate-100 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default LinkedInButton;
