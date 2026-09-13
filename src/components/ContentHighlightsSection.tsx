/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TOPIC_HIGHLIGHTS } from '../data/mockData';
import { MessageSquareCode, Network, Code2, Workflow, ArrowUpRight, Sparkles, CheckCircle } from 'lucide-react';

export const ContentHighlightsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareCode':
        return <MessageSquareCode className="w-6 h-6 text-indigo-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-sky-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-emerald-400" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-indigo-400" />;
    }
  };

  const getTargetAnchor = (category: string) => {
    switch (category) {
      case 'prompts':
        return '#prompts-library';
      case 'visuals':
        return '#mental-models';
      case 'python':
        return '#python-workflows';
      case 'workflows':
        return '#python-workflows';
      default:
        return '#prompts-library';
    }
  };

  return (
    <section id="content-highlights" className="py-20 bg-slate-950/50 relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Core Knowledge Pillars
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            High-Impact Topics Covered by <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">Build with Mannat</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Delivering deep-dive tactical playbooks, prompt libraries, visual architectural models, and production-grade code snippets designed for AI engineers, founders, and technical builders.
          </p>
        </div>

        {/* Highlight Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOPIC_HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group border border-slate-800"
            >
              <div className="space-y-5">
                
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                    {getIcon(item.iconName)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700/80">
                      {item.tag}
                    </span>
                    {item.metrics && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.metrics}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-slate-400 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Code Preview snippet box */}
                {item.featuredCode && (
                  <div className="mt-4 p-4 rounded-xl bg-[#070A10] border border-slate-800/90 font-mono text-xs text-slate-300 overflow-x-auto">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1.5 flex items-center justify-between">
                      <span>Featured Blueprint</span>
                      <span className="text-indigo-400">Preview</span>
                    </div>
                    <code className="text-indigo-200">{item.featuredCode}</code>
                  </div>
                )}

              </div>

              {/* Bottom Card Action Link */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                  Explore {item.category} resource
                </span>

                <a
                  href={getTargetAnchor(item.category)}
                  className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold group-hover:translate-x-1 transition-transform"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Mid-Section Callout Strip */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Want Daily Insights on LinkedIn?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Follow <strong>Build with Mannat</strong> on LinkedIn for breakdown carousels, architecture visualizers, and prompt cheat sheets published weekly.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/company/buildwithmannat/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with Build with Mannat on LinkedIn"
            className="px-6 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-sm shadow-lg shadow-[#0A66C2]/30 hover:shadow-[#0A66C2]/50 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Follow LinkedIn Company Page</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ContentHighlightsSection;
