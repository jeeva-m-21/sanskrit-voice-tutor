/**
 * Sanskrit Sandhi Rules & Splitting Engine
 * Deterministic implementation of classical Paninian euphonic junction rules.
 */

export interface SandhiResult {
  combined: string;
  ruleName: string;
  sutra?: string;
  explanation: string;
}

export interface SandhiSplitResult {
  word1: string;
  word2: string;
  ruleName: string;
  explanation: string;
}

// Savarna Dirgha pairs (अकः सवर्णे दीर्घः)
const DIRGHA_MAP: Record<string, string> = {
  'अ+अ': 'आ', 'अ+आ': 'आ', 'आ+अ': 'आ', 'आ+आ': 'आ',
  'इ+इ': 'ई', 'इ+ई': 'ई', 'ई+इ': 'ई', 'ई+ई': 'ई',
  'उ+उ': 'ऊ', 'उ+ऊ': 'ऊ', 'ऊ+उ': 'ऊ', 'ऊ+ऊ': 'ऊ',
  'ऋ+ऋ': 'ॠ', 'ऋ+ॠ': 'ॠ', 'ॠ+ऋ': 'ॠ',
};

// Guna pairs (आद्गुणः)
const GUNA_MAP: Record<string, string> = {
  'अ+इ': 'ए', 'अ+ई': 'ए', 'आ+इ': 'ए', 'आ+ई': 'ए',
  'अ+उ': 'ओ', 'अ+ऊ': 'ओ', 'आ+उ': 'ओ', 'आ+ऊ': 'ओ',
  'अ+ऋ': 'अर्', 'अ+ॠ': 'अर्', 'आ+ऋ': 'अर्', 'आ+ॠ': 'अर्',
};

// Vriddhi pairs (वृद्धिरेचि)
const VRIDDHI_MAP: Record<string, string> = {
  'अ+ए': 'ऐ', 'आ+ए': 'ऐ', 'अ+ऐ': 'ऐ', 'आ+ऐ': 'ऐ',
  'अ+ओ': 'औ', 'आ+ओ': 'औ', 'अ+औ': 'औ', 'आ+औ': 'औ',
};

// Common Vowel endings in Devanagari representation
const VOWEL_ENDINGS: Record<string, string> = {
  'ा': 'आ', 'ि': 'इ', 'ी': 'ई', 'ु': 'उ', 'ू': 'ऊ',
  'ृ': 'ऋ', 'े': 'ए', 'ै': 'ऐ', 'ो': 'ओ', 'ौ': 'औ',
};

/**
 * Combines two Sanskrit words according to classical sandhi rules
 */
