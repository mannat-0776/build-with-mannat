/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GithubRepoItem } from '../types';
import { INITIAL_GITHUB_REPOS } from '../data/mockData';
import { 
  Star, 
  GitFork, 
  Code, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  Shuffle, 
  Flame,
  Zap,
  Tag
} from 'lucide-react';

export const GithubTrendingSection: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepoItem[]>(INITIAL_GITHUB_REPOS);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [randomSpotlightRepo, setRandomSpotlightRepo] = useState<GithubRepoItem | null>(null);

  const topicFilters = [
    { id: 'ai', label: '🔥 All AI Top Repos' },
    { id: 'llm', label: '🧠 LLMs & Inference' },
    { id: 'agent', label: '🤖 Autonomous Agents' },
    { id: 'rag', label: '⚡ RAG & Vector DBs' },
    { id: 'gemini', label: '✨ Gemini & Google AI' },
    { id: 'python', label: '🐍 Python AI Tools' },
  ];

  const fetchTrendingRepos = async (topic: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github/trending?topic=${topic}&minStars=1000`);
      const data = await res.json();
      if (data.success && Array.isArray(data.repos)) {
        setRepos(data.repos);
      }
    } catch (err) {
      console.warn("Failed to fetch GitHub trending repos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingRepos(selectedTopic);
  }, [selectedTopic]);

  const handleCopyClone = (repo: GithubRepoItem) => {
    const cloneCmd = `git clone ${repo.url}.git`;
    navigator.clipboard.writeText(cloneCmd);
    setCopiedId(repo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePickRandomRepo = () => {
    if (repos.length === 0) return;
    const randomIndex = Math.floor(Math.random() * repos.length);
    setRandomSpotlightRepo(repos[randomIndex]);
  };

  const filteredRepos = repos.filter((repo) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(query) ||
      repo.fullName.toLowerCase().includes(query) ||
      repo.description.toLowerCase().includes(query) ||
      repo.language.toLowerCase().includes(query) ||
      repo.topics.some(t => t.toLowerCase().includes(query))
    );
  });

  const formatStars = (stars: number) => {
    if (stars >= 1000) {
      return (stars / 1000).toFixed(1) + 'k';
    }
    return stars.toString();
  };

  return (
    <section id="github-trending" className="py-20 bg-[#070B14] relative border-b border-slate-800/80">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>High-Star & Trending AI Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Useful AI GitHub Repos
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Hand-picked, high-star open source AI projects, agent frameworks, local inference engines, and vector search tools powering modern AI engineering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePickRandomRepo}
              className="px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <Shuffle className="w-4 h-4 text-indigo-400" />
              <span>Spotlight Random Repo</span>
            </button>

            <button
              onClick={() => fetchTrendingRepos(selectedTopic)}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
              <span>Refresh Repos</span>
            </button>
          </div>
        </div>

        {/* Random Spotlight Modal / Banner if triggered */}
        {randomSpotlightRepo && (
          <div className="glass-panel rounded-3xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-slate-900/90 p-6 sm:p-8 space-y-4 relative shadow-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Random Useful Pick Spotlight
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {randomSpotlightRepo.fullName}
                </span>
              </div>

              <button
                onClick={() => setRandomSpotlightRepo(null)}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Close Spotlight
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <a href={randomSpotlightRepo.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">
                    {randomSpotlightRepo.fullName}
                  </a>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {randomSpotlightRepo.description}
                </p>
                {randomSpotlightRepo.useCase && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Best For: {randomSpotlightRepo.useCase}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleCopyClone(randomSpotlightRepo)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors font-mono"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{copiedId === randomSpotlightRepo.id ? 'Copied Clone Cmd!' : 'git clone'}</span>
                </button>

                <a
                  href={randomSpotlightRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/20"
                >
                  <span>Star on GitHub ({formatStars(randomSpotlightRepo.stars)} ★)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Topic Filters & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
          
          {/* Topic Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {topicFilters.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setSelectedTopic(tf.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTopic === tf.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search high-star repos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-sm">
              No repositories matched "{searchQuery}". Try a different topic or query.
            </div>
          ) : (
            filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="glass-panel rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 transition-all duration-300 p-6 flex flex-col justify-between group shadow-lg"
              >
                
                <div className="space-y-4">
                  {/* Owner & Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {repo.ownerAvatar ? (
                        <img 
                          src={repo.ownerAvatar} 
                          alt={repo.owner} 
                          className="w-7 h-7 rounded-full border border-slate-700 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0">
                          {repo.owner[0]?.toUpperCase()}
                        </div>
                      )}
                      <span className="text-xs text-slate-400 font-mono truncate">
                        {repo.owner}
                      </span>
                    </div>

                    {/* Star Count Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-xs flex-shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{formatStars(repo.stars)}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {repo.description}
                    </p>
                  </div>

                  {/* Topic Chips */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {repo.topics.slice(0, 4).map((topic, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800/80 text-[11px] font-mono"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Practical Use Case */}
                  {repo.useCase && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300 font-sans flex items-start gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{repo.useCase}</span>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <Code className="w-3.5 h-3.5 text-emerald-400" /> {repo.language}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <GitFork className="w-3.5 h-3.5" /> {formatStars(repo.forks)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyClone(repo)}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-emerald-300 transition-colors border border-slate-800"
                      title="Copy git clone command"
                    >
                      {copiedId === repo.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>View Repo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default GithubTrendingSection;
