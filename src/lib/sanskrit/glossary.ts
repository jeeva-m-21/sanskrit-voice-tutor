/**
 * Sanskrit Tokenizer and Tap-to-Gloss Grammar Analyzer
 * Deconstructs Sanskrit sentences into tokens and provides instant grammatical breakdowns.
 */

import { devanagariToIast } from './transliterate';

export interface GlossToken {
  word: string;
  cleanWord: string;
  iast: string;
  meaning: string;
  meaningHindi?: string;
  partOfSpeech: 'noun' | 'verb' | 'pronoun' | 'avyaya' | 'adjective' | 'particle';
  root?: string; // Dhatu or Pratipadika
  grammarTag?: string; // e.g. "लकार: लट् | पुरुष: उत्तम | वचन: एकवचन" or "विभक्ति: प्रथमा | वचन: एकवचन"
  notes?: string;
}

// Rich lexicon of common Sanskrit vocabulary and forms across A1 to B2 levels
const DICTIONARY: Record<string, Partial<GlossToken>> = {
  'नमो': {
    cleanWord: 'नमः',
    meaning: 'Salutations / Greetings',
    meaningHindi: 'नमस्ते / प्रणाम',
    partOfSpeech: 'avyaya',
    root: 'नमस्',
    grammarTag: 'अव्यय (Indeclinable)',
    notes: 'Used in traditional Sanskrit greeting: नमो नमः!'
  },
  'नमः': {
    cleanWord: 'नमः',
    meaning: 'Salutations / Bowing',
    meaningHindi: 'नमस्ते',
    partOfSpeech: 'avyaya',
    root: 'नमस्',
    grammarTag: 'अव्यय (Indeclinable)'
  },
  'हरिः': {
    cleanWord: 'हरिः',
    meaning: 'Lord Hari / Supreme Reality',
    meaningHindi: 'ईश्वर / विष्णु',
    partOfSpeech: 'noun',
    root: 'हरि (इ-कारान्त पुंल्लिङ्ग)',
    grammarTag: 'विभक्ति: प्रथमा | वचन: एकवचन'
  },
  'ॐ': {
    cleanWord: 'ॐ',
    meaning: 'The primordial sacred syllable Om',
    meaningHindi: 'प्रणव मन्त्र',
    partOfSpeech: 'particle',
    grammarTag: 'मन्त्र / अव्यय'
  },
  'मम': {
    cleanWord: 'मम',
    meaning: 'My / Mine',
    meaningHindi: 'मेरा / मेरी',
    partOfSpeech: 'pronoun',
    root: 'अस्मद् (First person)',
    grammarTag: 'षष्ठी विभक्ति (Genitive) | एकवचन'
  },
  'नाम': {
    cleanWord: 'नाम',
    meaning: 'Name',
    meaningHindi: 'नाम',
    partOfSpeech: 'noun',
    root: 'नामन् (Neuter stem)',
    grammarTag: 'प्रथमा विभक्ति | एकवचन'
  },
  'किम्': {
    cleanWord: 'किम्',
    meaning: 'What / Why',
    meaningHindi: 'क्या',
    partOfSpeech: 'pronoun',
    root: 'किम् (Interrogative)',
    grammarTag: 'प्रथमा/द्वितीया विभक्ति'
  },
  'भवतः': {
    cleanWord: 'भवतः',
    meaning: 'Your (respectful, masculine)',
    meaningHindi: 'आपका (पुल्लिंग)',
    partOfSpeech: 'pronoun',
    root: 'भवत् (Masculine)',
    grammarTag: 'षष्ठी विभक्ति | एकवचन'
  },
  'भवत्याः': {
    cleanWord: 'भवत्याः',
    meaning: 'Your (respectful, feminine)',
    meaningHindi: 'आपका (स्त्रीलिंग)',
    partOfSpeech: 'pronoun',
    root: 'भवत् (Feminine: भवती)',
    grammarTag: 'षष्ठी विभक्ति | एकवचन'
  },
  'कथम्': {
    cleanWord: 'कथम्',
    meaning: 'How',
    meaningHindi: 'कैसे',
    partOfSpeech: 'avyaya',
    root: 'कथम्',
    grammarTag: 'प्रश्नार्थक अव्यय (Interrogative adverb)'
  },
  'अस्ति': {
    cleanWord: 'अस्ति',
    meaning: 'is / exists',
    meaningHindi: 'है',
    partOfSpeech: 'verb',
    root: 'अस् (to be, 2P)',
    grammarTag: 'लट् लकार (Present) | प्रथम पुरुष (3rd) | एकवचन'
  },
  'सन्ति': {
    cleanWord: 'सन्ति',
    meaning: 'are / exist (plural)',
    meaningHindi: 'हैं',
    partOfSpeech: 'verb',
    root: 'अस् (to be, 2P)',
    grammarTag: 'लट् लकार | प्रथम पुरुष | बहुवचन'
  },
  'अस्मि': {
    cleanWord: 'अस्मि',
    meaning: 'am',
    meaningHindi: 'हूँ',
    partOfSpeech: 'verb',
    root: 'अस् (to be, 2P)',
    grammarTag: 'लट् लकार | उत्तम पुरुष (1st) | एकवचन'
  },
  'अहम्': {
    cleanWord: 'अहम्',
    meaning: 'I',
    meaningHindi: 'मैं',
    partOfSpeech: 'pronoun',
    root: 'अस्मद्',
    grammarTag: 'प्रथमा विभक्ति (Nominative) | एकवचन'
  },
  'त्वम्': {
    cleanWord: 'त्वम्',
    meaning: 'You',
    meaningHindi: 'तुम / आप',
    partOfSpeech: 'pronoun',
    root: 'युष्मद्',
    grammarTag: 'प्रथमा विभक्ति | एकवचन'
  },
  'सः': {
    cleanWord: 'सः',
    meaning: 'He / That (masculine)',
    meaningHindi: 'वह (पुल्लिंग)',
    partOfSpeech: 'pronoun',
    root: 'तद् (Pullinga)',
    grammarTag: 'प्रथमा विभक्ति | एकवचन'
  },
  'सा': {
    cleanWord: 'सा',
    meaning: 'She / That (feminine)',
    meaningHindi: 'वह (स्त्रीलिंग)',
    partOfSpeech: 'pronoun',
    root: 'तद् (Strilinga)',
    grammarTag: 'प्रथमा विभक्ति | एकवचन'
  },
  'तत्': {
    cleanWord: 'तत्',
    meaning: 'That (neuter)',
    meaningHindi: 'वह',
    partOfSpeech: 'pronoun',
    root: 'तद् (Napumsakalinga)',
    grammarTag: 'प्रथमा/द्वितीया विभक्ति | एकवचन'
  },
  'कुशलम्': {
    cleanWord: 'कुशलम्',
    meaning: 'Well / Fine / Auspicious',
    meaningHindi: 'कुशल / ठीक',
    partOfSpeech: 'noun',
    root: 'कुशल',
    grammarTag: 'प्रथमा विभक्ति | एकवचन'
  },
  'पठामि': {
    cleanWord: 'पठामि',
    meaning: 'I read / I study',
    meaningHindi: 'मैं पढ़ता हूँ',
    partOfSpeech: 'verb',
    root: 'पठ् (to read, 1P)',
    grammarTag: 'लट् लकार | उत्तम पुरुष | एकवचन'
  },
  'पठति': {
    cleanWord: 'पठति',
    meaning: 'reads / studies',
    meaningHindi: 'पढ़ता है',
    partOfSpeech: 'verb',
    root: 'पठ् (to read, 1P)',
    grammarTag: 'लट् लकार | प्रथम पुरुष | एकवचन'
  },
  'गच्छामि': {
    cleanWord: 'गच्छामि',
    meaning: 'I go',
    meaningHindi: 'मैं जाता हूँ',
    partOfSpeech: 'verb',
    root: 'गम् (to go, 1P)',
    grammarTag: 'लट् लकार | उत्तम पुरुष | एकवचन'
  },
  'गच्छति': {
    cleanWord: 'गच्छति',
    meaning: 'goes',
    meaningHindi: 'जाता है',
    partOfSpeech: 'verb',
    root: 'गम् (to go, 1P)',
    grammarTag: 'लट् लकार | प्रथम पुरुष | एकवचन'
  },
  'आगच्छति': {
    cleanWord: 'आगच्छति',
    meaning: 'comes',
    meaningHindi: 'आता है',
    partOfSpeech: 'verb',
    root: 'आ + गम् (Upasarga आ + Gam)',
    grammarTag: 'लट् लकार | प्रथम पुरुष | एकवचन'
  },
  'वदति': {
    cleanWord: 'वदति',
    meaning: 'speaks',
    meaningHindi: 'बोलता है',
    partOfSpeech: 'verb',
    root: 'वद् (to speak, 1P)',
    grammarTag: 'लट् लकार | प्रथम पुरुष | एकवचन'
  },
  'संस्कृतम्': {
    cleanWord: 'संस्कृतम्',
    meaning: 'Sanskrit language / Refined',
    meaningHindi: 'संस्कृत भाषा',
    partOfSpeech: 'noun',
    root: 'सम् + कृ + क्त',
    grammarTag: 'द्वितीया/प्रथमा विभक्ति | एकवचन'
  },
  'सुप्रभातम्': {
    cleanWord: 'सुप्रभातम्',
    meaning: 'Good morning',
    meaningHindi: 'शुभ प्रभात',
    partOfSpeech: 'noun',
    root: 'सु + प्रभात',
    grammarTag: 'अव्ययवत् प्रयोग / नित्य नपुंसकलिङ्ग'
  },
  'धन्यवादः': {
    cleanWord: 'धन्यवादः',
    meaning: 'Thank you / Gratitude',
    meaningHindi: 'धन्यवाद',
    partOfSpeech: 'noun',
    root: 'धन्य + वाद',
    grammarTag: 'प्रथमा विभक्ति | एकवचन'
  },
  'पुनर्मिलामः': {
    cleanWord: 'पुनर्मिलामः',
    meaning: 'See you again / Until we meet again',
    meaningHindi: 'फिर मिलेंगे',
    partOfSpeech: 'verb',
    root: 'पुनर् + मिल् (to meet)',
    grammarTag: 'लट् लकार | उत्तम पुरुष | बहुवचन'
  },
  'सत्यम्': {
    cleanWord: 'सत्यम्',
    meaning: 'Truth',
    meaningHindi: 'सत्य / सच',
    partOfSpeech: 'noun',
    root: 'सत् + यत्',
    grammarTag: 'प्रथमा विभक्ति | एकवचन'
  },
  'धर्मम्': {
    cleanWord: 'धर्मम्',
    meaning: 'Duty / Righteousness',
    meaningHindi: 'धर्म / कर्तव्य',
    partOfSpeech: 'noun',
    root: 'धृ + मन्',
    grammarTag: 'द्वितीया विभक्ति | एकवचन'
  },
  'चर': {
    cleanWord: 'चर',
    meaning: 'Walk / Practice / Follow!',
    meaningHindi: 'आचरण करो',
    partOfSpeech: 'verb',
    root: 'चर् (to walk/conduct, 1P)',
    grammarTag: 'लोट् लकार (Imperative) | मध्यम पुरुष | एकवचन'
  },
  'कर्मण्येवाधिकारस्ते': {
    cleanWord: 'कर्मणि एव अधिकारः ते',
    meaning: 'Your right is in action only (Gita 2.47)',
    meaningHindi: 'कर्म में ही तुम्हारा अधिकार है',
    partOfSpeech: 'noun',
    notes: 'Compound sandhi: कर्मणि (7th case) + एव (only) + अधिकारः (right) + ते (for you)'
  },
  'मा': {
    cleanWord: 'मा',
    meaning: 'Do not / Never (prohibitive particle)',
    meaningHindi: 'मत / नहीं',
    partOfSpeech: 'particle',
    grammarTag: 'निषेधार्थक अव्यय'
  },
  'फलेषु': {
    cleanWord: 'फलेषु',
    meaning: 'in fruits / in results',
    meaningHindi: 'फलों में',
    partOfSpeech: 'noun',
    root: 'फल (Neuter)',
    grammarTag: 'सप्तमी विभक्ति (Locative) | बहुवचन'
  },
  'कदाचन': {
    cleanWord: 'कदाचन',
    meaning: 'at any time / ever',
    meaningHindi: 'कभी भी',
    partOfSpeech: 'avyaya',
    grammarTag: 'अव्यय (Indeclinable)'
  }
};

