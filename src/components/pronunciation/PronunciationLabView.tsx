'use client';

import React, { useState } from 'react';
import { Volume2, Mic, MicOff, CheckCircle, AlertTriangle, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { devanagariToIast } from '@/lib/sanskrit/transliterate';
import { getAIProvider } from '@/lib/ai/provider-factory';

interface DrillItem {
  id: string;
  category: 'minimal_pairs' | 'shadowing' | 'sandhi_sound';
  title: string;
  targetDevanagari: string;
  targetIast: string;
  focusSound: string;
  tip: string;
}

const DRILL_ITEMS: DrillItem[] = [
  {
    id: 'drill-1',
    category: 'minimal_pairs',
    title: 'Retroflex vs Dental (मूर्धन्य vs दन्त्य)',
    targetDevanagari: 'तरति (Dental त) vs टरति (Retroflex ट)',
    targetIast: 'tarati vs ṭarati',
    focusSound: 'त (Dental) / ट (Retroflex)',
    tip: 'For dental "त", touch tongue to upper teeth. For retroflex "ट", curl tongue back against the hard palate.'
  },
  {
    id: 'drill-2',
    category: 'minimal_pairs',
    title: 'Aspirated vs Unaspirated (महाप्राण vs अल्पप्राण)',
    targetDevanagari: 'फलम् (Aspirated फ) vs पलम् (Unaspirated प)',
    targetIast: 'phalam vs palam',
    focusSound: 'फ (ph) vs प (p)',
    tip: '"ph" has a puff of breath like "top-heavy", not an English "f". "p" has zero breath.'
  },
  {
    id: 'drill-3',
    category: 'shadowing',
    title: 'The Sacred Visarga (विसर्गोच्चारणम्)',
    targetDevanagari: 'रामः वनं गच्छति।',
    targetIast: 'rāmaḥ vanaṃ gacchati.',
    focusSound: 'ः (Visarga / Echo breath)',
    tip: 'The visarga in "rāmaḥ" sounds like a soft, unvoiced echo of "a" (-ha).'
  },
  {
    id: 'drill-4',
    category: 'shadowing',
    title: 'Long vs Short Vowels (ह्रस्व-दीर्घ स्वराः)',
    targetDevanagari: 'शिवः vs शिवा (Śivaḥ vs Śivā)',
    targetIast: 'śivaḥ vs śivā',
    focusSound: 'अ vs आ',
    tip: 'Long "ā" is held for exactly two mātrās (twice as long as short "a").'
  }
];

export const PronunciationLabView: React.FC = () => {
  const [selectedDrill, setSelectedDrill] = useState<DrillItem>(DRILL_ITEMS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    feedback: string;
    phonemeFeedback: string;
  } | null>(null);

  const speakTarget = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'hi-IN';
      utt.rate = 0.8;
      window.speechSynthesis.speak(utt);
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setScoreResult(null);

    // Simulate audio capture and scoring through AI provider
    setTimeout(async () => {
      setIsRecording(false);
      const provider = getAIProvider();
      const result = await provider.scorePronunciation(selectedDrill.targetDevanagari, new ArrayBuffer(0));

      setScoreResult({
        score: result.overallScore,
        feedback: result.feedback,
        phonemeFeedback: selectedDrill.tip,
      });
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-serif text-amber-300 flex items-center gap-2">
          <span>उच्चारण-शाला (Pronunciation Lab)</span>
          <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Acoustic Coach
          </span>
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Master classical Sanskrit phonology with per-phoneme feedback: dental vs retroflex, aspirates, and visarga.
        </p>
      </div>

      {/* Drill Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DRILL_ITEMS.map((drill) => (
          <button
            key={drill.id}
            onClick={() => {
              setSelectedDrill(drill);
              setScoreResult(null);
            }}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedDrill.id === drill.id
                ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-stone-900 border-stone-800 hover:border-stone-700'
            }`}
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 block mb-1">
              {drill.category.replace('_', ' ')}
            </span>
            <h4 className="text-sm font-bold text-stone-100">{drill.title}</h4>
            <p className="text-xs font-serif text-amber-200/80 mt-1">{drill.targetDevanagari}</p>
          </button>
        ))}
      </div>

      {/* Active Drill Practice Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-center">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-stone-400">
            Focus: {selectedDrill.focusSound}
          </span>
          <div className="text-3xl sm:text-4xl font-serif text-amber-200 mt-3 tracking-wide">
            {selectedDrill.targetDevanagari}
          </div>
          <div className="text-sm font-mono text-stone-400 mt-1 italic">
            {selectedDrill.targetIast}
          </div>
        </div>

        {/* Pronunciation Tip */}
        <div className="max-w-lg mx-auto bg-stone-800/60 border border-stone-700/60 rounded-xl p-3.5 text-xs text-stone-300 text-left flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>{selectedDrill.tip}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {/* Reference Audio */}
          <button
            onClick={() => speakTarget(selectedDrill.targetDevanagari)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-semibold text-sm transition active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-amber-400" />
            <span>Hear Model Audio</span>
          </button>

          {/* Record / Shadowing */}
          <button
            onClick={handleRecord}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg active:scale-95 ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-stone-950'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span>{isRecording ? 'Listening...' : 'Repeat & Score'}</span>
          </button>
        </div>

        {/* Feedback Display */}
        {scoreResult && (
          <div className="max-w-md mx-auto bg-stone-950/80 border border-amber-500/30 rounded-2xl p-5 text-left space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-stone-400">Accuracy Score</span>
              <span className={`text-xl font-bold ${scoreResult.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {scoreResult.score}%
              </span>
            </div>

            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${scoreResult.score}%` }}
              />
            </div>

            <p className="text-sm font-medium text-stone-200">{scoreResult.feedback}</p>
            <p className="text-xs text-stone-400 italic">💡 {scoreResult.phonemeFeedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};
