'use client';

import React from 'react';
import { CURRICULUM_STAGES, LessonUnit } from '@/lib/curriculum/curriculum-data';
import { CheckCircle2, Lock, Play, BookOpen, Sparkles } from 'lucide-react';

interface CurriculumViewProps {
  onStartLesson: (unit: LessonUnit) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onStartLesson }) => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-serif text-amber-300 flex items-center gap-2">
          <span>पाठ्यक्रम-मार्गः (Learning Journey)</span>
          <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            A1 to B2 Pathway
          </span>
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Structured Paninian progression from Devanagari foundations to fluent conversation and classical texts.
        </p>
      </div>

      {/* Path Timeline */}
      <div className="space-y-4">
        {CURRICULUM_STAGES.map((unit, idx) => {
          return (
            <div
              key={unit.id}
              className={`p-6 rounded-3xl border transition-all ${
                unit.completed
                  ? 'bg-stone-900/90 border-emerald-500/40 shadow-lg'
                  : unit.unlocked
                  ? 'bg-stone-900 border-amber-500/50 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20'
                  : 'bg-stone-900/40 border-stone-800/80 opacity-75'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-bold">
                      {unit.stageTitle} • Unit {unit.unitNumber}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                      {unit.levelBadge}
                    </span>
                    {unit.completed && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-serif text-stone-100">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-medium">
                    {unit.subtitle}
                  </p>
                  <p className="text-sm text-stone-300 pt-1 leading-relaxed max-w-2xl">
                    {unit.description}
                  </p>

                  {/* Grammar Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {unit.grammarFocus.map((g, gIdx) => (
                      <span
                        key={gIdx}
                        className="text-[11px] px-2.5 py-0.5 bg-stone-800/80 border border-stone-700 rounded-lg text-amber-300/80"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="shrink-0 flex sm:flex-col items-center justify-end">
                  {unit.unlocked ? (
                    <button
                      onClick={() => onStartLesson(unit)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg transition active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-stone-950" />
                      <span>{unit.completed ? 'Review Lesson' : 'Start Lesson'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800/60 border border-stone-800 text-stone-500 text-xs font-semibold">
                      <Lock className="w-4 h-4" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
