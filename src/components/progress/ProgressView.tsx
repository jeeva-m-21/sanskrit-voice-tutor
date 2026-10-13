'use client';

import React from 'react';
import { Award, Flame, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export const ProgressView: React.FC = () => {
  const skills = [
    { name: 'सम्भाषणम् (Speaking)', level: 'A1 - Elementary', percent: 68, color: 'from-amber-500 to-amber-600' },
    { name: 'श्रवणम् (Listening)', level: 'A2 - Conversational', percent: 75, color: 'from-blue-500 to-blue-600' },
    { name: 'पठनम् (Reading)', level: 'A1 - Devanagari Fluent', percent: 85, color: 'from-emerald-500 to-emerald-600' },
    { name: 'लेखनम् (Writing)', level: 'Pre-A1 - Foundations', percent: 50, color: 'from-purple-500 to-purple-600' },
    { name: 'व्याकरणम् (Grammar)', level: 'A1 - Lat Lakara & Cases', percent: 70, color: 'from-rose-500 to-rose-600' },
    { name: 'शब्दसङ्ग्रहः (Vocabulary)', level: '142 Words Mastered', percent: 62, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-serif text-amber-300 flex items-center gap-2">
          <span>प्रगति-फलकम् (Progress & Analytics)</span>
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Detailed metrics across the 6 Sanskrit language competencies mapped to CEFR A1-B2 standards.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Current Level</span>
          <span className="text-xl font-bold font-serif text-amber-300">A1 (Survival)</span>
        </div>
        <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Active Streak</span>
          <span className="text-xl font-bold text-amber-400 flex items-center gap-1">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
            5 Days
          </span>
        </div>
        <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Spoken Minutes</span>
          <span className="text-xl font-bold text-emerald-400">140 Mins</span>
        </div>
        <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Target Milestone</span>
          <span className="text-xl font-bold text-purple-400">A2 in 3 mo</span>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-xl">
        <h3 className="text-lg font-bold font-serif text-stone-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <span>दक्षता-मानचित्राणि (Skill Mastery Matrix)</span>
        </h3>

        <div className="space-y-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-200">{skill.name}</span>
                <span className="text-stone-400 font-mono">{skill.level}</span>
              </div>
              <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${skill.color} h-full rounded-full transition-all duration-700`}
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
