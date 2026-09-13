/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HeroSection } from './components/HeroSection';
import { ContentHighlightsSection } from './components/ContentHighlightsSection';
import { InteractivePromptLibrary } from './components/InteractivePromptLibrary';
import { LLMMentalModelsVisualizer } from './components/LLMMentalModelsVisualizer';
import { PythonWorkflowsPlayground } from './components/PythonWorkflowsPlayground';
import { LinkedInFeedSection } from './components/LinkedInFeedSection';
import { RedditAiNewsSection } from './components/RedditAiNewsSection';
import { GithubTrendingSection } from './components/GithubTrendingSection';
import { AiPromptGeneratorModal } from './components/AiPromptGeneratorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedPromptForAi, setSelectedPromptForAi] = useState('');

  const handleOpenAiModal = (promptText?: string) => {
    if (promptText) {
      setSelectedPromptForAi(promptText);
    } else {
      setSelectedPromptForAi('');
    }
    setAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Navbar Header */}
      <Navbar onOpenAiGenerator={() => handleOpenAiModal()} />

      {/* Main Landing Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenAiGenerator={() => handleOpenAiModal()} />

        {/* LinkedIn Activity Stream & Posts Feed */}
        <LinkedInFeedSection />

        {/* Live Scraped Reddit AI News Stream */}
        <RedditAiNewsSection />

        {/* Live Trending & High-Star GitHub AI Repositories */}
        <GithubTrendingSection />

        {/* Content Highlights Section */}
        <ContentHighlightsSection />

        {/* Interactive ChatGPT & Claude Prompts Library */}
        <InteractivePromptLibrary onSelectPromptForAi={(text) => handleOpenAiModal(text)} />

        {/* Interactive LLM Mental Models Visualizer */}
        <LLMMentalModelsVisualizer />

        {/* Python AI Workflows & Snippets Playground */}
        <PythonWorkflowsPlayground />
      </main>

      {/* Footer with LinkedIn Social Link & Official SVG */}
      <Footer />

      {/* Interactive Gemini AI Modal Assistant */}
      <AiPromptGeneratorModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialPromptText={selectedPromptForAi}
      />

    </div>
  );
}