/**
 * Tokenizes a Sanskrit sentence and generates tap-to-gloss metadata
 */
export function tokenizeAndGloss(sentence: string): GlossToken[] {
  if (!sentence) return [];

  // Split on spaces and standard punctuation while preserving word bounds
  const rawWords = sentence
    .replace(/[।॥,?!.]/g, '')
    .trim()
    .split(/\s+/);

  return rawWords.map((rawWord) => {
    // Strip trailing punctuation
    const clean = rawWord.replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '');
    const entry = DICTIONARY[clean] || DICTIONARY[rawWord];

    const iast = devanagariToIast(clean || rawWord);

    if (entry) {
      return {
        word: rawWord,
        cleanWord: entry.cleanWord || clean,
        iast,
        meaning: entry.meaning || 'Meaning in context',
        meaningHindi: entry.meaningHindi,
        partOfSpeech: entry.partOfSpeech || 'noun',
        root: entry.root,
        grammarTag: entry.grammarTag,
        notes: entry.notes,
      };
    }

    // Heuristic inference for unknown words
    let pos: GlossToken['partOfSpeech'] = 'noun';
    let tag = 'विभक्ति / रूप';
    let root = clean;

    if (clean.endsWith('ति') || clean.endsWith('सि') || clean.endsWith('मि') || clean.endsWith('न्ति')) {
      pos = 'verb';
      tag = 'लट् लकार (वर्तमान काल)';
    } else if (clean.endsWith('स्य')) {
      tag = 'षष्ठी विभक्ति (सम्बन्ध / of)';
    } else if (clean.endsWith('े')) {
      tag = 'सप्तमी विभक्ति (in/on)';
    } else if (clean.endsWith('ात्')) {
      tag = 'पञ्चमी विभक्ति (from)';
    } else if (clean.endsWith('ाय')) {
      tag = 'चतुर्थी विभक्ति (for)';
    }

    return {
      word: rawWord,
      cleanWord: clean,
      iast,
      meaning: `Word form of ${clean}`,
      partOfSpeech: pos,
      root,
      grammarTag: tag,
    };
  });
}
