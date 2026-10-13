# Sanskrit Voice Tutor: Product Requirements Document

A conversational, voice-first Sanskrit tutor, built on Sarvam AI APIs, that takes a learner from zero to confident spoken and written fluency (CEFR-style A1 to B2) through guided chat, live speech practice and spaced review.

## 1. Vision and Goals

**Vision:** Anyone can learn to speak, read and understand Sanskrit by talking to a patient tutor that is always available, corrects pronunciation, and adapts to their level.

**Product goals**

- Move a beginner to comfortable conversational and reading ability (target B1; stretch B2) in about 12 months at 20 to 30 minutes a day.
- Make speaking the core habit: at least 50% of session time is spoken or listened interaction.
- Deliver correct Sanskrit: grammar, sandhi, vibhakti, dhatu forms and pronunciation must be accurate and verifiable.
- Keep learners returning: 30-day retention of 35% or more, with a daily streak and review loop.

**Non-goals (v1)**

- Not a general-purpose chatbot or a replacement for scholarly Vedic study or recitation training.
- No live human tutors, no marketplace, no certificate recognised by universities.
- No offline voice mode in v1.

## 2. Target Users

| Persona | Need | Implication |
| --- | --- | --- |
| Curious beginner | Cannot read Devanagari; wants gentle start | Transliteration (IAST and Roman) toggle, script lessons first |
| Heritage learner | Knows Hindi/Tamil/other, wants to read shlokas | Explanations in their mother tongue, shlokas and stotra content |
| Student of texts (Gita, Upanishads, Kavya) | Needs grammar depth and word-by-word parsing | Grammar and parsing mode, text-reading track |
| Aspiring speaker | Wants spoken fluency (Samskrita Bharati style) | Voice-first dialogue and roleplay track |
| Teacher or parent | Wants to guide others | Later phase: classroom and progress sharing |

## 3. Learning Design Principles

The product is a tutor, not an answer machine. Every feature should follow these principles.

1. **Comprehensible input first.** Most content is at the learner's level plus a little (i+1), with Sanskrit-medium instruction increasing as fluency grows.
2. **Output early.** Learners speak and write from lesson one, even if it is one word.
3. **Immediate, kind correction.** Errors are recast naturally, then explained briefly on request. Never a wall of grammar.
4. **Spaced repetition.** Every new word, form and sentence enters a review queue.
5. **Grammar in context.** Panini-based rules (sandhi, samasa, vibhakti, lakara) are taught through examples before terminology.
6. **Chunking.** Teach high-frequency phrases and sentence patterns, not isolated words.
7. **Immersion ramp.** The tutor's language mix shifts from mostly English/Hindi to mostly Sanskrit as the level rises.
8. **Cultural grounding.** Content draws on subhashitas, Panchatantra, Ramayana, Gita and daily life.

## 4. Learning Journey and Curriculum

A structured path with a free-conversation layer on top. A placement chat on first launch sets the starting level.

| Stage | Level | What the learner can do at the end | Core content |
| --- | --- | --- | --- |
| 0. Foundations | Pre-A1 | Read and write Devanagari, pronounce all varnas correctly | Aksharas, vowels, consonants, conjuncts, matras, pronunciation (sthana and prayatna) |
| 1. Survival | A1 | Greet, introduce self, ask simple questions, count | Pronouns, 50 core verbs in present tense, numbers, family, food, daily routine |
| 2. Everyday | A2 | Hold 3 to 5 minute simple conversations | Cases 1 to 7 on common nouns, past and future, basic sandhi, shopping, travel, time |
| 3. Expressive | B1 | Narrate events, give opinions, read simple stories | Lakaras (lat, lan, lrt, lot, vidhilin), upasarga, simple samasa, kridanta (ktva, tumun, kta) |
| 4. Fluent reader and speaker | B2 | Follow Sanskrit lectures, read Gita and Panchatantra with help | Complex sandhi and samasa, passive and causative, text reading |
| 5. Specialisation (optional) | B2+ | Choose a path | Kavya, Vedanta, Ayurveda, Jyotisha, shloka composition (chandas) |

Each lesson is 10 to 15 minutes: warm-up review, new input, guided practice, free speaking, summary and quiz.

## 5. Core Features

### 5.1 Conversational tutor chat

