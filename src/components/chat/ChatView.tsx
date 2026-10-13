'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, MicOff, Volume2, Lightbulb, 
  HelpCircle, Sparkles, RefreshCw, Languages, BookA, Check, AlertCircle 
} from 'lucide-react';
import { tokenizeAndGloss, GlossToken } from '@/lib/sanskrit/glossary';
import { WordGlossModal } from './WordGlossModal';
import { TutorTurnResponse, TutorCorrection } from '@/lib/ai/types';
import { fetchTutorResponse, playTutorAudio } from '@/lib/ai/client-ai';
import { SRSCard } from '@/lib/srs/srs-engine';

interface ChatMessage {
  id: string;
  sender: 'tutor' | 'user';
  devanagari: string;
  iast?: string;
  translation?: string;
  correction?: TutorCorrection;
  suggestedReplies?: string[];
  hints?: [string, string, string];
  timestamp: string;
}

interface ChatViewProps {
  onAddCardToDeck: (card: Partial<SRSCard>) => void;
  onSwitchToLiveVoice: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  onAddCardToDeck,
  onSwitchToLiveVoice,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      devanagari: 'नमो नमः! स्वागतम्। भवन्तः कथम् सन्ति?',
      iast: 'namo namaḥ! svāgatam. bhavantaḥ katham santi?',
      translation: 'Salutations! Welcome. How are you doing today?',
      suggestedReplies: [
        'नमो नमः! अहम् कुशली अस्मि।',
        'मम नाम आनन्दः अस्ति।',
        'सुप्रभातम् गुरुवर्य!'
      ],
      hints: [
        'Say that you are doing fine using "अहम् कुशली अस्मि"',
        'अहम् कुशली...',
        'नमो नमः! अहम् कुशली अस्मि।'
      ],
      timestamp: '10:00 AM'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [slowAudio, setSlowAudio] = useState(false);
  