export function joinSandhi(word1: string, word2: string): SandhiResult {
  if (!word1 || !word2) return { combined: word1 + word2, ruleName: 'None', explanation: 'No sandhi applicable' };

  // Visarga Sandhi: अहम् + गच्छामि or रामः + गच्छति
  if (word1.endsWith('ः')) {
    const base = word1.slice(0, -1);
    const firstChar = word2[0];

    // Visarga followed by च/छ -> श्च
    if (firstChar === 'च' || firstChar === 'छ') {
      return {
        combined: `${base}श्${word2}`,
        ruleName: 'Visarga Sattva Sandhi (विसर्ग सत्व)',
        sutra: 'विसर्जनीयस्य सः (८.३.३४)',
        explanation: 'Visarga becomes ś (श) before c/ch sounds.'
      };
    }
    // Visarga followed by त/थ -> स्त
    if (firstChar === 'त' || firstChar === 'थ') {
      return {
        combined: `${base}स्${word2}`,
        ruleName: 'Visarga Sattva Sandhi (विसर्ग सत्व)',
        sutra: 'विसर्जनीयस्य सः',
        explanation: 'Visarga becomes s (स) before t/th sounds.'
      };
    }
    // Visarga preceded by 'a' (inherent consonant) followed by soft consonant or vowel 'a'
    // e.g. रामः + अयम् -> रामोऽयम् (अतो रोरप्लुतादप्लुते)
    if (firstChar === 'अ') {
      return {
        combined: `${base}ोऽ${word2.slice(1)}`,
        ruleName: 'Visarga Utva & Purvarupa (उत्व एवं पूर्वरूप)',
        sutra: 'अतो रोरप्लुतादप्लुते (६.१.११३) / एङः पदान्तादति (६.१.१०९)',
        explanation: 'Visarga after "a" before "a" transforms to "o" followed by avagraha (ऽ).'
      };
    }
  }

  // Purvarupa Sandhi: ते + अपि -> तेऽपि (एङः पदान्तादति)
  if ((word1.endsWith('े') || word1.endsWith('ो')) && word2.startsWith('अ')) {
    return {
      combined: `${word1}ऽ${word2.slice(1)}`,
      ruleName: 'Purvarupa Sandhi (पूर्वरूप सन्धि)',
      sutra: 'एङः पदान्तादति (६.१.१०९)',
      explanation: 'When word ending in "e" or "o" meets initial "a", the "a" elides into an avagraha (ऽ).'
    };
  }

  // Common Vowel Sandhi: Extract ending vowel of word1 and beginning vowel of word2
  let endVowel = 'अ';
  let prefix = word1;
  const lastChar = word1.slice(-1);

  if (lastChar === '्') {
    // Halanta consonant: consonant sandhi might apply
    if (lastChar === '्' && word1.endsWith('म्') && word2.length > 0) {
      // Anusvara Sandhi: मोऽनुस्वारः
      const initialCons = word2[0];
      if (initialCons !== 'अ' && initialCons !== 'आ' && initialCons !== 'इ' && initialCons !== 'ई' && initialCons !== 'उ') {
        return {
          combined: `${word1.slice(0, -2)}ं ${word2}`,
          ruleName: 'Anusvara Sandhi (अनुस्वार सन्धि)',
          sutra: 'मोऽनुस्वारः (८.३.२३)',
          explanation: 'Final "m" becomes anusvāra (ं) before a consonant.'
        };
      }
    }
    return { combined: `${word1} ${word2}`, ruleName: 'Padanta', explanation: 'No vowel junction applies.' };
  } else if (VOWEL_ENDINGS[lastChar]) {
    endVowel = VOWEL_ENDINGS[lastChar];
    prefix = word1.slice(0, -1);
  } else {
    // Ends with inherent 'a'
    endVowel = 'अ';
  }

  const startVowel = word2[0];
  const pairKey = `${endVowel}+${startVowel}`;

  // Check Savarna Dirgha
  if (DIRGHA_MAP[pairKey]) {
    const combinedVowel = DIRGHA_MAP[pairKey];
    const matra = combinedVowel === 'आ' ? 'ा' : combinedVowel === 'ई' ? 'ी' : combinedVowel === 'ऊ' ? 'ू' : 'ॄ';
    return {
      combined: `${prefix}${matra}${word2.slice(1)}`,
      ruleName: 'Savarna Dirgha Sandhi (सवर्ण दीर्घ सन्धि)',
      sutra: 'अकः सवर्णे दीर्घः (६.१.१०१)',
      explanation: `Homorganic vowels (${endVowel} + ${startVowel}) merge into their long form (${combinedVowel}).`
    };
  }

  // Check Guna
  if (GUNA_MAP[pairKey]) {
    const combinedVowel = GUNA_MAP[pairKey];
    let replacement = '';
    if (combinedVowel === 'ए') replacement = 'े';
    else if (combinedVowel === 'ओ') replacement = 'ो';
    else if (combinedVowel === 'अर्') replacement = 'र्';

    return {
      combined: `${prefix}${replacement}${word2.slice(1)}`,
      ruleName: 'Guna Sandhi (गुण सन्धि)',
      sutra: 'आद्गुणः (६.१.८७)',
      explanation: `"a/ā" followed by "${startVowel}" undergoes Guṇa to produce "${combinedVowel}".`
    };
  }

  // Check Vriddhi
  if (VRIDDHI_MAP[pairKey]) {
    const combinedVowel = VRIDDHI_MAP[pairKey];
    const matra = combinedVowel === 'ऐ' ? 'ै' : 'ौ';
    return {
      combined: `${prefix}${matra}${word2.slice(1)}`,
      ruleName: 'Vriddhi Sandhi (वृद्धि सन्धि)',
      sutra: 'वृद्धिरेचि (६.१.८८)',
      explanation: `"a/ā" followed by "${startVowel}" undergoes Vṛddhi to produce "${combinedVowel}".`
    };
  }

  // Default fallback
  return {
    combined: `${word1} ${word2}`,
    ruleName: 'Separate Words',
    explanation: 'Words maintained separately without euphonic junction.'
  };
}

