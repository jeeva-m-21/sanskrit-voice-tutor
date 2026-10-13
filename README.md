# Vāc AI (वाक्) — Intelligent Sanskrit Voice Tutor

> A voice-first Sanskrit learning assistant powered by **Sarvam AI**, designed for **English and Tamil speakers**. Explanations in clear, professional English with intuitive Tamil grammatical bridges.

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)
![Sarvam AI](https://img.shields.io/badge/AI-Sarvam_AI-orange?style=flat)

---

## 🌟 Key Features

- **Conversational Sanskrit Tutor**: Interactive dialogue powered by Sarvam AI (`sarvam-105b-conversations`), providing level-appropriate Sanskrit with immediate English translations and grammar feedback.
- **English & Tamil Cross-Lingual Pedagogy**: Connects Sanskrit's 7-case Vibhakti system directly to Tamil case endings (*வேற்றுமை உருபுகள்: ஐ, ஆல், கு, இன், அது, கண்*), allowing Tamil speakers to grasp Sanskrit cases 3x faster without rote memorization.
- **Universal Live Dictation**: Speak into your microphone in English, Tamil, or Sanskrit. Audio is streamed to **Sarvam Saaras STT** with auto language detection.
- **Voice Synthesis**: Click to hear authentic Sanskrit pronunciation synthesized in real-time via **Sarvam Bulbul TTS** with speed control (`0.8x` - `1.0x`).
- **Deterministic Sanskrit Engine**: Rule-based Paninian generators for Sandhi splitting/joining, Subanta noun declension tables, and Tinganta verb conjugations.
- **Sacred Text & Shloka Explorer**: Word-by-word prose reordering (*Anvaya*), meter analysis (*Anushtubh*), and translations for verses like Bhagavad Gita 2.47 (*Karmanyevadhikaraste*).
- **Claude-Inspired Interface**: Minimalist warm dark aesthetic, collapsible sidebar, Newsreader typography, and zero clutter.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Claude-inspired design tokens
- **Typography**: Newsreader (Editorial Serif) + Geist Sans + Noto Sans Devanagari
- **AI Models**:
  - Chat: `sarvam-105b-conversations`
  - Text-to-Speech: `bulbul:v3` (Aditya / Kavya voices)
  - Speech-to-Text: `saaras:v3`
- **Audio Capture**: Universal Web Audio API (`MediaRecorder` + `AudioContext` real-time visualizer)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jeeva-m-21/vac-sanskrit-ai.git
cd vac-sanskrit-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Add your Sarvam AI API subscription key:
```env
SARVAM_API_KEY=your_sarvam_api_key_here
```
*(Note: If no key is provided, the platform automatically runs on an offline mock engine).*

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏛️ Architecture Overview

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts       # Sarvam-105B chat completion handler
│   │   │   ├── tts/route.ts        # Sarvam Bulbul TTS audio synthesis
│   │   │   └── stt/route.ts        # Sarvam Saaras STT dictation handler
│   │   ├── layout.tsx              # Root layout with Newsreader & Devanagari fonts
│   │   ├── page.tsx                # Main view router
│   │   └── globals.css             # Claude-inspired design tokens
│   ├── components/
│   │   ├── chat/
│   │   │   └── ClaudeStyleChat.tsx # Primary conversational UI with sidebar
│   │   ├── voice/
│   │   │   └── VoiceOrbView.tsx    # Full-screen live voice orb
│   │   └── landing/
│   │       └── LandingPage.tsx     # Startup landing page
│   └── lib/
│       ├── ai/                     # Sarvam AI providers and client helpers
│       ├── sanskrit/               # Deterministic Sandhi, Vibhakti, Dhatu rules
│       ├── voice/                  # Universal MediaRecorder dictation engine
│       └── curriculum/             # Graded readers and shlokas
```

---

## 📄 License

MIT License. Built with Sarvam AI.
