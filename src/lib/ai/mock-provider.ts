/**
 * Mock / Offline AI Provider
 * Provides robust, intelligent offline responses, speech synthesis hints, and pronunciation scoring
 * without needing active API keys or external network connectivity.
 */

import { IAIProvider, TutorTurnRequest, TutorTurnResponse, TTSRequest, TTSResponse, TranscriptionResult, PronunciationScoreResult } from './types';
import { devanagariToIast } from '../sanskrit/transliterate';

export class MockProvider implements IAIProvider {
  name = 'Sanskrit Guru (Local Engine)';

  async generateTutorResponse(request: TutorTurnRequest): Promise<TutorTurnResponse> {
    const lastMsg = request.messages[request.messages.length - 1]?.content.toLowerCase() || '';

    // Simulate minor delay for natural conversational rhythm
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 1. Initial Greeting / First Turn
    if (request.messages.length <= 1 || lastMsg.includes('hello') || lastMsg.includes('namaste') || lastMsg.includes('வணக்கம்') || lastMsg.includes('नम') || lastMsg.includes('start')) {
      return {
        devanagari: 'नमो नमः! स्वागतम्। भवन्तः कथम् सन्ति?',
        iast: 'namo namaḥ! svāgatam. bhavantaḥ katham santi?',
        tamil: 'வணக்கம்! நல்வரவு. நீங்கள் எப்படி இருக்கிறீர்கள்?',
        translation: 'Greetings! Welcome. How are you doing?',
        notes: 'In Tamil, "வணக்கம்" (Vanakkam) is expressed as "नमो नमः" (Namo namaḥ) in Sanskrit.',
        suggestedReplies: [
          'नमो नमः! अहम् कुशली अस्मि (வணக்கம்! நான் நலம்)',
          'मम नाम... (என் பெயர்...)',
          'संस्कृतं पाठयतु (சமஸ்கிருதம் கற்றுக்கொடுங்கள்)'
        ],
        hints: [
          'Say you are well: "अहम् कुशली अस्मि" (நான் நலமாக உள்ளேன்)',
          'अहम् कुशली...',
          'नमो नमः! अहम् कुशली अस्मि।'
        ]
      };
    }

    // 2. Name / Introduction: "मम नाम..." or "My name is..."
    if (lastMsg.includes('नाम') || lastMsg.includes('name') || lastMsg.includes('अहम्')) {
      return {
        devanagari: 'अतीव सुन्दरम्! भवतः परिचयः ज्ञात्वा आनन्दः जातः। अद्य वयं किं पठामः — दैनन्दिन-सम्भाषणम् उत व्याकरणम्?',
        iast: devanagariToIast('अतीव सुन्दरम्! भवतः परिचयः ज्ञात्वा आनन्दः जातः। अद्य वयं किं पठामः — दैनन्दिन-सम्भाषणम् उत व्याकरणम्?'),
        translation: 'Wonderful! Very glad to know you. What shall we study today — daily conversation or grammar?',
        suggestedReplies: [
          'दैनन्दिन-सम्भाषणम् पठामः।',
          'लट्-लकारं (वर्तमानकालं) पठामः।',
          'एकं श्लोकं पाठयतु।'
        ],
        hints: [
          'Choose daily conversation or grammar',
          'वयं सम्भाषणम्...',
          'अद्य वयं दैनन्दिन-सम्भाषणम् पठामः।'
        ]
      };
    }

    // 3. Grammar Help / Sandhi / Vibhakti
    if (lastMsg.includes('व्याकरण') || lastMsg.includes('sandhi') || lastMsg.includes('grammar') || lastMsg.includes('विभक्ति') || lastMsg.includes('लकार')) {
      return {
        devanagari: 'उत्तमम्! संस्कृतव्याकरणे लट्-लकारः वर्तमानकाले प्रयुज्यते। यथा — "सः पठति" (He reads), "अहम् पठामि" (I read)। अधुना वदतु: "You read" संस्कृते किम् भवति?',
        iast: devanagariToIast('उत्तमम्! संस्कृतव्याकरणे लट्-लकारः वर्तमानकाले प्रयुज्यते। यथा — "सः पठति", "अहम् पठामि"। अधुना वदतु: "You read" संस्कृते किम् भवति?'),
        translation: 'Great! In Sanskrit grammar, Laṭ-lakāra is used for the present tense. E.g., "saḥ paṭhati" (He reads), "aham paṭhāmi" (I read). Now tell me: how do we say "You read" in Sanskrit?',
        suggestedReplies: [
          'त्वम् पठसि।',
          'भवान् पठति।',
          'अहम् न जानामि, साहाय्यं करोतु।'
        ],
        hints: [
          'For 2nd person pronoun "त्वम्", the verb ending is "-सि"',
          'त्वम् पठ...',
          'त्वम् पठसि।'
        ]
      };
    }

    // 4. Checking "त्वम् पठसि" response with inline correction or praise
    if (lastMsg.includes('पठसि') || lastMsg.includes('pathasi')) {
      return {
        devanagari: 'साधु साधु! सम्यक् उत्तरम् — "त्वम् पठसि" इति शुद्धम्। अधुना इदं वदतु: "अहम् गृहं गच्छामि" (I am going home) — अस्य वाक्यस्य अर्थः कः?',
        iast: devanagariToIast('साधु साधु! सम्यक् उत्तरम् — "त्वम् पठसि" इति शुद्धम्। अधुना इदं वदतु: "अहम् गृहं गच्छामि" — अस्य वाक्यस्य अर्थः कः?'),
        translation: 'Bravo! Correct answer — "tvam paṭhasi" is pure Sanskrit. Now tell me: what does "aham gṛhaṃ gacchāmi" mean?',
        suggestedReplies: [
          'I am going home.',
          'He goes home.',
          'सत्यम्, अहम् अपि गच्छामि।'
        ],
        hints: [
          '"अहम्" means I, "गृहम्" means home, "गच्छामि" means I go',
          'It means: I am going...',
          'It translates to: "I am going home".'
        ]
      };
    }

    // 5. Detect common error: "अहम् गच्छति" (wrong person ending) and recast kindly!
    if (lastMsg.includes('अहम् गच्छति') || lastMsg.includes('aham gacchati')) {
      return {
        devanagari: 'अहं गच्छामि! समीचीनं प्रयत्नम्। यदा "अहम्" (उत्तमपुरुषः) भवति, तदा क्रियापदं "गच्छामि" भवति, न तु "गच्छति"। वदतु — "अहम् गच्छामि"।',
        iast: devanagariToIast('अहं गच्छामि! समीचीनं प्रयत्नम्। यदा "अहम्" भवति, तदा क्रियापदं "गच्छामि" भवति।'),
        translation: 'Aham gacchāmi! Good try. When the subject is "aham" (1st person), the verb ending must be "-mi" (gacchāmi), not "-ti" (3rd person). Repeat: "aham gacchāmi".',
        suggestedReplies: [
          'अहम् गच्छामि।',
          'अवगतम्, धन्यवादः!'
        ],
        hints: [
          'Repeat the recast sentence',
          'अहम् गच्छा...',
          'अहम् गच्छामि।'
        ],
        correction: {
          originalPart: 'अहम् गच्छति',
          correctedPart: 'अहम् गच्छामि',
          explanation: 'With 1st person subject "अहम्" (I), the verb takes the Uttama Purusha ending "-मि" (गच्छामि).',
          sanskritRule: 'उत्तमपुरुषः - मिप् वस् मस्'
        }
      };
    }

    // Default conversational continuation
    return {
      devanagari: 'शोभनम्! भवतः संस्कृतप्रयासः प्रशंसनीयः अस्ति। अन्यत् किम् वक्तुम् इच्छति?',
      iast: devanagariToIast('शोभनम्! भवतः संस्कृतप्रयासः प्रशंसनीयः अस्ति। अन्यत् किम् वक्तुम् इच्छति?'),
      translation: 'Splendid! Your effort to speak Sanskrit is commendable. What else would you like to say or ask?',
      suggestedReplies: [
        'एकं सुभाषितं शृणोमि।',
        'अहं संस्कृतं जानामि।',
        'पुनर्मिलामः, गुरुवर्य!'
      ],
      hints: [
        'Ask to hear a wise saying (Subhashita)',
        'एकं सुभाषितं...',
        'एकं सुभाषितं पाठयतु।'
      ]
    };
  }

