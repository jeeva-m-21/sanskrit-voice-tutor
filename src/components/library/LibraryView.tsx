'use client';

import React, { useState } from 'react';
import { Volume2, BookOpen, ScrollText, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { LIBRARY_TEXTS, LibraryText } from '@/lib/curriculum/curriculum-data';

export const LibraryView: React.FC = () => {
  const [selectedText, setSelectedText] = useState<LibraryText>(LIBRARY_TEXTS[0]);
  const [activeTab, setActiveTab] = useState<'shloka' | 'anvaya' | 'wordByWord'>('shloka');

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'hi-IN';
      utt.rate = 0.8;
      window.speechSynthesis.speak(utt);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-serif text-amber-300 flex items-center gap-2">
          <span>संस्कृत-पुस्तकालयः (Sanskrit Library)</span>
          <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Graded Texts & Gita
          </span>
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Explore authentic texts with prose reordering (anvaya), meter analysis, and word-by-word gloss.
        </p>
      </div>

      {/* Text Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {LIBRARY_TEXTS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedText(t)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition ${
              selectedText.id === t.id
                ? 'bg-amber-600 text-stone-950 border-amber-500 shadow-md'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Main Reader Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Card Header & Source */}
        <div className="flex items-start justify-between border-b border-stone-800 pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              {selectedText.source}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-100 mt-0.5">
              {selectedText.title}
            </h3>
            {selectedText.meter && (
              <span className="inline-block mt-1 text-xs text-stone-400 font-mono">
                छन्दः: {selectedText.meter}
              </span>
            )}
          </div>

          <button
            onClick={() => speakText(selectedText.devanagariLines.join(' '))}
            className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 transition border border-stone-700"
            title="Recite aloud"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex gap-2 border-b border-stone-800 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('shloka')}
            className={`pb-1 transition border-b-2 ${
              activeTab === 'shloka'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-300'
            }`}
          >
            मूल-पाठः (Original Verse)
          </button>
          {selectedText.anvaya && (
            <button
              onClick={() => setActiveTab('anvaya')}
              className={`pb-1 transition border-b-2 ${
                activeTab === 'anvaya'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-stone-500 hover:text-stone-300'
              }`}
            >
              अन्वयः (Prose Word Order)
            </button>
          )}
          <button
            onClick={() => setActiveTab('wordByWord')}
            className={`pb-1 transition border-b-2 ${
              activeTab === 'wordByWord'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-300'
            }`}
          >
            पदच्छेदः एवं अर्थः (Word Breakdown)
          </button>
        </div>

        {/* Tab 1: Original Verse */}
        {activeTab === 'shloka' && (
          <div className="space-y-4 py-2">
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6 text-center space-y-3">
              {selectedText.devanagariLines.map((line, idx) => (
                <p key={idx} className="text-xl sm:text-2xl font-serif text-amber-100 tracking-wide">
                  {line}
                </p>
              ))}
              <div className="pt-2 border-t border-amber-500/10">
                {selectedText.iastLines.map((line, idx) => (
                  <p key={idx} className="text-xs sm:text-sm font-mono text-stone-400 italic">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 bg-stone-800/40 rounded-xl border border-stone-800">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                English Translation
              </span>
              <p className="text-sm text-stone-200 leading-relaxed">
                {selectedText.englishSummary}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Anvaya (Prose Order) */}
        {activeTab === 'anvaya' && selectedText.anvaya && (
          <div className="space-y-4 py-2">
            <div className="bg-stone-800/60 rounded-2xl p-5 border border-stone-700/60 space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                अन्वय-क्रमः (Natural Syntactic Flow)
              </span>
              <p className="text-lg font-serif text-stone-100 leading-relaxed">
                {selectedText.anvaya}
              </p>
            </div>
            <p className="text-xs text-stone-400 italic">
              💡 Sanskrit poetry permits free word order for meter. Anvaya rearranges the words into natural Subject-Object-Verb (SOV) order for effortless comprehension.
            </p>
          </div>
        )}

        {/* Tab 3: Word-by-word Breakdown */}
        {activeTab === 'wordByWord' && (
          <div className="space-y-2 py-2">
            <div className="divide-y divide-stone-800">
              {selectedText.wordByWord.map((w, idx) => (
                <div key={idx} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-serif text-amber-200 font-bold">{w.sanskrit}</span>
                      <span className="text-xs font-mono text-stone-400 italic">({w.iast})</span>
                    </div>
                    <p className="text-sm text-stone-200 mt-0.5">{w.meaning}</p>
                  </div>
                  <span className="text-xs font-sans px-2.5 py-1 rounded-md bg-stone-800 text-amber-300/90 border border-stone-700 whitespace-nowrap">
                    {w.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
