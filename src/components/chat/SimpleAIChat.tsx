'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, MicOff, Volume2, Sparkles, RotateCcw, 
  Languages, Globe, BookOpen, Lightbulb, ChevronRight, Home, ArrowLeft 
} from 'lucide-react';
import { fetchTutorResponse, playTutorAudio } from '@/lib/ai/client-ai';
import { startDictation, DictationSession } from '@/lib/voice/dictation';

interface Message {
  id: string;
  sender: 'guru' | 'user';
  text: string;
  devanagari?: string;
  iast?: string;
  tamil?: string;
  translation?: string;
  notes?: string;
  suggestedReplies?: string[];
  timestamp: string;
}

interface SimpleAIChatProps {
  onBackToHome?: () => void;
  onLaunchVoice?: () => void;
}

export const SimpleAIChat: React.FC<SimpleAIChatProps> = ({ onBackToHome, onLaunchVoice }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'guru',
      text: 'நமோ நமஹ! Welcome!',
      devanagari: 'नमो नमः! स्वागतम्। भवन्तः कथम् सन्ति?',
      iast: 'namo namaḥ! svāgatam. bhavantaḥ katham santi?',
      tamil: 'வணக்கம்! நல்வரவு. நீங்கள் எப்படி இருக்கிறீர்கள்?',
      translation: 'Greetings! Welcome. How are you doing today?',
      notes: 'In Tamil, "வணக்கம்" (Vanakkam) directly translates to "नमो नमः" (Namo namaḥ) in Sanskrit.',
      suggestedReplies: [
        'नमो नमः! अहम् कुशली अस्मि (வணக்கம்! நான் நலம்)',
        'मम नाम... (என் பெயர்...) சொல்ல கற்றுக்கொடுங்கள்',
        'சுலோகம் ஒன்று கற்றுக்கொடுங்கள் (Teach me a shloka)'
      ],
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [langPreference, setLangPreference] = useState<'both' | 'tamil' | 'english'>('both');
  const [slowAudio, setSlowAudio] = useState(false);

  // Live Dictation State
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [dictationStatus, setDictationStatus] = useState<string | null>(null);
  const dictationSessionRef = useRef<DictationSession | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const resp = await fetchTutorResponse({
        messages: [
          ...messages.map((m) => ({
            role: (m.sender === 'guru' ? 'assistant' : 'user') as 'assistant' | 'user',
            content: m.devanagari || m.text
          })),
          { role: 'user', content: textToSend }
        ],
        userLevel: 'A1',
        mode: 'chat',
        nativeLanguage: langPreference === 'tamil' ? 'Tamil' : langPreference === 'english' ? 'English' : 'English and Tamil'
      });

      const guruMessage: Message = {
        id: `guru-${Date.now()}`,
        sender: 'guru',
        text: resp.devanagari,
        devanagari: resp.devanagari,
        iast: resp.iast,
        tamil: resp.tamil,
        translation: resp.translation,
        notes: resp.notes,
        suggestedReplies: resp.suggestedReplies,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, guruMessage]);
      // Play audio automatically with Sarvam Bulbul
      playTutorAudio(resp.devanagari, slowAudio ? 0.7 : 0.9);
    } catch (err) {
      console.error('Chat response error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Robust live dictation with MediaRecorder + Sarvam Saaras STT
  const handleToggleDictation = async () => {
    if (isRecording) {
      // Stop recording and transcribe
      setDictationStatus('Transcribing with Sarvam Saaras STT...');
      setIsRecording(false);
      try {
        if (dictationSessionRef.current) {
          const transcript = await dictationSessionRef.current.stop();
          if (transcript && transcript.trim()) {
            setInput(transcript.trim());
          }
        }
      } catch (err: any) {
        console.error('Transcription failed:', err);
        setDictationStatus('Could not transcribe audio. Please try again.');
        setTimeout(() => setDictationStatus(null), 3000);
      } finally {
        dictationSessionRef.current = null;
        setDictationStatus(null);
        setAudioLevel(0);
      }
    } else {
      // Start real microphone capture
      try {
        setDictationStatus('Recording... பேசுங்கள் (Speak in Tamil, English, or Sanskrit)');
        setIsRecording(true);
        const langParam = langPreference === 'tamil' ? 'ta-IN' : langPreference === 'english' ? 'en-IN' : 'unknown';
        const session = await startDictation((level) => {
          setAudioLevel(level);
        }, langParam);
        dictationSessionRef.current = session;
      } catch (err: any) {
        console.error('Microphone start error:', err);
        setIsRecording(false);
        setDictationStatus('Microphone permission needed. Please allow mic in browser.');
        setTimeout(() => setDictationStatus(null), 4000);
      }
    }
  };

  const starterCards = [
    {
      title: 'வணக்கம் & என் பெயர் (Greetings & My Name)',
      prompt: 'Teach me how to say Hello and introduce my name in Sanskrit. Explain in simple Tamil and English.',
      desc: 'வணக்கம் (Hello) மற்றும் எனது பெயர் (My name is...) சொல்ல பழகுங்கள்.'
    },
    {
      title: 'நான், நீ, போகிறேன் (I, You, Daily Actions)',
      prompt: 'How do I say "I", "You", and "I am going" in Sanskrit? Compare with Tamil (நான், நீ, போகிறேன்).',
      desc: 'அடிப்படை சொற்கள்: अहम् (நான்), त्वम् (நீ), गच्छामि (போகிறேன்).'
    },
    {
      title: 'கீதை சுலோகம் விளக்கம் (Bhagavad Gita 2.47)',
      prompt: 'Teach me the shloka "Karmanyevadhikaraste" word-by-word with meaning in Tamil and English.',
      desc: 'கர்மண்யேவாதிகாரஸ்தே — சொல்-பொருள் மற்றும் சுலோக விளக்கம்.'
    },
    {
      title: 'சந்தேகம் கேளுங்கள் (Ask Any Doubt)',
      prompt: 'How are Tamil வேற்றுமை (cases) similar to Sanskrit Vibhakti? Explain with examples.',
      desc: 'தமிழ் வேற்றுமை உருபுகளும் (ஐ, ஆல், கு, இன், அது, கண்) சமஸ்கிருதமும்.'
    }
  ];

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-[#090a0f] text-stone-100 font-sans shadow-2xl border-x border-[#1e2032]">
      {/* Top Header */}
      <header className="px-4 py-3 bg-[#0d0f18]/90 backdrop-blur-md border-b border-[#1f2237] flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-[#141624] hover:bg-[#1c1f33] text-stone-400 hover:text-white border border-[#262940] transition"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-stone-950 font-serif font-bold text-lg shadow-md">
            ॐ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-stone-100 text-sm sm:text-base">
                சமஸ்கிருத AI குரு (Vāc Tutor)
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                Sarvam AI
              </span>
            </div>
            <p className="text-[10px] text-stone-400 hidden sm:block">
              English &amp; Tamil Sanskrit Coach • எளிய தமிழ் மற்றும் ஆங்கில விளக்கம்
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Mode Toggle */}
          <div className="flex bg-[#141624] p-0.5 rounded-xl border border-[#272a42] text-xs">
            <button
              onClick={() => setLangPreference('both')}
              className={`px-2.5 py-1 rounded-lg transition font-medium ${
                langPreference === 'both' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              தமிழ் + Eng
            </button>
            <button
              onClick={() => setLangPreference('tamil')}
              className={`px-2 py-1 rounded-lg transition font-medium ${
                langPreference === 'tamil' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLangPreference('english')}
              className={`px-2 py-1 rounded-lg transition font-medium ${
                langPreference === 'english' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Eng
            </button>
          </div>

          {/* Slow Voice Toggle */}
          <button
            onClick={() => setSlowAudio(!slowAudio)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition ${
              slowAudio
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-[#141624] text-stone-400 border-[#272a42]'
            }`}
            title="Slow audio pace for clarity"
          >
            {slowAudio ? '0.7x Slow' : '1.0x'}
          </button>

          {/* Live Voice Room CTA */}
          {onLaunchVoice && (
            <button
              onClick={onLaunchVoice}
              className="p-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 transition"
              title="Open full-screen Live Voice Room"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Starter Cards (Shown if only 1 welcome message) */}
        {messages.length <= 1 && (
          <div className="my-4 space-y-3 animate-in fade-in">
            <div className="text-center py-2">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                எப்படி கற்க விரும்புகிறீர்கள்? (Start a topic below):
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {starterCards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(card.prompt)}
                  className="p-4 bg-[#121422] hover:bg-[#171a2c] border border-[#22253a] hover:border-amber-500/50 rounded-2xl text-left transition group shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition flex items-center justify-between">
                      <span>{card.title}</span>
                      <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition" />
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((msg) => {
          const isGuru = msg.sender === 'guru';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isGuru ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[82%] rounded-2xl p-4 shadow-xl transition-all ${
                  isGuru
                    ? 'bg-[#121422] border border-[#22253a] text-stone-100 rounded-tl-xs'
                    : 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-semibold rounded-tr-xs'
                }`}
              >
                {!isGuru ? (
                  <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="space-y-3">
                    {/* Sanskrit Devanagari */}
                    {msg.devanagari && (
                      <div className="space-y-1">
                        <div className="text-2xl sm:text-3xl font-serif text-amber-200 tracking-wide font-medium leading-relaxed">
                          {msg.devanagari}
                        </div>
                        {msg.iast && (
                          <p className="text-xs sm:text-sm font-mono text-amber-300/80 italic">
                            {msg.iast}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Tamil Explanation */}
                    {msg.tamil && (langPreference === 'both' || langPreference === 'tamil') && (
                      <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                          🇮🇳 தமிழ் விளக்கம் (Tamil Meaning):
                        </span>
                        <p className="text-sm text-amber-100 font-sans leading-relaxed">
                          {msg.tamil}
                        </p>
                      </div>
                    )}

                    {/* English Explanation */}
                    {msg.translation && (langPreference === 'both' || langPreference === 'english') && (
                      <div className="p-3 bg-[#181a2b]/80 border border-[#25283d] rounded-xl space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          🇬🇧 English Meaning:
                        </span>
                        <p className="text-sm text-stone-200 leading-relaxed">
                          {msg.translation}
                        </p>
                      </div>
                    )}

                    {/* Pedagogical Note */}
                    {msg.notes && (
                      <div className="flex items-start gap-2 text-xs text-stone-300 bg-[#0d0e16] p-2.5 rounded-lg border border-[#1e2032]">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">💡 {msg.notes}</p>
                      </div>
                    )}

                    {/* Voice audio action */}
                    {msg.devanagari && (
                      <div className="flex items-center gap-2 pt-1 border-t border-[#1e2032]">
                        <button
                          onClick={() => playTutorAudio(msg.devanagari!, slowAudio ? 0.7 : 0.9)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191b2c] hover:bg-[#202339] text-amber-300 hover:text-amber-200 text-xs font-semibold border border-[#272a42] transition"
                          title="Listen with Sarvam Bulbul TTS"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>கேட்கவும் (Listen Voice)</span>
                        </button>
                        <span className="text-[10px] text-stone-500 ml-auto">{msg.timestamp}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-amber-400 py-2 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>AI Guru is translating & generating explanation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Reply Chips */}
      {messages[messages.length - 1]?.suggestedReplies && !isLoading && (
        <div className="px-4 py-2 border-t border-[#1e2032] bg-[#0c0d16]/70 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {messages[messages.length - 1].suggestedReplies!.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(reply)}
              className="shrink-0 text-xs px-3.5 py-1.5 bg-[#141624] hover:bg-amber-600 hover:text-stone-950 text-amber-200 border border-[#26283d] hover:border-amber-500 rounded-full transition font-serif"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Floating Composer with Real Dictation Visualizer */}
      <div className="p-3 bg-[#0d0e16]/95 border-t border-[#1e2032] shrink-0">
        {/* Dictation Status / Audio Waveform Feedback */}
        {dictationStatus && (
          <div className="text-xs text-amber-400 mb-2.5 flex items-center justify-between px-2 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>{dictationStatus}</span>
            </div>
            {isRecording && (
              <div className="flex items-center gap-1 h-3">
                <span className="w-1 bg-amber-400 rounded-full animate-bounce" style={{ height: `${Math.max(4, audioLevel * 0.16)}px` }} />
                <span className="w-1 bg-amber-400 rounded-full animate-bounce delay-75" style={{ height: `${Math.max(6, audioLevel * 0.22)}px` }} />
                <span className="w-1 bg-amber-400 rounded-full animate-bounce delay-150" style={{ height: `${Math.max(4, audioLevel * 0.18)}px` }} />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 bg-[#05060a] border border-[#25283d] focus-within:border-amber-500 rounded-2xl p-1.5 shadow-xl transition">
          {/* Universal Mic Button (MediaRecorder + Sarvam STT) */}
          <button
            onClick={handleToggleDictation}
            className={`p-2.5 rounded-xl border transition ${
              isRecording
                ? 'bg-red-600 text-white border-red-400 animate-pulse'
                : 'bg-[#121422] text-stone-400 border-[#22253a] hover:text-white'
            }`}
            title={isRecording ? 'Click to stop & transcribe' : 'Dictate with your microphone (Tamil, English, or Sanskrit)'}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isRecording ? 'Recording... speak now...' : 'Type in English, தமிழ், or Sanskrit (e.g. How to say Good morning?)...'}
            className="flex-1 bg-transparent px-2 text-stone-100 placeholder-stone-500 text-sm focus:outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-stone-950 font-bold transition shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