/**
 * Common Sandhi Splitter: splits compound or fused Sanskrit words
 */
export function splitSandhi(compound: string): SandhiSplitResult[] {
  const results: SandhiSplitResult[] = [];
  if (!compound || compound.length < 3) return results;

  // 1. Check Avagraha (ऽ) -> Purvarupa
  if (compound.includes('ऽ')) {
    const [part1, part2] = compound.split('ऽ');
    results.push({
      word1: part1,
      word2: `अ${part2}`,
      ruleName: 'Purvarupa Sandhi Split (पूर्वरूप विच्छेद)',
      explanation: `Avagraha (ऽ) represents an elided initial "a" (अ) after "e" or "o".`
    });
  }

  // 2. Check for Guna matra 'े' (could be a + i)
  const eIndex = compound.indexOf('े');
  if (eIndex > 0 && eIndex < compound.length - 1) {
    const left = compound.slice(0, eIndex);
    const right = compound.slice(eIndex + 1);
    results.push({
      word1: `${left}ा`,
      word2: `इ${right}`,
      ruleName: 'Guna Sandhi Split (गुण सन्धि)',
      explanation: `"e" splits into "...a/ā" + "i/ī..." (e.g., महा + ईश = महेश).`
    });
    results.push({
      word1: `${left}`,
      word2: `इ${right}`,
      ruleName: 'Guna Sandhi Split (गुण सन्धि)',
      explanation: `"e" splits into "...a" + "i..." (e.g., नर + इन्द्र = नरेन्द्र).`
    });
  }

  // 3. Check for 'ो' (could be a + u or visarga + a)
  const oIndex = compound.indexOf('ो');
  if (oIndex > 0 && oIndex < compound.length - 1) {
    const left = compound.slice(0, oIndex);
    const right = compound.slice(oIndex + 1);
    results.push({
      word1: `${left}`,
      word2: `उ${right}`,
      ruleName: 'Guna Sandhi Split (गुण सन्धि)',
      explanation: `"o" splits into "...a" + "u/ū..." (e.g., सूर्य + उदय = सूर्योदय).`
    });
  }

  // 4. Check for 'ा' (Savarna Dirgha a + a)
  const aaIndex = compound.indexOf('ा');
  if (aaIndex > 0 && aaIndex < compound.length - 1) {
    const left = compound.slice(0, aaIndex);
    const right = compound.slice(aaIndex + 1);
    results.push({
      word1: left,
      word2: `अ${right}`,
      ruleName: 'Savarna Dirgha Split (दीर्घ सन्धि)',
      explanation: `"ā" splits into "...a" + "a..." (e.g., हिम + आलय = हिमालय).`
    });
    results.push({
      word1: left,
      word2: `आ${right}`,
      ruleName: 'Savarna Dirgha Split (दीर्घ सन्धि)',
      explanation: `"ā" splits into "...a" + "ā...".`
    });
  }

  return results;
}
