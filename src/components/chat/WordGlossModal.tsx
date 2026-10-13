'use client';

import React from 'react';
import { GlossToken } from '@/lib/sanskrit/glossary';
import { BookmarkPlus, X, Volume2, Sparkles, BookOpen } from 'lucide-react';

interface WordGlossModalProps {
  token: GlossToken | null;
  onClose: () => void;
  onAddToDeck: (token: GlossToken) => void;
  onPlayAudio?: (text: string) => void;
}

export const WordGlossModal: React.FC<WordGlossModalProps> = ({
  token,
  onClose,
  onAddToDeck,
  onPlayAudio,
}) => {
  if (!token) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-md bg-stone-900 border border-amber-500/30 rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl text-stone-100 transition-all max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-serif text-amber-300">
                {token.cleanWord || token.word}
              </span>
              {onPlayAudio && (
                <button
                  onClick={() => onPlayAudio(token.cleanWord || token.word)}
                  className="p-1 rounded-full hover:bg-stone-800 text-amber-400 hover:text-amber-300 transition"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-xs font-mono text-stone-400 tracking-wide mt-0.5">
              IAST: <span className="text-amber-200/90 italic">{token.iast}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 py-4">
          {/* Meaning Card */}
          <div className="bg-stone-800/80 rounded-xl p-3.5 border border-stone-700/60">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
              Meaning
            </span>
            <p className="text-base font-medium text-stone-100">
              {token.meaning}
            </p>
            {token.meaningHindi && (
              <p className="text-sm text-amber-200/80 mt-1">
                हिन्दी: {token.meaningHindi}
              </p>
            )}
          </div>

          {/* Grammar & Root Info */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-700/40">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-0.5">
                Root (धातु / प्रातिपदिक)
              </span>
              <p className="text-sm font-semibold text-amber-300">
                {token.root || 'N/A'}
              </p>
            </div>
            <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-700/40">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-0.5">
                Category
              </span>
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-300 rounded-md capitalize">
                {token.partOfSpeech}
              </span>
            </div>
          </div>

          {/* Grammar Tag */}
          {token.grammarTag && (
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Grammar Breakdown (व्याकरण-विश्लेषणम्)</span>
              </div>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                {token.grammarTag}
              </p>
            </div>
          )}

          {token.notes && (
            <p className="text-xs text-stone-400 italic bg-stone-800/30 p-2.5 rounded-lg border border-stone-800">
              💡 {token.notes}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-stone-800 flex gap-2">
          <button
            onClick={() => {
              onAddToDeck(token);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-900 font-semibold py-2.5 px-4 rounded-xl shadow-lg transition active:scale-[0.98]"
          >
            <BookmarkPlus className="w-4 h-4 text-stone-950" />
            <span>Add to Review Deck</span>
          </button>
        </div>
      </div>
    </div>
  );
};