  async transcribeAudio(_audioBlobOrBuffer: ArrayBuffer | Blob): Promise<TranscriptionResult> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      transcript: 'नमो नमः अहम् कुशली अस्मि',
      iast: 'namo namaḥ aham kuśalī asmi',
      confidence: 0.95,
      languageCode: 'sa-IN',
    };
  }

  async synthesizeSpeech(request: TTSRequest): Promise<TTSResponse> {
    return {
      audioUrl: undefined,
      format: 'wav',
      durationSeconds: Math.max(1, request.text.length / 10),
    };
  }

  async scorePronunciation(targetText: string, _audioBlobOrBuffer: ArrayBuffer | Blob): Promise<PronunciationScoreResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulated evaluation of Sanskrit phonemes
    const hasRetroflex = /[टठडढण]/.test(targetText);
    const hasAspirate = /[खघछझठढथधफभ]/.test(targetText);
    const hasVisarga = /ः/.test(targetText);

    const issues = [];
    if (hasRetroflex) {
      issues.push({
        phoneme: 'ट/ठ/ड',
        type: 'retroflex' as const,
        tip: 'Curl the tip of your tongue backwards to touch the roof of the palate (Mūrdhanya).'
      });
    }
    if (hasVisarga) {
      issues.push({
        phoneme: 'ः (विसर्ग)',
        type: 'visarga' as const,
        tip: 'Visarga should sound like a gentle unvoiced breath echoing the preceding vowel (e.g. -aḥ, -iḥ).'
      });
    }

    return {
      overallScore: 92,
      accuracyPercent: 92,
      recognizedText: targetText,
      feedback: 'साधु! Excellent clarity and correct vowel length.',
      phonemeIssues: issues,
    };
  }
}
