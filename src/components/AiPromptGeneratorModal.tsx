/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, X, Send, Copy, Check, Terminal, RefreshCw, AlertCircle } from 'lucide-react';

interface AiPromptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPromptText?: string;
}

export const AiPromptGeneratorModal: React.FC<AiPromptGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialPromptText = '',
}) => {
  const [userQuery, setUserQuery] = useState(initialPromptText || '');
  const [taskType, setTaskType] = useState<'prompt' | 'mental_model' | 'python_sdk'>('prompt');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setIsLoading(true);
    setErrorMsg('');
    setGeneratedOutput('');

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: userQuery.trim(),
          taskType,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }

      setGeneratedOutput(data.result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong while contacting Gemini API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Build with Mannat AI Assistant
              </h3>
              <p className="text-xs text-slate-400">Powered by Gemini 3.8 Flash SDK Proxy</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Task Type Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTaskType('prompt')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                taskType === 'prompt'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Generate System Prompt
            </button>
            <button
              type="button"
              onClick={() => setTaskType('mental_model')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                taskType === 'mental_model'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Explain Mental Model
            </button>
            <button
              type="button"
              onClick={() => setTaskType('python_sdk')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                taskType === 'python_sdk'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Python Gemini SDK Code
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5 tracking-wider">
                What are you building or trying to understand?
              </label>
              <textarea
                rows={3}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder={
                  taskType === 'prompt'
                    ? 'e.g., I need a high-converting system prompt to review PostgreSQL schema migrations...'
                    : taskType === 'mental_model'
                    ? 'e.g., Explain KV Cache memory optimization in LLM attention layers...'
                    : 'e.g., Write a Python script to call Gemini 3.8 Flash with structured Pydantic schema...'
                }
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !userQuery.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate AI Asset</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Output Display Area */}
          {generatedOutput && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  Generated Output Result
                </span>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Output</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#060A12] border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto max-h-72">
                <pre className="whitespace-pre-wrap">{generatedOutput}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Build with Mannat AI Engine</span>
          <a
            href="https://www.linkedin.com/company/buildwithmannat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            Follow on LinkedIn for updates →
          </a>
        </div>

      </div>
    </div>
  );
};

export default AiPromptGeneratorModal;
