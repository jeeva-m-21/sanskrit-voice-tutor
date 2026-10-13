/**
 * Client-Side AI Service Adapter
 * Calls Next.js server route handlers which securely communicate with Sarvam AI APIs.
 * Supports playing Sarvam Bulbul audio natively with seamless fallback.
 */

import { TutorTurnRequest, TutorTurnResponse, TTSResponse, TranscriptionResult } from './types';
import { MockProvider } from './mock-provider';

const mockFallback = new MockProvider();

/**
 * Calls Next.js backend chat endpoint (Sarvam-105B)
 */
export async function fetchTutorResponse(request: TutorTurnRequest): Promise<TutorTurnResponse> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Backend /api/chat call failed, using mock fallback:', e);
  }

  return mockFallback.generateTutorResponse(request);
}

/**
 * Plays audio using Sarvam Bulbul TTS with Web Speech API fallback
 */
export async function playTutorAudio(text: string, speed: number = 0.9): Promise<void> {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, speed }),
    });

    if (res.ok) {
      const data: TTSResponse = await res.json();
      if (data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        audio.playbackRate = speed;
        await audio.play();
        return;
      }
    }
  } catch (e) {
    console.warn('Sarvam TTS API failed, falling back to Web Speech synthesis:', e);
  }

  // Fallback: Web Speech API
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'hi-IN';
    utt.rate = speed;
    window.speechSynthesis.speak(utt);
  }
}

/**
 * Transcribes audio blob using Sarvam Saaras STT
 */
export async function transcribeAudioBlob(blob: Blob): Promise<TranscriptionResult> {
  try {
    const formData = new FormData();
    formData.append('file', blob, 'audio.wav');

    const res = await fetch('/api/stt', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Sarvam STT failed, using mock transcription:', e);
  }

  return {
    transcript: 'नमो नमः अहम् कुशली अस्मि',
    iast: 'namo namaḥ aham kuśalī asmi',
    confidence: 0.9,
    languageCode: 'hi-IN',
  };
}
