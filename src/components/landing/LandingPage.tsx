'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Mic, Volume2, ArrowRight, CheckCircle2, 
  BookOpen, Globe, ShieldCheck, HeartHandshake, Play, Pause, ChevronRight, Zap
} from 'lucide-react';
import { playTutorAudio } from '@/lib/ai/client-ai';

interface LandingPageProps {
  onLaunchChat: () => void;
  onLaunchVoice: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchChat, onLaunchVoice }) => {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  const handlePlayDemo = async () => {
    setIsPlayingDemo(true);
    try {
      await playTutorAudio('नमो नमः! स्वागतम्। भवन्तः कथम् सन्ति?', 0.9);
    } finally {
      setIsPlayingDemo(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation Header */}
      <nav className="border-b border-[#222538]/70 bg-[#0c0d14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-serif font-bold text-xl shadow-lg shadow-amber-500/20">
              ॐ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-100 text-lg tracking-wide">
                  Vāc AI
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                  Sarvam AI
                </span>
              </div>
              <p className="text-[11px] text-stone-400 -mt-0.5">
                Sanskrit Voice Tutor for English & Tamil
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#how-it-works" className="hover:text-amber-300 transition">How It Works</a>
            <a href="#tamil-bridge" className="hover:text-amber-300 transition">Why Tamil & English?</a>
            <a href="#features" className="hover:text-amber-300 transition">Features</a>
            <a href="#pricing" className="hover:text-amber-300 transition">Pricing</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLaunchChat}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center gap-2"
            >
              <span>Launch AI Tutor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-600/20 via-orange-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161826] border border-[#2b2e46] text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Powering Cross-Lingual Sanskrit Learning • தமிழ் மற்றும் ஆங்கிலம் வழியே</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 font-serif leading-[1.15]">
            Speak & Understand Sanskrit. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Explained Naturally in Tamil & English.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
            Forget dry memorization tables. Converse with an encouraging, voice-first AI Guru built on <strong>Sarvam AI</strong> that relates Sanskrit directly to your mother tongue, corrects pronunciation instantly, and decodes sacred Gita verses word-by-word.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onLaunchChat}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition active:scale-95 flex items-center justify-center gap-2.5"
            >
              <span>Start Learning Free (ஆரம்பிக்க)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLaunchVoice}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#141624] hover:bg-[#1a1d30] border border-[#2b2e46] text-stone-200 font-semibold text-sm transition active:scale-95 flex items-center justify-center gap-2.5"
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Talk Live with Voice Orb</span>
            </button>
          </div>

          {/* Interactive Voice Demo Card */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="p-4 sm:p-5 rounded-3xl bg-[#121421]/90 border border-[#282b42] shadow-2xl backdrop-blur-md flex items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3.5">
                <button
                  onClick={handlePlayDemo}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20 shrink-0 transition active:scale-90"
                  title="Hear Sarvam Bulbul Voice"
                >
                  {isPlayingDemo ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 fill-stone-950 ml-0.5" />}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-serif font-bold text-amber-200">
                      नमो नमः! स्वागतम्।
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      (Namo namaḥ!)
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 mt-0.5">
                    தமிழ்: வணக்கம்! நல்வரவு • Eng: Hello! Welcome.
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-amber-400/90 shrink-0 hidden sm:inline-block">
                🔊 Sarvam Bulbul TTS
              </span>
            </div>
          </div>

          {/* Metrics / Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-[#10121d] border border-[#1e2030]">
              <span className="text-2xl font-bold font-serif text-amber-300 block">&lt; 1.5s</span>
              <span className="text-xs text-stone-400">Live Voice Latency</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#10121d] border border-[#1e2030]">
              <span className="text-2xl font-bold font-serif text-amber-300 block">தமிழ் + Eng</span>
              <span className="text-xs text-stone-400">Cross-Lingual Bridge</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#10121d] border border-[#1e2030]">
              <span className="text-2xl font-bold font-serif text-amber-300 block">100% Panini</span>
              <span className="text-xs text-stone-400">Rule-Engine Safeguard</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#10121d] border border-[#1e2030]">
              <span className="text-2xl font-bold font-serif text-amber-300 block">Voice-First</span>
              <span className="text-xs text-stone-400">Sarvam Saaras STT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Why Tamil & English Speakers Learn Faster */}
      <section id="tamil-bridge" className="py-20 px-4 sm:px-6 bg-[#0c0d14] border-t border-[#1a1c2a]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              CROSS-LINGUAL PEDAGOGY • மொழியியல் ஒற்றுமைகள்
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
              Why Tamil & English Speakers Learn Sanskrit Faster
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Tamil and Sanskrit share the most identical case-grammar system in the world. Our AI Guru bridges them directly so you never feel lost.
            </p>
          </div>

          {/* Side by side comparison table */}
          <div className="bg-[#121422] border border-[#23263c] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-lg font-bold font-serif text-amber-300 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>The Tamil வேற்றுமை $\leftrightarrow$ Sanskrit विभक्ति Case Bridge</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#25283d] text-amber-400 font-semibold">
                    <th className="py-3 px-3">Case (விபக்தி)</th>
                    <th className="py-3 px-3">Tamil Form (தமிழ் வடிவம்)</th>
                    <th className="py-3 px-3">Sanskrit Form (சமஸ்கிருதம்)</th>
                    <th className="py-3 px-3 text-stone-400">English Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2032] font-sans">
                  <tr className="hover:bg-[#181a2b] transition">
                    <td className="py-3 px-3 font-semibold text-stone-300">1. Prathamā (முதல் வேற்றுமை)</td>
                    <td className="py-3 px-3 text-emerald-300 font-medium">ராமன் (Raman)</td>
                    <td className="py-3 px-3 text-amber-200 font-serif text-base">रामः (Rāmaḥ)</td>
                    <td className="py-3 px-3 text-stone-400">Subject (Who did it)</td>
                  </tr>
                  <tr className="hover:bg-[#181a2b] transition">
                    <td className="py-3 px-3 font-semibold text-stone-300">2. Dvitīyā (இரண்டாம் வேற்றுமை)</td>
                    <td className="py-3 px-3 text-emerald-300 font-medium">ராமனை (&quot;ஐ&quot; உருபு)</td>
                    <td className="py-3 px-3 text-amber-200 font-serif text-base">रामम् (Rāmam)</td>
                    <td className="py-3 px-3 text-stone-400">Direct Object</td>
                  </tr>
                  <tr className="hover:bg-[#181a2b] transition">
                    <td className="py-3 px-3 font-semibold text-stone-300">3. Tṛtīyā (மூன்றாம் வேற்றுமை)</td>
                    <td className="py-3 px-3 text-emerald-300 font-medium">ராமனோடு / ராமனால் (&quot;ஆல்&quot;)</td>
                    <td className="py-3 px-3 text-amber-200 font-serif text-base">रामेण (Rāmeṇa)</td>
                    <td className="py-3 px-3 text-stone-400">By / With Rama</td>
                  </tr>
                  <tr className="hover:bg-[#181a2b] transition">
                    <td className="py-3 px-3 font-semibold text-stone-300">4. Caturthī (நான்காம் வேற்றுமை)</td>
                    <td className="py-3 px-3 text-emerald-300 font-medium">ராமனுக்கு (&quot;கு&quot; உருபு)</td>
                    <td className="py-3 px-3 text-amber-200 font-serif text-base">रामाय (Rāmāya)</td>
                    <td className="py-3 px-3 text-stone-400">For / To Rama</td>
                  </tr>
                  <tr className="hover:bg-[#181a2b] transition">
                    <td className="py-3 px-3 font-semibold text-stone-300">6. Ṣaṣṭhī (ஆறாம் வேற்றுமை)</td>
                    <td className="py-3 px-3 text-emerald-300 font-medium">ராமனுடைய (&quot;அது&quot;)</td>
                    <td className="py-3 px-3 text-amber-200 font-serif text-base">रामस्य (Rāmasya)</td>
                    <td className="py-3 px-3 text-stone-400">Rama&apos;s / Of Rama</td>
                  </tr>
                  <tr className="hover:bg-[#181a2b] transition">
                    <td className="py-3 px-3 font-semibold text-stone-300">7. Saptamī (ஏழாம் வேற்றுமை)</td>
                    <td className="py-3 px-3 text-emerald-300 font-medium">ராமனிடம் / காட்டில் (&quot;கண்&quot;)</td>
                    <td className="py-3 px-3 text-amber-200 font-serif text-base">रामे / वने (Vane)</td>
                    <td className="py-3 px-3 text-stone-400">In / On / At</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-stone-400 italic">
              💡 When you realize that Sanskrit grammar mirrors Tamil cases, you master 70% of spoken Sanskrit in days without memorization stress!
            </p>
          </div>
        </div>
      </section>

      {/* Section: Features Bento Grid */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              ENGINEERED FOR REAL CONVERSATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
              Built on Modern Indic AI Architecture
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Designed from ground up with Sarvam AI models and deterministic Paninian verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-7 rounded-3xl bg-[#121422] border border-[#23263c] space-y-4 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-stone-100">
                Universal Live Dictation
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Speak directly into your mic in Tamil, English, or Sanskrit. Powered by Sarvam Saaras with automatic language detection and real-time transcription.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-3xl bg-[#121422] border border-[#23263c] space-y-4 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-stone-100">
                Sarvam Bulbul Voice
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Experience authentic Indian phonetics and prosody with adjustable pace (0.7x for beginners). Every word can be heard aloud on demand.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-3xl bg-[#121422] border border-[#23263c] space-y-4 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-stone-100">
                Sacred Shloka Decoder
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Word-by-word prose reordering (Anvaya), meter analysis (Anushtubh), and clear Tamil & English summaries for Bhagavad Gita and Subhashitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Tiers */}
      <section id="pricing" className="py-20 px-4 sm:px-6 bg-[#0c0d14] border-t border-[#1a1c2a]">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
              Start Free Today
            </h2>
            <p className="text-stone-300 text-sm">
              Free to learn conversational Sanskrit with your personal Sarvam AI key or local mode.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl bg-[#121422] border border-[#23263c] space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase text-stone-400">Starter</span>
                <h4 className="text-2xl font-bold font-serif text-stone-100 mt-1">Free Forever</h4>
                <p className="text-xs text-stone-400 mt-1">Perfect for beginners learning basics</p>
              </div>

              <ul className="space-y-3 text-xs text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited text chat tutoring in English & Tamil</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sarvam Bulbul TTS Voice audio playback</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mic dictation via Sarvam Saaras STT</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Gita 2.47 & introductory shlokas</span>
                </li>
              </ul>

              <button
                onClick={onLaunchChat}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-100 font-bold text-xs border border-stone-700 transition"
              >
                Start Learning Now
              </button>
            </div>

            {/* Pro Tier */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#1b1e32] to-[#141624] border border-amber-500/40 shadow-xl shadow-amber-500/10 space-y-6 relative">
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                POPULAR
              </span>
              <div>
                <span className="text-xs font-semibold uppercase text-amber-400">Gurukulam Pro</span>
                <h4 className="text-2xl font-bold font-serif text-stone-100 mt-1">₹499 / mo</h4>
                <p className="text-xs text-stone-400 mt-1">For serious spoken fluency & text scholars</p>
              </div>

              <ul className="space-y-3 text-xs text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Everything in Starter + Unlimited Live Voice Orb</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Full Bhagavad Gita & Upanishad breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Deterministic Sandhi & Vibhakti table generators</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Audio export & Spaced review flashcards</span>
                </li>
              </ul>

              <button
                onClick={onLaunchChat}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-stone-950 font-bold text-xs shadow-lg transition"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Bottom Call-to-Action */}
      <section className="py-16 px-4 text-center bg-gradient-to-t from-stone-950 to-[#0c0d14] border-t border-[#1a1c2a]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-stone-100">
            Ready to speak your first Sanskrit sentence today?
          </h2>
          <p className="text-sm text-stone-300">
            இன்றே உங்கள் முதல் சமஸ்கிருத உரையாடலை தொடங்குங்கள்.
          </p>
          <button
            onClick={onLaunchChat}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/30 transition active:scale-95"
          >
            Launch Sanskrit AI Guru (இலவசம்)
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1c2a] py-8 text-center text-xs text-stone-500">
        <p>© 2026 Vāc AI • Powered by Sarvam AI APIs. Designed for English & Tamil speakers.</p>
      </footer>
    </div>
  );
};
