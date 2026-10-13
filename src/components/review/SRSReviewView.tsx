'use client';

import React, { useState } from 'react';
import { Volume2, RotateCcw, Check, Sparkles, BookOpen, Layers } from 'lucide-react';
import { SRSCard, Rating, processReview } from '@/lib/srs/srs-engine';
import confetti from 'canvas-confetti';

interface SRSReviewViewProps {
  cards: SRSCard[];
  onUpdateCard: (updated: SRSCard) => void;
}

export const SRSReviewView: React.FC<SRSReviewViewProps> = ({ cards, onUpdateCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const activeCard = cards[currentIndex];

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'hi-IN';
      utt.rate = 0.85;
      window.speechSynthesis.speak(utt);
    }
  };

  const handleRating = (rating: Rating) => {
    if (!activeCard) return;

    const { updatedCard } = processReview(activeCard, rating);
    onUpdateCard(updatedCard);

    setIsFlipped(false);
    if (currentIndex + 1 >= cards.length) {
      // Completed session
      setCompletedCount(cards.length);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedCount(0);
  };

  if (!activeCard || completedCount >= cards.length) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-6 bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl my-12 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
          <Check className="w-9 h-9" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-serif text-amber-200">
            पुनरावृत्तिः समाप्ता! (All Caught Up!)
          </h3>
          <p className="text-sm text-stone-400 mt-2">
            You reviewed all {cards.length} scheduled Sanskrit flashcards for today.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition shadow-lg"
        >
          Review Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-serif text-amber-300 flex items-center gap-2">
            <span>स्मृति-समीक्षा (Spaced Review)</span>
          </h2>
          <p className="text-xs text-stone-400">SM-2 Spaced Repetition queue</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-amber-400">
            {currentIndex + 1} / {cards.length}
          </span>
          <div className="w-24 bg-stone-800 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={() => !isFlipped && setIsFlipped(true)}
        className={`min-h-[300px] sm:min-h-[340px] bg-stone-900 border ${
          isFlipped ? 'border-amber-500/40 bg-stone-900/90' : 'border-stone-800 hover:border-stone-700'
        } rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all cursor-pointer relative select-none`}
      >
        {/* Card Type Badge & Audio */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
            {activeCard.cardType}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              speakText(activeCard.front);
            }}
            className="p-2 rounded-full hover:bg-stone-800 text-amber-400 hover:text-amber-300 transition"
            title="Listen to audio"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Center Content */}
        <div className="text-center py-6 space-y-3">
          <h3 className="text-3xl sm:text-4xl font-serif text-amber-200 tracking-wide">
            {activeCard.front}
          </h3>
          {activeCard.iast && (
            <p className="text-sm font-mono text-stone-400 italic">
              {activeCard.iast}
            </p>
          )}

          {/* Flipped Back Content */}
          {isFlipped ? (
            <div className="pt-4 border-t border-stone-800/80 space-y-2 animate-in fade-in duration-300">
              <p className="text-lg font-medium text-stone-100">
                {activeCard.back}
              </p>
              {activeCard.grammarMeta && (
                <p className="text-xs text-amber-300/80 bg-stone-800/50 py-1.5 px-3 rounded-lg inline-block border border-stone-700">
                  {activeCard.grammarMeta}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-stone-500 pt-4 font-sans tracking-wide">
              (Tap card to reveal meaning & grammar)
            </p>
          )}
        </div>

        {/* Bottom Card Footer */}
        <div className="text-center text-[11px] text-stone-500">
          Repetition: {activeCard.reps} • Ease: {activeCard.easeFactor.toFixed(1)}
        </div>
      </div>

      {/* Rating Buttons (Shown only after flipping) */}
      {isFlipped ? (
        <div className="grid grid-cols-4 gap-2.5 animate-in fade-in duration-200">
          <button
            onClick={() => handleRating(1)}
            className="p-3 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-red-300 block">Again (१)</span>
            <span className="text-[10px] text-stone-400">1 day</span>
          </button>
          <button
            onClick={() => handleRating(2)}
            className="p-3 bg-stone-800/80 hover:bg-stone-700 border border-stone-700 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-stone-300 block">Hard (२)</span>
            <span className="text-[10px] text-stone-400">2 days</span>
          </button>
          <button
            onClick={() => handleRating(3)}
            className="p-3 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-amber-300 block">Good (३)</span>
            <span className="text-[10px] text-stone-400">3 days</span>
          </button>
          <button
            onClick={() => handleRating(4)}
            className="p-3 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-emerald-300 block">Easy (४)</span>
            <span className="text-[10px] text-stone-400">5+ days</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsFlipped(true)}
          className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl border border-stone-700 transition"
        >
          Show Answer
        </button>
      )}
    </div>
  );
};
