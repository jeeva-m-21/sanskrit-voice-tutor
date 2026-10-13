/**
 * Types and interfaces for AI service providers (Sarvam AI and local mock fallback)
 */

export interface MessageTurn {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TutorCorrection {
  originalPart: string;
  correctedPart: string;
  explanation: string;
  sanskritRule?: string;
}

export interface TutorTurnRequest {
  messages: MessageTurn[];
  userLevel: 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2';
  targetTopic?: string;
  mode: 'chat' | 'live_voice' | 'roleplay' | 'grammar_help';
  nativeLanguage?: string;
}

export interface TutorTurnResponse {
  devanagari: string;
  iast: string;
  translation: string;
  tamil?: string;
  notes?: string;
  suggestedReplies: string[];
  hints: [string, string, string]; // [General concept, Partial starter, Full sentence]
  correction?: TutorCorrection;
  audioBase64?: string; // Optional synthesized audio
}

export interface TranscriptionResult {
  transcript: string;
  iast?: string;
  confidence: number;
  languageCode: string;
}

export interface TTSRequest {
  text: string;
  speed?: number; // 0.7 to 1.0
  voice?: 'shubh' | 'aditi' | 'bulbul';
}

export interface TTSResponse {
  audioBase64?: string;
  audioUrl?: string;
  durationSeconds?: number;
  format: 'mp3' | 'wav';
}

export interface PronunciationScoreResult {
  overallScore: number; // 0 to 100
  accuracyPercent: number;
  recognizedText: string;
  feedback: string;
  phonemeIssues: {
    phoneme: string;
    type: 'retroflex' | 'aspirate' | 'visarga' | 'vowel_length' | 'anusvara';
    tip: string;
  }[];
}

export interface IAIProvider {
  name: string;
  generateTutorResponse(request: TutorTurnRequest): Promise<TutorTurnResponse>;
  transcribeAudio(audioBlobOrBuffer: ArrayBuffer | Blob): Promise<TranscriptionResult>;
  synthesizeSpeech(request: TTSRequest): Promise<TTSResponse>;
  scorePronunciation(targetText: string, audioBlobOrBuffer: ArrayBuffer | Blob): Promise<PronunciationScoreResult>;
}
