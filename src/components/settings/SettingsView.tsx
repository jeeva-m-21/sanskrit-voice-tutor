'use client';

import React, { useState } from 'react';
import { Key, Volume2, Globe, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { setCustomProvider } from '@/lib/ai/provider-factory';
import { SarvamProvider } from '@/lib/ai/sarvam-provider';
import { MockProvider } from '@/lib/ai/mock-provider';

export const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [voicePace, setVoicePace] = useState('0.9');
  const [nativeLang, setNativeLang] = useState('English');
  const [scriptStyle, setScriptStyle] = useState('devanagari');

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setCustomProvider(new SarvamProvider(apiKey.trim()));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      setCustomProvider(new MockProvider());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-serif text-amber-300">
          विन्यासाः (Settings & Preferences)
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Configure Sarvam AI integration, script display, voice pace, and explanation language.
        </p>
      </div>

      {/* Sarvam AI Key Setup */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-stone-100">
            Sarvam AI API Configuration
          </h3>
        </div>

        <p className="text-xs text-stone-400 leading-relaxed">
          Provide your <strong>Sarvam AI</strong> API key for live Saaras STT, Bulbul TTS, and Sarvam-m LLM. If omitted, the system seamlessly runs on the local, zero-latency deterministic mock engine.
        </p>

        <div className="space-y-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your api-subscription-key here..."
            className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:border-amber-500 outline-none font-mono"
          />

          <button
            onClick={handleSaveKey}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition shadow-md"
          >
            {isSaved ? <Check className="w-4 h-4" /> : null}
            <span>{isSaved ? 'Configuration Saved!' : 'Save & Activate Provider'}</span>
          </button>
        </div>
      </div>

      {/* Audio & Script Settings */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-xl">
        {/* Script Preferences */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
            Primary Script Display
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'devanagari', label: 'Devanagari (देवनागरी)' },
              { id: 'iast', label: 'IAST (Roman Diacritics)' },
              { id: 'both', label: 'Both (Dual Display)' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setScriptStyle(s.id)}
                className={`p-3 rounded-xl text-xs font-semibold border text-center transition ${
                  scriptStyle === s.id
                    ? 'bg-amber-600 text-stone-950 border-amber-500'
                    : 'bg-stone-800 text-stone-400 border-stone-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Pace */}
        <div className="space-y-2 pt-2 border-t border-stone-800">
          <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
            Tutor Speech Pace
          </label>
          <div className="flex gap-2">
            {[
              { val: '0.7', label: '0.7x (Slow & Clear for beginners)' },
              { val: '0.9', label: '0.9x (Natural conversational pace)' },
              { val: '1.0', label: '1.0x (Classical recital)' },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setVoicePace(p.val)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition ${
                  voicePace === p.val
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-stone-800 text-stone-400 border-stone-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Native Explanation Language */}
        <div className="space-y-2 pt-2 border-t border-stone-800">
          <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
            Mother Tongue (Explanation Language)
          </label>
          <select
            value={nativeLang}
            onChange={(e) => setNativeLang(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:border-amber-500 outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
            <option value="Marathi">मराठी (Marathi)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
