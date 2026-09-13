/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LinkedInPost } from '../types';
import { LINKEDIN_POSTS, LINKEDIN_URL } from '../data/mockData';
import { LinkedInButton, LinkedInIconSVG } from './LinkedInButton';
import { 
  Plus, 
  RefreshCw, 
  ExternalLink, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Pin, 
  Share2, 
  Check, 
  Code2, 
  Send, 
  Sparkles,
  CheckCircle2,
  Terminal
} from 'lucide-react';

export const LinkedInFeedSection: React.FC = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>(LINKEDIN_POSTS);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Post Creator Modal State
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCodeSnippet, setNewCodeSnippet] = useState('');
  const [newTags, setNewTags] = useState('AIEngineering, BuildWithMannat, LLM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/linkedin/posts');
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.warn("Failed to fetch LinkedIn posts, keeping current state:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleShare = (postId: string, postUrl: string) => {
    navigator.clipboard.writeText(postUrl);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setIsSubmitting(true);
    try {
      const tagArray = newTags
        .split(',')
        .map(t => t.trim().replace(/^#/, ''))
        .filter(Boolean);

      const res = await fetch('/api/linkedin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newContent,
          codeSnippet: newCodeSnippet.trim() || undefined,
          tags: tagArray.length > 0 ? tagArray : ['BuildWithMannat', 'AIEngineering']
        })
      });

      const data = await res.json();
      if (data.success && data.posts) {
        setPosts(data.posts);
        setPublishSuccess(true);
        setTimeout(() => {
          setPublishSuccess(false);
          setIsComposerOpen(false);
          setNewContent('');
          setNewCodeSnippet('');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="linkedin-feed" className="py-20 bg-[#070A12] relative border-b border-slate-800/80">
      
      {/* Glow ambient background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0A66C2] text-xs font-semibold">
              <LinkedInIconSVG className="w-4 h-4" />
              <span>LinkedIn Activity & Post Stream</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Build with Mannat LinkedIn Feed
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every post published on our official LinkedIn page automatically syncs here. Explore daily playbooks, code optimization breakdowns, and system prompt drops.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsComposerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Sync / Publish New Post</span>
            </button>

            <button
              onClick={fetchPosts}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Refresh LinkedIn Feed"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            </button>

            <LinkedInButton variant="primary" size="md" />
          </div>
        </div>

        {/* Posts List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`glass-panel rounded-2xl border transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl flex flex-col ${
                post.isPinned
                  ? 'border-indigo-500/50 bg-gradient-to-b from-indigo-950/20 to-slate-900/90'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              
              {/* Card Header: Author & Pin badge */}
              <div className="p-5 pb-3 border-b border-slate-800/60 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-600/20">
                    <LinkedInIconSVG className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {post.author}
                    </h3>
                    <p className="text-[11px] text-slate-400">{post.authorTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30">
                      <Pin className="w-3 h-3" /> Pinned
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500">{post.timestamp}</span>
                </div>
              </div>

              {/* Card Body: Content & Media */}
              <div className="p-5 flex-1 space-y-4">
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {post.content}
                </div>

                {/* Optional Code Snippet attachment */}
                {post.codeSnippet && (
                  <div className="rounded-xl bg-[#050811] border border-slate-800 p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-sans">
                      <span className="flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-indigo-400" /> Attached Code Snippet
                      </span>
                    </div>
                    <pre className="whitespace-pre">{post.codeSnippet}</pre>
                  </div>
                )}

                {/* Hashtags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] font-medium text-blue-400 hover:underline">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Engagement stats & direct LinkedIn CTA */}
              <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5 text-blue-500" /> {post.likesCount}
                  </span>
                  <span className="flex items-center gap-1 hover:text-slate-200 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" /> {post.commentsCount}
                  </span>
                  <span className="flex items-center gap-1 hover:text-slate-200 transition-colors">
                    <Repeat2 className="w-3.5 h-3.5" /> {post.repostsCount}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(post.id, post.postUrl)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy LinkedIn Post URL"
                  >
                    {copiedId === post.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View original LinkedIn post"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-[11px] font-semibold border border-blue-500/30 transition-colors"
                  >
                    <span>View on LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Composer Modal to add/sync LinkedIn Post directly to site */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="glass-panel w-full max-w-xl rounded-3xl border border-slate-700 shadow-2xl p-6 space-y-5 bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <LinkedInIconSVG className="w-5 h-5 text-[#0A66C2]" />
                <h3 className="text-base font-bold text-white">Publish / Sync LinkedIn Update</h3>
              </div>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

            {publishSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">LinkedIn Update Published!</h4>
                <p className="text-xs text-slate-400">Post is now live in the website feed and synced across users.</p>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Post Content / Breakdown
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Write your LinkedIn technical post update..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Optional Attached Code Snippet
                  </label>
                  <textarea
                    rows={3}
                    value={newCodeSnippet}
                    onChange={(e) => setNewCodeSnippet(e.target.value)}
                    placeholder="def my_python_ai_workflow(): ..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Hashtags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="AIEngineering, LLM, Python"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !newContent.trim()}
                    className="px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Publish Live to Website</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

export default LinkedInFeedSection;
