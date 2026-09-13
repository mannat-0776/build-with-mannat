/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RedditNewsItem } from '../types';
import { INITIAL_REDDIT_NEWS } from '../data/mockData';
import { 
  Flame, 
  RefreshCw, 
  ExternalLink, 
  MessageSquare, 
  ArrowUp, 
  Sparkles, 
  Search, 
  Clock, 
  Globe, 
  AlertCircle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Shuffle
} from 'lucide-react';

export const RedditAiNewsSection: React.FC = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState('ArtificialInteligence');
  const [news, setNews] = useState<RedditNewsItem[]>(INITIAL_REDDIT_NEWS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFallback, setIsFallback] = useState(false);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [summarizingId, setSummarizingId] = useState<string | null>(null);

  // Auto Rotation Spotlight state
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  const subreddits = [
    { id: 'ArtificialInteligence', label: 'r/ArtificialInteligence' },
    { id: 'MachineLearning', label: 'r/MachineLearning' },
    { id: 'LocalLLaMA', label: 'r/LocalLLaMA' },
    { id: 'OpenAI', label: 'r/OpenAI' },
    { id: 'ChatGPT', label: 'r/ChatGPT' },
    { id: 'singularity', label: 'r/singularity' },
  ];

  const fetchRedditNews = async (sub: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reddit/news?subreddit=${sub}&sort=hot`);
      const data = await res.json();
      if (data.success && Array.isArray(data.news)) {
        setNews(data.news);
        setIsFallback(!!data.isFallback);
        setSpotlightIndex(0);
      }
    } catch (err) {
      console.warn("Error fetching Reddit news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedditNews(selectedSubreddit);
  }, [selectedSubreddit]);

  // Auto-rotation timer logic
  useEffect(() => {
    if (!isAutoPlay || news.length === 0) return;

    const intervalTime = 6000; // 6 seconds per post
    const tickTime = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += tickTime;
      setProgress((elapsed / intervalTime) * 100);

      if (elapsed >= intervalTime) {
        setSpotlightIndex((prev) => (prev + 1) % news.length);
        elapsed = 0;
        setProgress(0);
      }
    }, tickTime);

    return () => clearInterval(timer);
  }, [isAutoPlay, news]);

  const handleNextSpotlight = () => {
    if (news.length === 0) return;
    setSpotlightIndex((prev) => (prev + 1) % news.length);
    setProgress(0);
  };

  const handlePrevSpotlight = () => {
    if (news.length === 0) return;
    setSpotlightIndex((prev) => (prev - 1 + news.length) % news.length);
    setProgress(0);
  };

  const handleRandomSpotlight = () => {
    if (news.length <= 1) return;
    let randomIndex = Math.floor(Math.random() * news.length);
    if (randomIndex === spotlightIndex) {
      randomIndex = (randomIndex + 1) % news.length;
    }
    setSpotlightIndex(randomIndex);
    setProgress(0);
  };

  const handleSummarizeWithGemini = async (item: RedditNewsItem) => {
    setSummarizingId(item.id);
    try {
      const res = await fetch('/api/reddit/news/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          selftext: item.selftext
        })
      });

      const data = await res.json();
      if (data.summary) {
        setSummaries(prev => ({ ...prev, [item.id]: data.summary }));
      }
    } catch (err) {
      console.error("Failed to summarize post with Gemini:", err);
    } finally {
      setSummarizingId(null);
    }
  };

  const filteredNews = news.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      (item.selftext && item.selftext.toLowerCase().includes(query))
    );
  });

  const featuredSpotlightPost = news[spotlightIndex] || news[0];

  return (
    <section id="reddit-ai-news" className="py-20 bg-[#060912] relative border-b border-slate-800/80">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Live Reddit Scraper & Auto-Rotating Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Reddit AI News Stream
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-time trending AI breakthroughs, paper discussions, open-source model releases, and local LLM benchmark threads scraped live from Reddit's top AI communities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchRedditNews(selectedSubreddit)}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-400' : ''}`} />
              <span>Scrape Fresh News</span>
            </button>
          </div>
        </div>

        {/* Featured Auto-Rotating Spotlight Banner */}
        {featuredSpotlightPost && (
          <div className="glass-panel rounded-3xl border border-orange-500/40 bg-gradient-to-r from-orange-950/40 via-slate-900/90 to-slate-900/90 overflow-hidden shadow-2xl relative">
            
            {/* Top Progress bar indicator */}
            <div className="w-full bg-slate-950/80 h-1 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-100 ease-linear"
                style={{ width: isAutoPlay ? `${progress}%` : '100%' }}
              />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs border border-orange-500/30 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 animate-bounce" />
                    Spotlight #{spotlightIndex + 1} of {news.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {featuredSpotlightPost.subreddit} • u/{featuredSpotlightPost.author}
                  </span>
                </div>

                {/* Controls for Spotlight Auto Rotation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRandomSpotlight}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs flex items-center gap-1 font-semibold"
                    title="Pick Random Reddit Post"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-orange-400" />
                    <span className="hidden sm:inline">Random Post</span>
                  </button>

                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={isAutoPlay ? "Pause Auto-Rotation" : "Play Auto-Rotation"}
                  >
                    {isAutoPlay ? (
                      <Pause className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </button>

                  <button
                    onClick={handlePrevSpotlight}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSpotlight}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Spotlight Content */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-extrabold text-white hover:text-orange-300 transition-colors leading-snug">
                  <a href={featuredSpotlightPost.url} target="_blank" rel="noopener noreferrer">
                    {featuredSpotlightPost.title}
                  </a>
                </h3>

                {featuredSpotlightPost.selftext && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {featuredSpotlightPost.selftext}
                  </p>
                )}

                {/* Gemini AI Summary if active */}
                {summaries[featuredSpotlightPost.id] ? (
                  <div className="p-4 rounded-xl bg-orange-950/50 border border-orange-500/40 text-xs text-orange-200 font-sans space-y-1">
                    <div className="font-bold text-orange-400 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Gemini AI Executive Summary
                    </div>
                    <div className="whitespace-pre-line text-xs leading-relaxed">
                      {summaries[featuredSpotlightPost.id]}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Spotlight Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-bold text-orange-400">
                    <ArrowUp className="w-4 h-4 text-orange-500" /> {featuredSpotlightPost.score} Upvotes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-slate-400" /> {featuredSpotlightPost.numComments} Comments
                  </span>
                  <span className="text-slate-500">{featuredSpotlightPost.timeAgo}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSummarizeWithGemini(featuredSpotlightPost)}
                    disabled={summarizingId === featuredSpotlightPost.id}
                    className="px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-semibold border border-orange-500/40 flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${summarizingId === featuredSpotlightPost.id ? 'animate-spin' : ''}`} />
                    <span>{summarizingId === featuredSpotlightPost.id ? 'Summarizing...' : 'Summarize with Gemini'}</span>
                  </button>

                  <a
                    href={featuredSpotlightPost.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-orange-600/20"
                  >
                    <span>Read Full Reddit Thread</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Subreddit Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
          
          {/* Subreddit Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {subreddits.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubreddit(sub.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubreddit === sub.id
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scraped headlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

        </div>

        {/* Scraper Status Banner */}
        {isFallback && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              Live Reddit API proxy fallback active. Serving high-signal AI news cache updated for <strong>r/{selectedSubreddit}</strong>.
            </span>
          </div>
        )}

        {/* News Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-sm">
              No news items matched "{searchQuery}". Try clearing your search.
            </div>
          ) : (
            filteredNews.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSpotlightIndex(index)}
                className={`glass-panel rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  spotlightIndex === index
                    ? 'border-orange-500/60 bg-gradient-to-b from-orange-950/20 to-slate-900/90 shadow-lg shadow-orange-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-orange-500/40'
                }`}
              >
                
                <div className="p-5 space-y-4">
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-orange-400 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-orange-500" />
                      {item.subreddit}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" /> {item.timeAgo}
                    </span>
                  </div>

                  {/* News Title */}
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-200 transition-colors leading-snug line-clamp-3">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      {item.title}
                    </a>
                  </h3>

                  {/* Selftext Preview */}
                  {item.selftext && (
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {item.selftext}
                    </p>
                  )}

                  {/* Gemini 2-Bullet AI Summary Box */}
                  {summaries[item.id] ? (
                    <div className="p-3.5 rounded-xl bg-orange-950/30 border border-orange-500/30 text-xs text-orange-200 space-y-1 font-sans">
                      <div className="flex items-center gap-1.5 font-bold text-orange-400 text-[11px] uppercase tracking-wider mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                        Gemini AI Executive Summary
                      </div>
                      <div className="whitespace-pre-line leading-relaxed text-[11px]">
                        {summaries[item.id]}
                      </div>
                    </div>
                  ) : item.summary ? (
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                      <span className="font-semibold text-orange-400">AI Note: </span>
                      {item.summary}
                    </div>
                  ) : null}

                </div>

                {/* Footer Controls */}
                <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <ArrowUp className="w-3.5 h-3.5 text-orange-500" /> {item.score}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" /> {item.numComments}
                    </span>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleSummarizeWithGemini(item)}
                      disabled={summarizingId === item.id}
                      className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-[11px] font-semibold border border-orange-500/30 flex items-center gap-1 transition-colors"
                      title="Generate 2-bullet summary with Gemini"
                    >
                      <Sparkles className={`w-3 h-3 ${summarizingId === item.id ? 'animate-spin' : ''}`} />
                      <span>{summarizingId === item.id ? 'Summarizing...' : 'AI Summary'}</span>
                    </button>

                    <a
                      href={item.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Open Reddit Thread"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
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

export default RedditAiNewsSection;
