/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LinkedInButton } from './LinkedInButton';
import { Sparkles, Terminal, Code2, Cpu, ArrowRight, CheckCircle2, Copy, Check, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiGenerator?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAiGenerator }) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'python' | 'architecture'>('prompt');
  const [copiedHeroCode, setCopiedHeroCode] = useState(false);

  const heroCodeSnippets = {
    prompt: `// System Prompt: Staff AI Architect
"You are a Principal AI Systems Engineer. Given a complex user feature request, evaluate:
1. Vector Embedding DB index strategy (HNSW vs IVF)
2. Token context window compression ratios
3. Deterministic schema enforcement using Gemini SDK structured output
Output a clean, step-by-step implementation blueprint with Python 3.11+ async code."`,
    python: `# Python Async Gemini Client Blueprint
import asyncio
from google import genai

async def generate_solution(query: str):
    ai = genai.Client()
    response = await ai.aio.models.generate_content(
        model="gemini-3.8-flash",
        contents=f"System: Respond as Staff AI Architect.\\nQuery: {query}"
    )
    return response.text

# Run async workflow
asyncio.run(generate_solution("Build resilient RAG pipeline"))`,
    architecture: `[ User Query ] ──► [ Query Vectorizer ]
                          │
                          ▼
                [ HNSW Vector Search ]
                          │ (Top 5 Context Chunks)
                          ▼
           [ Prompt Context Synthesizer ]
                          │
                          ▼
            [ Gemini 3.8 Reasoning Engine ] ──► [ Structured JSON Output ]`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(heroCodeSnippets[activeTab]);
    setCopiedHeroCode(true);
    setTimeout(() => setCopiedHeroCode(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                Build with Mannat
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-indigo-400 font-medium">
                AI Engineering & Founder Playbooks
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Master <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">AI Tools</span>, LLM Mental Models & Productivity Prompts
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
              High-signal ChatGPT & Claude prompt frameworks, visual LLM architecture mental models, Python AI code blueprints, and agentic workflows built specifically for developers and founders.
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300 font-medium pt-1">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>50+ Production-Tested ChatGPT Prompts</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>LLM Architecture & KV Cache Visuals</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Async Python Gemini SDK Templates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Autonomous Agentic Workflows</span>
              </div>
            </div>

            {/* CTA Buttons Group */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <LinkedInButton 
                variant="badge" 
                size="lg" 
                showBadge 
                followerCount="12.4k" 
                customText="Follow on LinkedIn"
              />

              <a
                href="#content-highlights"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 font-semibold text-base transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-indigo-500/10"
              >
                <span>Explore Highlights</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>

              {onOpenAiGenerator && (
                <button
                  onClick={onOpenAiGenerator}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/40 font-semibold text-sm transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-bounce" />
                  <span>Try AI Prompt Generator</span>
                </button>
              )}
            </div>

            {/* Community Stats Footer Strip */}
            <div className="pt-6 border-t border-slate-800/60 grid grid-cols-3 gap-4 max-w-lg text-left">
              <div>
                <div className="text-2xl font-extrabold text-white">12.4k+</div>
                <div className="text-xs text-slate-400 font-medium">LinkedIn Followers</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-indigo-400">50+</div>
                <div className="text-xs text-slate-400 font-medium">AI Prompts & Guides</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 font-medium">Developer Focused</div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Interactive Code & Architecture Preview Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative glow-effect">
              
              {/* Card Header Bar */}
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    buildwithmannat.py
                  </span>
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors"
                  aria-label="Copy hero snippet"
                >
                  {copiedHeroCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tab Switcher Bar */}
              <div className="flex bg-slate-950/70 border-b border-slate-800/80 px-2 pt-2 gap-1 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('prompt')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-lg transition-all ${
                    activeTab === 'prompt'
                      ? 'bg-slate-900 text-indigo-400 border-t-2 border-indigo-500 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  System Prompt
                </button>
                <button
                  onClick={() => setActiveTab('python')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-lg transition-all ${
                    activeTab === 'python'
                      ? 'bg-slate-900 text-emerald-400 border-t-2 border-emerald-500 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Python SDK
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-lg transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-slate-900 text-sky-400 border-t-2 border-sky-500 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  LLM Model Diagram
                </button>
              </div>

              {/* Code Display Area */}
              <div className="p-5 bg-[#070A10]/95 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto min-h-[220px] max-h-[300px]">
                <pre className="whitespace-pre-wrap">
                  {heroCodeSnippets[activeTab]}
                </pre>
              </div>

              {/* Footer Status inside Hero Card */}
              <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Tested on Gemini 3.8 & Claude 3.5 Sonnet
                </span>
                <span className="text-emerald-400 font-mono">100% Free Resources</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
