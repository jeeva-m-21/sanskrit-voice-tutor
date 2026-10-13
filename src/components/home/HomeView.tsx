'use client';

import React from 'react';
import { 
  Flame, Mic, BookOpen, Layers, CheckCircle2, 
  Sparkles, Award, ArrowRight, Volume2 
} from 'lucide-react';

interface HomeViewProps {
  onStartChat: () => void;
  onStartLiveVoice: () => void;
  onGoToReview: () => void;
  onGoToCurriculum: () => void;
  reviewCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartChat,
  onStartLiveVoice,
  onGoToReview,
  onGoToCurriculum,
  reviewCount,
}) => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Stage 1 • Survival Sanskrit (A1)
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-stone-900/80 px-2.5 py-0.5 rounded-full border border-stone-800">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>5 Day Streak</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200">
              सुप्रभातम्! अद्य संस्कृतेन सम्भाषणं कुर्मः।
            </h1>
            <p className="text-xs sm:text-sm font-mono text-stone-400 italic mt-0.5">
              suprabhātam! adya saṃskṛtena sambhāṣaṇaṃ kurmaḥ.
            </p>
            <p className="text-sm text-stone-300 mt-2">
              Good morning! Today, your goal is 15 minutes of spoken Sanskrit conversation with your Guru.
            </p>
          </div>

          {/* Quick Voice CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onStartLiveVoice}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-xl shadow-amber-600/20 transition active:scale-95"
            >
              <Mic className="w-5 h-5 fill-stone-950" />
              <span>Talk Now with Guru (Live Voice)</span>
            </button>

            <button
              onClick={onStartChat}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-stone-800/90 hover:bg-stone-700 border border-stone-700 text-stone-200 font-semibold text-sm transition"
            >
              <span>Open Guided Chat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Daily Plan & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Next Lesson Card */}
        <div 
          onClick={onGoToCurriculum}
          className="p-5 bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl cursor-pointer transition shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Today&apos;s Unit</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-100 font-serif">परिचयः एवं शिष्टाचारः</h4>
            <p className="text-xs text-stone-400 mt-0.5">Introductions & Polite forms (A1 Unit 1)</p>
          </div>
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 pt-1">
            <span>Continue Unit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Spaced Review Queue Card */}
        <div 
          onClick={onGoToReview}
          className="p-5 bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl cursor-pointer transition shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Flashcards</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-amber-300 font-mono">{reviewCount} Cards Due</h4>
            <p className="text-xs text-stone-400 mt-0.5">Spaced repetition queue for vocabulary</p>
          </div>
          <span className="text-xs font-semibold text-purple-400 flex items-center gap-1 pt-1">
            <span>Start Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Daily Progress Goal Ring */}
        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Goal: 15 Mins</span>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-stone-300">Daily Speaking Goal</span>
              <span className="font-mono text-emerald-400 font-bold">10 / 15 min</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full w-[66%]" />
            </div>
          </div>
          <p className="text-[11px] text-stone-400">5 minutes remaining to maintain your streak!</p>
        </div>
      </div>
    </div>
  );
};
