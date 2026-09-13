/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROMPTS_LIBRARY } from '../data/mockData';
import { PromptItem } from '../types';
import { Search, Copy, Check, Sparkles, Filter, ThumbsUp, Tag, ArrowRight } from 'lucide-react';

interface InteractivePromptLibraryProps {
  onSelectPromptForAi?: (promptText: string) => void;
}

export const InteractivePromptLibrary: React.FC<InteractivePromptLibraryProps> = ({ onSelectPromptForAi }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedPrompts, setLikedPrompts] = useState<Record<string, number>>({});

  const categories = ['All', 'Developer Tools', 'System Architecture', 'Refactoring & Debugging', 'Prompt Engineering', 'Founder Strategy'];

  const filteredPrompts = PROMPTS_LIBRARY.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.promptText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: string, initialLikes: number) => {
    setLikedPrompts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + 1,
    }));
  };

  return (
    <section id="prompts-library" className="py-20 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Developer & Founder Toolkit
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated ChatGPT & Claude <span className="text-indigo-400">Prompts Library</span>
            </h2>
            <p className="text-slate-400 text-base mt-2 max-w-2xl">
              Copy-pasteable, battle-tested prompt templates engineered for code reviews, architecture blueprints, schema extraction, and pitch deck positioning.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search prompts by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prompt Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-4">
                
                {/* Card Top Meta */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Tag className="w-3 h-3" />
                    {prompt.category}
                  </span>

                  <button
                    onClick={() => handleLike(prompt.id, prompt.likes)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{likedPrompts[prompt.id] ?? prompt.likes}</span>
                  </button>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                    {prompt.description}
                  </p>
                </div>

                {/* Prompt Text Block */}
                <div className="relative group/prompt">
                  <div className="p-4 rounded-xl bg-[#060911] border border-slate-800/90 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed max-h-48 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{prompt.promptText}</pre>
                  </div>

                  <button
                    onClick={() => handleCopy(prompt.id, prompt.promptText)}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all opacity-90 hover:opacity-100"
                    aria-label={`Copy ${prompt.title}`}
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied Prompt!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Author Tip Box */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">💡 Pro Tip:</span>
                  <span>{prompt.tips}</span>
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Created by <strong>{prompt.author}</strong></span>

                {onSelectPromptForAi && (
                  <button
                    onClick={() => onSelectPromptForAi(prompt.promptText)}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <span>Enhance in AI Assistant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InteractivePromptLibrary;
