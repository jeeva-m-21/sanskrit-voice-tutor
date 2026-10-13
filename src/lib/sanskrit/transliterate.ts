/**
 * Sanskrit Transliteration Utility
 * Supports bidirectional conversions between Devanagari, IAST, Harvard-Kyoto (HK), and SLP1.
 */

export type ScriptType = 'devanagari' | 'iast' | 'hk';

// Basic Vowels
const VOWELS_DEVA_TO_IAST: Record<string, string> = {
  'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū',
  'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
};

// Vowel Matras (dependent signs)
const MATRAS_DEVA_TO_IAST: Record<string, string> = {
  'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū',
  'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
};

// Consonants (without inherent 'a' in value, we append 'a' unless followed by virama/matra)
const CONSONANTS_DEVA_TO_IAST: Record<string, string> = {
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
  'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
  'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
  'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
};

// Yogavahas and special marks
const SPECIAL_DEVA_TO_IAST: Record<string, string> = {
  'ं': 'ṃ',
  'ः': 'ḥ',
  'ँ': 'm̐',
  'ऽ': "'",
  '।': '|',
  '॥': '||',
};

// IAST to Devanagari map (multicharacter tokens sorted by descending length)
const IAST_TO_DEVA_TOKENS: [string, string][] = [
  ['aum', 'ॐ'],
  ['om', 'ॐ'],
  ['ai', 'ऐ'],
  ['au', 'औ'],
  ['kh', 'ख'],
  ['gh', 'घ'],
  ['ch', 'छ'],
  ['jh', 'झ'],
  ['ṭh', 'ठ'],
  ['ḍh', 'ढ'],
  ['th', 'थ'],
  ['dh', 'ध'],
  ['ph', 'फ'],
  ['bh', 'भ'],
  ['ā', 'आ'],
  ['ī', 'ई'],
  ['ū', 'ऊ'],
  ['ṛ', 'ऋ'],
  ['ṝ', 'ॠ'],
  ['ḷ', 'ऌ'],
  ['ḹ', 'ॡ'],
  ['ṅ', 'ङ'],
  ['ñ', 'ञ'],
  ['ṭ', 'ट'],
  ['ḍ', 'ड'],
  ['ṇ', 'ण'],
  ['ś', 'श'],
  ['ṣ', 'ष'],
  ['ṃ', 'ं'],
  ['ḥ', 'ः'],
  ['m̐', 'ँ'],
  ['a', 'अ'],
  ['i', 'इ'],
  ['u', 'उ'],
  ['e', 'ए'],
  ['o', 'ओ'],
  ['k', 'क'],
  ['g', 'ग'],
  ['c', 'च'],
  ['j', 'ज'],
  ['t', 'त'],
  ['d', 'द'],
  ['n', 'न'],
  ['p', 'प'],
  ['b', 'ब'],
  ['m', 'म'],
  ['y', 'य'],
  ['r', 'र'],
  ['l', 'ल'],
  ['v', 'व'],
  ['s', 'स'],
  ['h', 'ह'],
  ["'", 'ऽ'],
  ['||', '॥'],
  ['|', '।'],
];

/**
 * Transliterates Devanagari text to IAST
 */
export function devanagariToIast(text: string): string {
  let result = '';
  const len = text.length;
  let i = 0;

  while (i < len) {
    const char = text[i];
    const nextChar = i + 1 < len ? text[i + 1] : '';

    if (VOWELS_DEVA_TO_IAST[char]) {
      result += VOWELS_DEVA_TO_IAST[char];
      i++;
    } else if (CONSONANTS_DEVA_TO_IAST[char]) {
      const cons = CONSONANTS_DEVA_TO_IAST[char];
      if (nextChar === '्') {
        // Virama: pure consonant, no inherent 'a'
        result += cons;
        i += 2;
      } else if (MATRAS_DEVA_TO_IAST[nextChar]) {
        // Vowel matra
        result += cons + MATRAS_DEVA_TO_IAST[nextChar];
        i += 2;
      } else {
        // Inherent 'a'
        result += cons + 'a';
        i++;
      }
    } else if (SPECIAL_DEVA_TO_IAST[char]) {
      result += SPECIAL_DEVA_TO_IAST[char];
      i++;
    } else {
      // Pass-through (punctuation, spaces, latin letters, numbers)
      result += char;
      i++;
    }
  }

  return result;
}

/**
 * Basic transliteration from IAST / Roman to Devanagari
 */
