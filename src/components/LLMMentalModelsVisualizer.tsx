/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MENTAL_MODELS } from '../data/mockData';
import { MentalModel } from '../types';
import { Cpu, ArrowRight, Code2, Sparkles, CheckCircle2, Layers, Zap, Info, Copy, Check } from 'lucide-react';

export const LLMMentalModelsVisualizer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<MentalModel>(MENTAL_MODELS[0]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [copiedPython, setCopiedPython] = useState(false);

  const handleCopyPython = () => {
    navigator.clipboard.writeText(selectedModel.pythonExample);
    setCopiedPython(true);
    setTimeout(() => setCopiedPython(false), 2000);
  };

  return (
    <section id="mental-models" className="py-20 bg-slate-950 relative border-t border-slate-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Interactive Visual Mental Models
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Deconstructing <span className="text-sky-400">LLM Architectures</span> Step-by-Step
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Stop guessing how Large Language Models work under the hood. Click through interactive visual breakdowns of RAG pipelines, KV Cache memory, and ReAct agent execution loops.
          </p>
        </div>

        {/* Model Selector Cards Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {MENTAL_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                setSelectedModel(model);
                setActiveStepIndex(0);
              }}
              className={`p-5 rounded-2xl text-left transition-all border ${
                selectedModel.id === model.id
                  ? 'bg-slate-900 border-sky-500/60 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/40'
                  : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {model.category}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {model.complexity}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {model.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {model.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Active Model Interactive Breakdown Canvas */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
          
          {/* Header summary of selected model */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">{selectedModel.title}</h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-sky-300">
                  {selectedModel.subtitle}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
                {selectedModel.summary}
              </p>
            </div>

            <button
              onClick={handleCopyPython}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex-shrink-0"
            >
              {copiedPython ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied Python Example!</span>
                </>
              ) : (
                <>
                  <Code2 className="w-4 h-4 text-sky-400" />
                  <span>Copy Python Script</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Step Navigator */}
          <div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              Interactive Execution Pipeline (Step {activeStepIndex + 1} of {selectedModel.steps.length})
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {selectedModel.steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeStepIndex === idx
                      ? 'bg-sky-600/20 border-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                      : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] font-mono text-sky-400 mb-0.5">STEP {step.stepNumber}</div>
                  <div className="text-xs truncate font-medium">{step.title}</div>
                </button>
              ))}
            </div>

            {/* Active Step Content Display */}
            <div className="p-6 rounded-2xl bg-[#060A12] border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                  <span className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-mono">
                    {selectedModel.steps[activeStepIndex].stepNumber}
                  </span>
                  <h4>{selectedModel.steps[activeStepIndex].title}</h4>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedModel.steps[activeStepIndex].explanation}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
                  >
                    ← Previous Step
                  </button>
                  <button
                    disabled={activeStepIndex === selectedModel.steps.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(selectedModel.steps.length - 1, prev + 1))}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-600 text-xs text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-500 font-medium"
                  >
                    Next Step →
                  </button>
                </div>
              </div>

              {/* Code Snippet for this step */}
              <div className="lg:col-span-6">
                {selectedModel.steps[activeStepIndex].codeSnippet && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
                    <div className="text-[10px] uppercase text-slate-500 mb-2 font-bold">Pseudo Code / Implementation</div>
                    <code>{selectedModel.steps[activeStepIndex].codeSnippet}</code>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Key Takeaways & Full Python Script */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-800">
            
            {/* Key Takeaways */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Architectural Key Takeaways
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {selectedModel.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Python Code snippet */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  Full Python Pipeline Implementation
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-[#060911] border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-56">
                <pre>{selectedModel.pythonExample}</pre>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LLMMentalModelsVisualizer;
