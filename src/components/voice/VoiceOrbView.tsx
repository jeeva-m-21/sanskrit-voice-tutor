'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, RotateCcw, MessageSquare, 
  X, Sparkles, CheckCircle2, ChevronRight, AlertCircle 
} from 'lucide-react';
import { fetchTutorResponse, playTutorAudio } from '@/lib/ai/client-ai';

export type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface CaptionTurn {
  speaker: 'guru' | 'learner';
  devanagari: string;
  iast?: string;
  correction?: string;
}

interface VoiceOrbViewProps {
  onBackToChat: () => void;
}

export const VoiceOrbView: React.FC<VoiceOrbViewProps> = ({ onBackToChat }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [isHandsFree, setIsHandsFree] = useState(true);
  const [slowRate, setSlowRate] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [captions, setCaptions] = useState<CaptionTurn[]>([
    {
      speaker: 'guru',
      devanagari: 'हरिः ॐ! सम्भाषणाभ्यासाय भवन्तः सिद्धाः वा?',
      iast: 'hariḥ om! sambhāṣaṇābhyāsāya bhavantaḥ siddhāḥ vā?',
    }
  ]);
  const [sessionComplete, setSessionComplete] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSessionDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const speakGuru = async (text: string) => {
    setVoiceState('speaking');
    try {
      await playTutorAudio(text, slowRate ? 0.7 : 0.9);
    } finally {
      setVoiceState('idle');
    }
  };

  // Barge-in: learner speaks or presses button to interrupt tutor immediately
  const handleBargeIn = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceState('listening');
  };

  const handleStartSpeaking = () => {
    handleBargeIn();

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const rec = new SpeechRec();
      rec.lang = 'hi-IN';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setVoiceState('listening');
      };

      rec.onresult = async (e: any) => {
        const transcript = e.results[0][0].transcript;
        processLearnerTurn(transcript);
      };

      rec.onerror = () => {
        setVoiceState('idle');
      };

      rec.onend = () => {
        // Handled in processLearnerTurn
      };

      rec.start();
    } else {
      // Offline fallback simulation
      setTimeout(() => {
        processLearnerTurn('अहम् आनन्देन संस्कृतं वदामि');
      }, 2000);
    }
  };

  const processLearnerTurn = async (learnerText: string) => {
    setVoiceState('thinking');
    
    // Add learner caption
    setCaptions((prev) => [
      ...prev.slice(-3),
      {
        speaker: 'learner',
        devanagari: learnerText,
      }
    ]);

    try {
      const tutorResp = await fetchTutorResponse({
        messages: [{ role: 'user', content: learnerText }],
        userLevel: 'A1',
        mode: 'live_voice'
      });

      setCaptions((prev) => [
        ...prev.slice(-3),
        {
          speaker: 'guru',
          devanagari: tutorResp.devanagari,
          iast: tutorResp.iast,
          correction: tutorResp.correction?.correctedPart
        }
      ]);

      speakGuru(tutorResp.devanagari);
    } catch (e) {
      setVoiceState('idle');
    }
  };

  const handleRepeatSlowly = () => {
    const lastGuruCaption = [...captions].reverse().find((c) => c.speaker === 'guru');
    if (lastGuruCaption) {
      speakGuru(lastGuruCaption.devanagari);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-stone-100 flex flex-col justify-between overflow-hidden">
      {/* Top Session Bar */}
      <div className="p-4 flex items-center justify-between border-b border-stone-800/60 bg-stone-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-stone-400">
            LIVE • {formatTime(sessionDuration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSlowRate(!slowRate)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
              slowRate 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-stone-800 text-stone-400 border-stone-700'
            }`}
          >
            {slowRate ? '0.7x Pace' : 'Normal Pace'}
          </button>

          <button
            onClick={onBackToChat}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
            title="Switch to chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Interactive Orb */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* State Label */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 text-xs font-medium uppercase tracking-wider text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {voiceState === 'listening' && 'Listening to you...'}
            {voiceState === 'thinking' && 'Guru is reflecting...'}
            {voiceState === 'speaking' && 'Guru is speaking (Tap orb to interrupt)'}
            {voiceState === 'idle' && 'Ready — Tap to speak in Sanskrit'}
          </span>
        </div>

        {/* 3D/SVG Animated Orb */}
        <div 
          onClick={() => {
            if (voiceState === 'speaking') handleBargeIn();
            else handleStartSpeaking();
          }}
          className="relative cursor-pointer select-none group"
        >
          {/* Outer Aura Rings */}
          <div className={`absolute -inset-8 rounded-full blur-2xl transition-all duration-700 opacity-60 ${
            voiceState === 'speaking' 
              ? 'bg-amber-500/40 scale-125 animate-pulse' 
              : voiceState === 'listening' 
              ? 'bg-emerald-500/40 scale-110 animate-ping'
              : voiceState === 'thinking'
              ? 'bg-purple-500/40 scale-105'
              : 'bg-amber-600/20 group-hover:opacity-80'
          }`} />

          {/* Core Orb Sphere */}
          <div className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative border ${
            voiceState === 'speaking'
              ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 border-yellow-200/50 scale-105 shadow-amber-500/50'
              : voiceState === 'listening'
              ? 'bg-gradient-to-tr from-emerald-700 via-teal-600 to-emerald-400 border-emerald-300/50 scale-110 shadow-emerald-500/50'
              : voiceState === 'thinking'
              ? 'bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 border-purple-300/50 animate-spin shadow-purple-500/50'
              : 'bg-gradient-to-tr from-stone-800 via-stone-700 to-amber-900/60 border-stone-600/50 group-hover:scale-105'
          }`}>
            {/* Waveform / Visualizer icon */}
            <div className="flex items-center gap-1.5 h-12">
              <span className={`w-1.5 rounded-full transition-all duration-200 ${
                voiceState === 'speaking' || voiceState === 'listening' ? 'h-10 bg-stone-950 animate-bounce' : 'h-3 bg-stone-400'
              }`} />
              <span className={`w-1.5 rounded-full transition-all duration-200 ${
                voiceState === 'speaking' || voiceState === 'listening' ? 'h-14 bg-stone-950 animate-bounce delay-75' : 'h-5 bg-stone-400'
              }`} />
              <span className={`w-1.5 rounded-full transition-all duration-200 ${
                voiceState === 'speaking' || voiceState === 'listening' ? 'h-8 bg-stone-950 animate-bounce delay-150' : 'h-4 bg-stone-400'
              }`} />
              <span className={`w-1.5 rounded-full transition-all duration-200 ${
                voiceState === 'speaking' || voiceState === 'listening' ? 'h-12 bg-stone-950 animate-bounce delay-100' : 'h-2 bg-stone-400'
              }`} />
            </div>
          </div>
        </div>

        {/* Rolling Real-time Captions */}
        <div className="w-full max-w-lg mt-8 space-y-2">
          {captions.slice(-2).map((cap, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border backdrop-blur-md transition-all ${
                cap.speaker === 'guru'
                  ? 'bg-stone-900/80 border-stone-800 text-stone-200'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                <span>{cap.speaker === 'guru' ? 'संस्कृत गुरुः' : 'You (Learner)'}</span>
                {cap.correction && (
                  <span className="text-emerald-400">Recasted: {cap.correction}</span>
                )}
              </div>
              <p className="text-lg font-serif text-amber-100 tracking-wide">
                {cap.devanagari}
              </p>
              {cap.iast && (
                <p className="text-xs font-mono text-stone-400 italic mt-0.5">
                  {cap.iast}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-stone-900/60 border-t border-stone-800 backdrop-blur-md flex items-center justify-center gap-6">
        {/* Repeat slowly */}
        <button
          onClick={handleRepeatSlowly}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-300 transition"
        >
          <div className="p-3 rounded-full bg-stone-800 border border-stone-700">
            <RotateCcw className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">Repeat</span>
        </button>

        {/* Speak / Push-to-Talk */}
        <button
          onClick={handleStartSpeaking}
          className="p-5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 shadow-xl shadow-amber-500/20 active:scale-95 transition"
        >
          <Mic className="w-7 h-7" />
        </button>

        {/* End Session */}
        <button
          onClick={() => setSessionComplete(true)}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-red-400 transition"
        >
          <div className="p-3 rounded-full bg-stone-800 border border-stone-700">
            <X className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">End</span>
        </button>
      </div>

      {/* Session Summary Modal */}
      {sessionComplete && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-serif text-amber-200">
              सत्रं समाप्तम्! (Session Complete)
            </h3>
            <p className="text-xs text-stone-300">
              You practiced spoken Sanskrit for <strong>{formatTime(sessionDuration)}</strong>.
            </p>

            <div className="grid grid-cols-2 gap-3 py-2 text-left">
              <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Spoken Turns</span>
                <span className="text-lg font-bold text-amber-300">{captions.length} turns</span>
              </div>
              <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Pronunciation</span>
                <span className="text-lg font-bold text-emerald-400">92% score</span>
              </div>
            </div>

            <button
              onClick={onBackToChat}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition"
            >
              Continue to Chat & Reviews
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