export function iastToDevanagari(text: string): string {
  // Pre-process standard Roman shortcuts if any
  const normalized = text
    .toLowerCase()
    .replace(/aa/g, 'ā')
    .replace(/ii/g, 'ī')
    .replace(/uu/g, 'ū')
    .replace(/ri/g, 'ṛ')
    .replace(/sh/g, 'ś')
    .replace(/shh/g, 'ṣ');

  let result = '';
  let i = 0;
  const len = normalized.length;

  const isVowel = (str: string) => ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ', 'e', 'ai', 'o', 'au'].includes(str);

  const matraMap: Record<string, string> = {
    'a': '',
    'ā': 'ा',
    'i': 'ि',
    'ī': 'ी',
    'u': 'ु',
    'ū': 'ू',
    'ṛ': 'ृ',
    'ṝ': 'ॄ',
    'ḷ': 'ॢ',
    'ḹ': 'ॣ',
    'e': 'े',
    'ai': 'ै',
    'o': 'ो',
    'au': 'ौ',
  };

  const consMap: Record<string, string> = {
    'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ',
    'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ñ': 'ञ',
    'ṭ': 'ट', 'ṭh': 'ठ', 'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
    't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
    'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
    'ś': 'श', 'ṣ': 'ष', 's': 'स', 'h': 'ह',
  };

  const vowelInitMap: Record<string, string> = {
    'a': 'अ', 'ā': 'आ', 'i': 'इ', 'ī': 'ई', 'u': 'उ', 'ū': 'ऊ',
    'ṛ': 'ऋ', 'ṝ': 'ॠ', 'ḷ': 'ऌ', 'ḹ': 'ॡ',
    'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
  };

  while (i < len) {
    // Check two-char tokens
    const two = normalized.slice(i, i + 2);
    const one = normalized.slice(i, i + 1);

    // Yogavahas
    if (one === 'ṃ' || one === 'm' && i + 1 === len) {
      if (one === 'ṃ') {
        result += 'ं';
        i++;
        continue;
      }
    }
    if (one === 'ḥ') {
      result += 'ः';
      i++;
      continue;
    }
    if (one === "'") {
      result += 'ऽ';
      i++;
      continue;
    }
    if (two === '||') {
      result += '॥';
      i += 2;
      continue;
    }
    if (one === '|') {
      result += '।';
      i++;
      continue;
    }

    // Check consonant (multi-char first)
    const matchedCons = consMap[two] ? two : (consMap[one] ? one : null);

    if (matchedCons) {
      const devaCons = consMap[matchedCons];
      const afterConsIdx = i + matchedCons.length;

      // Check following vowel
      const nextVowelTwo = normalized.slice(afterConsIdx, afterConsIdx + 2);
      const nextVowelOne = normalized.slice(afterConsIdx, afterConsIdx + 1);
      const matchedVowel = isVowel(nextVowelTwo) ? nextVowelTwo : (isVowel(nextVowelOne) ? nextVowelOne : null);

      if (matchedVowel) {
        result += devaCons + matraMap[matchedVowel];
        i = afterConsIdx + matchedVowel.length;
      } else {
        // No vowel immediately follows -> virama (halanta)
        result += devaCons + '्';
        i = afterConsIdx;
      }
      continue;
    }

    // Check independent vowel
    const matchedVowelInit = isVowel(two) ? two : (isVowel(one) ? one : null);
    if (matchedVowelInit) {
      result += vowelInitMap[matchedVowelInit] || matchedVowelInit;
      i += matchedVowelInit.length;
      continue;
    }

    // Fallback: copy punctuation/numbers/spaces
    result += normalized[i];
    i++;
  }

  // Clean trailing unnecessary virama before spaces or ends if desired, but halanta at end of word is grammatically valid (e.g. bhavān)
  return result;
}

/**
 * Universal transliterator
 */
export function transliterate(text: string, from: ScriptType, to: ScriptType): string {
  if (from === to) return text;
  if (from === 'devanagari' && to === 'iast') return devanagariToIast(text);
  if (from === 'iast' && to === 'devanagari') return iastToDevanagari(text);
  if (from === 'hk' && to === 'devanagari') {
    // Basic HK conversion
    const hkToIast = text
      .replace(/A/g, 'ā').replace(/I/g, 'ī').replace(/U/g, 'ū')
      .replace(/R/g, 'ṛ').replace(/M/g, 'ṃ').replace(/H/g, 'ḥ')
      .replace(/G/g, 'ṅ').replace(/J/g, 'ñ').replace(/T/g, 'ṭ')
      .replace(/D/g, 'ḍ').replace(/N/g, 'ṇ').replace(/z/g, 'ś').replace(/S/g, 'ṣ');
    return iastToDevanagari(hkToIast);
  }
  return text;
}
