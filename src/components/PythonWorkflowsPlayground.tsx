/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PYTHON_WORKFLOWS } from '../data/mockData';
import { WorkflowSnippet } from '../types';
import { Code2, Copy, Check, Terminal, Play, FileCode, CheckCircle2, Download } from 'lucide-react';

export const PythonWorkflowsPlayground: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = useState<WorkflowSnippet>(PYTHON_WORKFLOWS[0]);
  const [copied, setCopied] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRun = () => {
    setIsRunning(true);
    setSimulatedOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      if (activeSnippet.id === 'w1') {
        setSimulatedOutput(`🤖 Prompt: Explain quantum computing in 3 simple developer bullet points.

1. Superposition: Qubits can exist in multiple probabilistic states simultaneously rather than static 0 or 1.
2. Entanglement: Qubits can be linked, allowing instantaneous state correlation across nodes.
3. Interference: Quantum algorithms amplify correct solution paths while canceling out errors.

[Stream Finished in 420ms]`);
      } else if (activeSnippet.id === 'w2') {
        setSimulatedOutput(`Parsed Pydantic Object:
Title: "OpenAI announced new reasoning models with web search grounding."
Key Technologies: ["OpenAI", "Reasoning Models", "Web Grounding"]
Sentiment: "Bullish"
Complexity Score: 8

Validation: 100% Passed (Type safe)`);
      } else {
        setSimulatedOutput(`[Execution Attempt 1] API Rate Limit (429 Too Many Requests)
⚠️ API error: 429 Rate Limit. Retrying in 1.0s...
[Execution Attempt 2] Success! Payload returned status 200 OK.`);
      }
    }, 800);
  };

  return (
    <section id="python-workflows" className="py-20 bg-[#090D16] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            Production Python Blueprints
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Python AI Code Snippets & <span className="text-emerald-400">Workflows</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Production-grade Python templates leveraging modern async drivers, Pydantic type safety, retry decorators, and Google Gemini SDK best practices.
          </p>
        </div>

        {/* Main Code Studio Canvas */}
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Sidebar: Snippet Selector List */}
          <div className="lg:col-span-4 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              Available Blueprints
            </div>

            {PYTHON_WORKFLOWS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSnippet(item);
                  setSimulatedOutput(null);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  activeSnippet.id === item.id
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg text-white font-semibold'
                    : 'bg-slate-900/30 hover:bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-medium">.{item.language}</span>
                  <div className="flex gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-sm font-bold mt-2 text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
              </button>
            ))}
          </div>

          {/* Right Area: Code Viewer & Interactive Console Runner */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-[#060911]">
            
            {/* Top Editor Toolbar */}
            <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">
                  {activeSnippet.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateRun}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                  aria-label="Run test execution"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  aria-label="Copy Python code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto max-h-[400px]">
              <pre>{activeSnippet.code}</pre>
            </div>

            {/* Simulated Output Terminal Box */}
            {simulatedOutput && (
              <div className="p-4 bg-black border-t border-slate-800 font-mono text-xs text-emerald-400 leading-relaxed animate-in fade-in duration-200">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  Terminal Console Output
                </div>
                <pre className="whitespace-pre-wrap">{simulatedOutput}</pre>
              </div>
            )}

            {/* Bottom Status bar */}
            <div className="px-5 py-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Python 3.11+ Compatible • @google/genai SDK
              </span>
              <a
                href="https://www.linkedin.com/company/buildwithmannat/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                More workflows on LinkedIn →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PythonWorkflowsPlayground;