  // Hint ladder state
  const [hintStage, setHintStage] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<GlossToken | null>(null);
  
  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFeedback, setRecordingFeedback] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Play audio using Sarvam Bulbul TTS (with Web Speech API fallback)
  const speakText = (text: string, rate: number = 0.9) => {
    playTutorAudio(text, rate);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      devanagari: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setHintStage(0);

    try {
      const tutorResp = await fetchTutorResponse({
        messages: [
          ...messages.map((m) => ({
            role: (m.sender === 'tutor' ? 'assistant' : 'user') as 'assistant' | 'user',
            content: m.devanagari
          })),
          { role: 'user', content: text }
        ],
        userLevel: 'A1',
        mode: 'chat',
        nativeLanguage: 'English'
      });

      const newTutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        devanagari: tutorResp.devanagari,
        iast: tutorResp.iast,
        translation: tutorResp.translation,
        suggestedReplies: tutorResp.suggestedReplies,
        hints: tutorResp.hints,
        correction: tutorResp.correction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newTutorMsg]);
      // Speak tutor reply using Sarvam Bulbul TTS
      speakText(tutorResp.devanagari, slowAudio ? 0.7 : 0.9);
    } catch (err) {
      console.error('Failed to get tutor reply:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingFeedback('Listening to Sanskrit speech...');
      
      // Check for SpeechRecognition in browser
      if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = 'hi-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsRecording(false);
          setRecordingFeedback(null);
        };

        recognition.onerror = () => {
          setIsRecording(false);
          setRecordingFeedback(null);
        };

        recognition.onend = () => {
          setIsRecording(false);
          setRecordingFeedback(null);
        };

        recognition.start();
      } else {
        // Fallback simulation
        setTimeout(() => {
          setInputText('नमो नमः अहम् कुशली अस्मि');
          setIsRecording(false);
          setRecordingFeedback(null);
        }, 1500);
      }
    } else {
      setIsRecording(false);
      setRecordingFeedback(null);
    }
  };

  const latestTutorMsg = [...messages].reverse().find((m) => m.sender === 'tutor');

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 relative">
      {/* Top Bar Controls */}
      <div className="px-4 py-3 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-amber-300">संस्कृत गुरुः (Tutor)</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            A1 Level
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Transliteration Toggle */}
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition flex items-center gap-1 ${
              showTransliteration 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-stone-800 text-stone-400 border-stone-700'
            }`}
            title="Toggle IAST Transliteration"
          >
            <BookA className="w-3.5 h-3.5" />
            <span>IAST</span>
          </button>

          {/* Translation Toggle */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition flex items-center gap-1 ${
              showTranslation 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-stone-800 text-stone-400 border-stone-700'
            }`}
            title="Toggle English Translation"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>English</span>
          </button>

          {/* Slow audio toggle */}
          <button
            onClick={() => setSlowAudio(!slowAudio)}
            className={`px-2 py-1 text-xs rounded-lg font-medium border transition ${
              slowAudio 
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' 
                : 'bg-stone-800 text-stone-400 border-stone-700'
            }`}
            title="Toggle 0.7x slow speed"
          >
            {slowAudio ? '0.7x Slow' : '1.0x'}
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isTutor = msg.sender === 'tutor';
          const tokens = isTutor ? tokenizeAndGloss(msg.devanagari) : [];

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isTutor ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[75%] rounded-2xl p-4 shadow-lg transition-all ${
                  isTutor
                    ? 'bg-stone-900 border border-stone-800 text-stone-100 rounded-tl-xs'
                    : 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-medium rounded-tr-xs'
                }`}
              >
                {/* Devanagari text with tappable tokens */}
                <div className="text-xl sm:text-2xl font-serif leading-relaxed tracking-wide">
                  {isTutor ? (
                    <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                      {tokens.map((tok, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedToken(tok)}
                          className="hover:text-amber-300 hover:bg-stone-800/80 px-1 py-0.5 rounded transition underline decoration-amber-500/40 decoration-dotted underline-offset-4 cursor-pointer text-left"
                          title="Click to view root, case, and meaning"
                        >
                          {tok.word}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span>{msg.devanagari}</span>
                  )}
                </div>

                {/* Transliteration */}
                {isTutor && showTransliteration && msg.iast && (
                  <p className="text-xs sm:text-sm font-mono text-amber-300/80 mt-1.5 italic">
                    {msg.iast}
                  </p>
                )}

                {/* English Translation */}
                {isTutor && showTranslation && msg.translation && (
                  <p className="text-xs sm:text-sm text-stone-300 mt-2 pt-2 border-t border-stone-800/60 font-sans">
                    {msg.translation}
                  </p>
                )}

                {/* Inline Error Recasting / Correction Card */}
                {msg.correction && (
                  <div className="mt-3 p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>Guru&apos;s Gentle Recast</span>
                    </div>
                    <p className="text-stone-300">
                      <span className="line-through text-red-400 mr-2">{msg.correction.originalPart}</span>
                      <span className="font-semibold text-emerald-400">{msg.correction.correctedPart}</span>
                    </p>
                    <p className="text-stone-400 text-[11px]">{msg.correction.explanation}</p>
                  </div>
                )}

                {/* Toolbar for Tutor Message */}
                {isTutor && (
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-800/60 text-stone-400">
                    <button
                      onClick={() => speakText(msg.devanagari, slowAudio ? 0.7 : 0.9)}
                      className="p-1 rounded-md hover:text-amber-300 hover:bg-stone-800 transition flex items-center gap-1 text-xs"
                      title="Play audio"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Listen</span>
                    </button>
                    <span className="text-[10px] text-stone-500 ml-auto">{msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-stone-400 text-xs py-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Guru is contemplating in Sanskrit...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Reply Chips */}
      {latestTutorMsg?.suggestedReplies && latestTutorMsg.suggestedReplies.length > 0 && !isLoading && (
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto border-t border-stone-800/60 bg-stone-900/60">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {latestTutorMsg.suggestedReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(reply)}
              className="shrink-0 text-xs px-3 py-1.5 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-amber-200 border border-stone-700 hover:border-amber-500 rounded-full transition font-serif"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Hint Ladder Banner (If opened) */}
      {latestTutorMsg?.hints && hintStage > 0 && (
        <div className="px-4 py-2.5 bg-amber-950/30 border-t border-amber-500/20 text-xs flex items-center justify-between text-amber-200">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-amber-300 font-semibold">Hint {hintStage}/3: </strong>
              {latestTutorMsg.hints[hintStage - 1]}
            </span>
          </div>
          {hintStage < 3 && (
            <button
              onClick={() => setHintStage(hintStage + 1)}
              className="text-[11px] underline text-amber-400 hover:text-amber-300 shrink-0 font-medium ml-2"
            >
              Next clue
            </button>
          )}
        </div>
      )}

      {/* Composer Toolbar & Input */}
      <div className="p-3 bg-stone-900 border-t border-stone-800">
        {recordingFeedback && (
          <p className="text-xs text-amber-400 mb-2 animate-pulse flex items-center gap-1">
            <Mic className="w-3.5 h-3.5" />
            {recordingFeedback}
          </p>
        )}

        <div className="flex items-center gap-2">
          {/* Hint Button */}
          <button
            onClick={() => setHintStage((prev) => (prev >= 3 ? 1 : prev + 1))}
            className={`p-2.5 rounded-xl border transition ${
              hintStage > 0 
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-amber-300'
            }`}
            title="Hint ladder (Need help?)"
          >
            <Lightbulb className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type in Sanskrit or English (e.g. नमो नमः)..."
              className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-100 placeholder-stone-500 text-sm focus:outline-none transition"
            />
          </div>

          {/* Voice Mic Button */}
          <button
            onClick={handleMicToggle}
            className={`p-2.5 rounded-xl border transition ${
              isRecording
                ? 'bg-red-500 text-white border-red-400 animate-pulse'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
            }`}
            title={isRecording ? 'Stop recording' : 'Voice input (Speak in Sanskrit)'}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold transition shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Word Tap-to-Gloss Detail Sheet */}
      <WordGlossModal
        token={selectedToken}
        onClose={() => setSelectedToken(null)}
        onPlayAudio={(txt) => speakText(txt, 0.8)}
        onAddToDeck={(token) => {
          onAddCardToDeck({
            front: token.cleanWord || token.word,
            back: token.meaning,
            iast: token.iast,
            cardType: token.partOfSpeech === 'verb' ? 'dhatu' : 'vocab',
            grammarMeta: token.grammarTag,
          });
        }}
      />
    </div>
  );
};