- Free chat with a tutor persona that stays in a level-appropriate Sanskrit mix and gently steers the topic.
- Every Sanskrit message shows Devanagari, with tap-to-toggle transliteration (IAST and Roman) and translation (English or the learner's mother tongue).
- Tap any word for a popup: meaning, root (dhatu or pratipadika), case, number, gender, tense, sandhi split, and an Add to deck button.
- Suggested replies as chips so beginners are never stuck.
- Hint ladder: hint, then a partial answer, then the full answer.
- Inline correction: the tutor recasts the learner's sentence correctly, highlights the changed part, and offers a one-tap Explain why.

### 5.2 Live voice conversation

- Push-to-talk and hands-free (continuous) modes with natural turn-taking.
- The tutor speaks every reply and the learner can interrupt it (barge-in).
- Live captions in Devanagari and optional transliteration while either side speaks.
- Slow speech toggle (0.7x to 1.0x) and a Repeat slowly button on any sentence.
- Voice roleplay scenarios (market, temple, railway station, family dinner, interview) with a goal and a score at the end.
- Voice-only mode for driving or walking: no screen interaction needed.

### 5.3 Pronunciation coach

- Shadowing: the tutor says a phrase, the learner repeats it, and the system compares and scores it.
- Per-word and per-phoneme feedback focused on Sanskrit-specific difficulties: aspirated vs unaspirated stops, retroflex vs dental, visarga, anusvara, long vs short vowels, and conjunct clusters.
- Minimal-pair drills (for example ta, tha, da, dha, ta-retroflex).
- Progress trend per sound over time.

### 5.4 Script and reading

- Interactive Devanagari trainer with stroke order, audio and a quick quiz.
- Graded readers: short stories, subhashitas and Gita verses, with tap-to-gloss and audio narration with highlighted words.
- Shloka mode: verse shown in padas with word-by-word meaning, anvaya (prose order) and meter, plus recitation practice.

### 5.5 Grammar and parsing tools

- Ask the tutor Why is this form used? and get a short explanation with examples at the learner's level.
- Sandhi splitter and joiner, vibhakti and dhatu-roop tables (generated from a rule engine, not from the LLM), and sentence parser (word, case, role).
- Mini lessons generated on the learner's actual mistakes.

### 5.6 Vocabulary and spaced repetition

- Automatic deck from everything the learner meets or taps.
- Card types: audio to meaning, meaning to speak, fill the form, listen and type, sentence production.
- Daily review queue with a scheduling algorithm (FSRS or SM-2 variant).

### 5.7 Practice modes

- Listening comprehension (short audio plus questions).
- Translation both ways, with free-text answers graded by the tutor against a rubric.
- Writing a daily line in Sanskrit (a journal) with feedback.
- Dictation (hear it, type it in Devanagari).
- Timed speaking prompts (describe a picture, answer a question).

### 5.8 Progress, motivation and personalisation

- Skills dashboard: speaking, listening, reading, writing, grammar, vocabulary, each mapped to a level.
- Streaks, daily goal, weekly summary, milestones (100 words, first 5-minute conversation).
- A learner model tracks weak grammar points and weak sounds, and the tutor weaves them into lessons.
- Reminders at the learner's chosen time (push or email).
- Periodic fluency check: a 10-minute conversational assessment that produces a level report.

## 6. UI and UX Requirements

Platforms: responsive web app (PWA) first, mobile-first layout; native iOS and Android wrappers later. The interface should feel like a calm, premium messaging app with a Devanagari-friendly design.

### 6.1 Screen map

| Screen | Purpose | Key elements |
| --- | --- | --- |
| Onboarding | Set goal, level and language | Why learning, mother tongue, placement chat, daily goal, mic permission test |
| Home | Today's plan | Continue lesson card, review count, streak, daily goal ring, quick Talk now button |
| Chat (main) | Text and voice tutoring | Message thread, composer, mic, hint and translate controls |
| Live voice | Full-screen conversation | Animated orb, live captions, interrupt, slow, replay, end |
| Lesson path | Curriculum map | Stages, units, lock states, level badges |
| Review | Spaced repetition | Card flow, audio, rating buttons |
| Pronunciation lab | Shadowing and sound drills | Waveform, per-word colouring, retry |
| Library | Stories, shlokas, readers | Filter by level, audio player, tap-to-gloss |
| Progress | Skills and history | Skill radar, streak calendar, vocabulary growth, level report |
| Settings | Preferences | Script, transliteration, voice, speed, reminders, privacy |

### 6.2 Chat interface requirements

- **Message bubbles** with Devanagari in a clear, large font (Noto Sans Devanagari or Tiro Devanagari Sanskrit), minimum 18 px on mobile, proper handling of conjuncts and combining marks.
- **Per-message toolbar:** play audio, play slowly, show transliteration, show translation, copy, save to deck, report an error.
- **Tappable words** with an inline bottom sheet for grammar details.
- **Composer:** text input with a built-in Devanagari keyboard or transliteration input (type Roman, get Devanagari), a mic button (hold to talk, tap for hands-free) and a hint button.
- **Suggested reply chips** above the composer.
- **Level and mode indicator** at the top (Lesson, Free talk, Roleplay, Grammar help) with one-tap switching.
- **Rich message types:** grammar table card, vocabulary card, quiz card, pronunciation score card, story card.
- **Streaming text** with typing indicator; audio starts as soon as the first sentence is ready.
- **Accessibility:** screen-reader labels, adjustable font size, high contrast, captions for all audio, keyboard navigation.

### 6.3 Live voice screen

- Large animated orb or waveform that shows listening, thinking and speaking states.
- Rolling captions with the last 2 to 3 turns, with mistakes underlined in a soft colour.
- Controls: mute, pause, slow, repeat last, switch to chat, end session.
- Visible latency expectations: the tutor starts speaking within about 1.5 seconds of the learner finishing.
- End-of-session summary: new words, corrections, pronunciation score, suggested review.

### 6.4 Design principles

- Warm, uncluttered palette with generous spacing; subtle motifs from Indian manuscripts but not kitschy.
- Progressive disclosure: beginners see Devanagari plus transliteration plus translation, advanced users see Devanagari only.
- Encouraging tone and micro-celebrations; no punishing fail screens.
- Light and dark themes.

## 7. Tutor Behaviour and Content Quality

### 7.1 Persona and pedagogy rules

- A patient guru and conversation partner who asks questions, models correct forms and never overwhelms.
- Keeps replies short at low levels (1 to 2 sentences), longer as the learner advances.
- Uses only vocabulary and grammar the learner has seen, plus a controlled number of new items per turn.
- Always ends a turn with a prompt or a question that invites the learner to respond.
- Tracks the target skills of the current lesson and verifies they were practised.

### 7.2 Accuracy safeguards

Large language models make Sanskrit errors, especially in sandhi, rare verb forms and meter. The system must not rely on the model alone.

- **Rule engine layer:** a deterministic Sanskrit grammar library (for example Vidyut, Sanskrit Heritage tools or a custom Paninian generator) validates forms, produces declension and conjugation tables, and splits sandhi. Tutor output containing forms is checked against it.
- **Curated content:** lesson scripts, dialogues, vocabulary and reference texts are authored or reviewed by Sanskrit scholars, not generated freely.
- **Retrieval grounding:** the tutor retrieves from a vetted corpus (lesson content, dictionaries such as Monier-Williams and Apte, and public-domain texts) before answering grammar and meaning questions.
- **Confidence handling:** when unsure the tutor says so, rather than inventing a form.
- **Feedback loop:** Report an error on every message; flagged items go to a reviewer queue and improve the content and test sets.
- **Evaluation set:** a gold set of several hundred graded Sanskrit prompts run on every model or prompt change.

### 7.3 Safety and boundaries

- Keep to language learning; handle religious and cultural topics respectfully and factually, without taking sectarian positions.
- Age-appropriate content, with a safe mode for minors.
- Standard abuse, self-harm and off-topic handling with redirection to learning.

## 8. System Architecture (High Level)

The system has five layers: client, real-time gateway, tutor orchestration, AI and language services, and data.

### 8.1 Components

| Layer | Component | Responsibility |
| --- | --- | --- |
| Client | Web/PWA app (React or Next.js), later mobile | Chat UI, audio capture and playback, VAD, captions, offline cache of review cards |
| Gateway | API gateway and auth | Login, rate limits, session tokens, routing |
| Gateway | Realtime service (WebSocket or WebRTC) | Streams mic audio up and TTS audio down, handles barge-in and turn state |
| Orchestration | Tutor orchestrator | Builds each turn: learner state, lesson plan, retrieved content, prompt, tool calls, response policy |
| Orchestration | Lesson and curriculum engine | Sequences units, picks next activity, generates exercises from vetted content |
| Orchestration | Learner model service | Tracks skills, errors, weak sounds, spaced repetition schedule |
| AI services | Speech-to-text (Sarvam) | Learner speech to text, with language hint and timestamps |
| AI services | LLM (Sarvam chat model, with a fallback model) | Tutor dialogue, explanations, grading, content generation |
| AI services | Text-to-speech (Sarvam Bulbul) | Tutor voice with controllable pace and voice choice |
| AI services | Translation and transliteration (Sarvam) | Sanskrit to and from English and Indian languages; script conversion |
| Language services | Sanskrit grammar engine | Deterministic sandhi, declension, conjugation, parsing and validation |
| Language services | Pronunciation scorer | Compares learner audio to reference and phoneme expectations |
| Data | Postgres | Users, progress, lessons, cards, conversations |
| Data | Vector store and content store | Vetted lessons, dictionaries, texts for retrieval |
| Data | Object storage and cache (Redis) | Audio clips, session state, rate limiting |
| Platform | Observability and analytics | Latency, errors, quality metrics, learning analytics, cost tracking |

### 8.2 Live voice turn flow

1. The client captures mic audio and runs voice activity detection to find the end of speech.
2. Audio streams to the realtime service, which forwards it to Sarvam speech-to-text and returns partial transcripts for captions.
3. On a final transcript, the orchestrator loads learner state and lesson context, retrieves relevant vetted content, and calls the LLM.
4. The grammar engine validates any Sanskrit the LLM produced; invalid forms trigger a regenerate or a correction.
5. The reply text streams sentence by sentence to Sarvam text-to-speech, and audio chunks stream to the client as soon as the first sentence is ready.
6. If the learner speaks mid-reply, the client sends a barge-in signal; the server cancels TTS and LLM generation and starts a new turn.
7. After the turn, the learner model updates (errors, new words, pronunciation scores) asynchronously.

### 8.3 Sarvam API usage and the Sanskrit risk

Sarvam provides speech-to-text, text-to-speech, translation, transliteration and chat models for Indian languages. **Sanskrit coverage differs by service and model version, so confirm it first.**

| Capability | Need | Validation and fallback |
| --- | --- | --- |
| Speech-to-text | Accurate Sanskrit and Devanagari output | Test on a Sanskrit speech set with word error rate target below 20% on learner speech. If Sanskrit is unsupported, use Hindi or auto-detect mode with Devanagari output plus post-correction, or fine-tune or add another STT |
| Text-to-speech | Correct Sanskrit pronunciation and prosody | Listen-test with Sanskrit scholars. If no native Sanskrit voice exists, test the Hindi voice on Devanagari Sanskrit, apply pronunciation lexicon and SSML-style hints, or add a custom or pre-recorded layer for core lessons |
| LLM | Grammatical Sanskrit and good pedagogy | Evaluate on the gold set; wrap with grammar engine checks and retrieval |
| Translation and transliteration | Sanskrit to and from English and Indian languages | Evaluate quality; use IAST and Devanagari transliteration from the rule engine where better |

A 2-week technical spike on these four items is the first deliverable and gates the voice roadmap. All Sarvam calls go through an internal provider abstraction so any component can be swapped without touching the product logic.

### 8.4 Core data model

- **User:** profile, mother tongue, level, goals, settings.
- **Lesson and Unit:** curriculum content, objectives, grammar tags, vocabulary tags.
- **Session and Message:** text, audio reference, transcript, corrections, timestamps.
- **Card and ReviewLog:** vocabulary or form items with scheduling state.
- **SkillState:** per-skill and per-grammar-point mastery estimates.
- **PronunciationAttempt:** target phrase, score, per-phoneme results.
- **Content item:** story, shloka, dialogue with level tags and audio.

## 9. Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Voice latency | End of learner speech to first tutor audio under 1.5 s typical, under 2.5 s at p95 |
| Text latency | First token under 1 s; full short reply under 4 s |
| Availability | 99.5% for chat, 99% for live voice in v1 |
| Scale | 10,000 monthly active learners in v1, with 500 concurrent voice sessions |
| Accuracy | Grammar-engine-validated Sanskrit forms in at least 98% of tutor replies on the gold set |
| Privacy | Explicit consent for voice recording; learner can delete audio and data; encrypt in transit and at rest; comply with India DPDP Act and GDPR |
| Cost | Track cost per active minute for STT, LLM and TTS; target a voice minute cost that supports the pricing plan; cache TTS for repeated content |
| Network | Graceful degradation on poor connections: fall back to text, buffer audio, resume sessions |
| Compatibility | Latest two versions of Chrome, Safari, Edge, Firefox; Android and iOS browsers |
| Localisation | UI in English and Hindi at launch; tutor explanations in English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi and others as phased |

## 10. Monetisation and Admin

- **Free tier:** limited daily voice minutes, core lessons, basic review.
- **Premium:** unlimited voice, pronunciation lab, full library, advanced grammar tools, fluency reports.
- **Admin and content console:** author lessons, review flagged errors, manage vocabulary and reading content, view quality dashboards, A/B test prompts and lesson flows.

## 11. Success Metrics

| Category | Metric | Target |
| --- | --- | --- |
| Engagement | Day-30 retention | 35% or more |
| Engagement | Median daily active minutes | 20 or more |
| Speaking | Share of session time in speech | 50% or more |
| Learning | Learners reaching A2 in 4 months | 40% of active learners |
| Learning | Fluency check pass rate by stage | 70% or more |
| Quality | Error reports per 1,000 tutor messages | Below 5 |
| Quality | Pronunciation score improvement (week 1 vs week 8) | 20% or more |
| Performance | Voice turn latency p50 | Under 1.5 s |
| Satisfaction | NPS | 50 or more |

## 12. Release Plan

| Phase | Timeline | Scope | Exit gate |
| --- | --- | --- | --- |
| 0. Discovery and spike | Weeks 1 to 3 | Sarvam STT, TTS, LLM and translation tests on Sanskrit; scholar review; grammar engine choice | Go or no-go on each Sarvam component, with fallbacks chosen |
| 1. MVP | Months 1 to 3 | Onboarding, placement, text chat with tappable words, Stage 0 to 2 content, vocabulary review, TTS playback, push-to-talk voice | 50 beta learners complete 2 weeks; error rate under target |
| 2. Live voice | Months 4 to 5 | Hands-free live voice, barge-in, captions, roleplays, pronunciation coach v1 | Latency and accuracy targets met |
| 3. Depth | Months 6 to 8 | Stages 3 and 4, grammar and parsing tools, graded readers, shloka mode, fluency checks | Retention and learning targets on cohort |
| 4. Scale | Months 9 to 12 | Mobile apps, more explanation languages, specialisation tracks, classroom features | Public launch |

## 13. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Sarvam STT or TTS does not handle Sanskrit well | Core voice experience fails | Week 1 to 3 spike; provider abstraction; fallback to Hindi-locale models, custom lexicon, extra provider or recorded audio |
| LLM produces incorrect Sanskrit | Learners learn wrong forms | Grammar engine validation, retrieval from vetted content, scholar review, error reporting loop |
| Latency too high for natural conversation | Poor voice experience | Streaming at every stage, sentence-level TTS, regional hosting in India, prompt and context trimming |
| Few Sanskrit speech datasets | Weak STT and pronunciation scoring | Collect consented learner and teacher audio; partner with Sanskrit institutions |
| Learner drop-off after novelty | Low retention | Short daily goals, streaks, quick wins, personalised review |
| Cost per voice minute too high | Unsustainable pricing | Cost tracking, caching, tiered usage limits, smaller models for simple turns |
| Cultural or religious sensitivity | Reputation risk | Content guidelines, neutral tone, scholar and community review |

## 14. Open Questions

- Which Sarvam models and endpoints support Sanskrit today for speech-to-text and text-to-speech? (Resolved in the Phase 0 spike.)
- Is the target pronunciation tradition classical (shuddha, Paninian) or the Samskrita Bharati conversational style, or both?
- Primary explanation language at launch: English, Hindi, or both?
- Will content be licensed from existing Sanskrit teaching organisations or authored in-house?
- Free vs paid split and target price points?
- Is a classroom or teacher mode needed in the first year?
