/**
 * Sanskrit Tinganta (Verb Conjugation / Dhatu-roop) Engine
 * Generates conjugations across Lakaras (Lat, Lan, Lrt, Lot, Vidhilin).
 */

export type Lakara = 'lat' | 'lan' | 'lrt' | 'lot' | 'vidhilin';
export type Person = 'prathama' | 'madhyama' | 'uttama'; // 3rd, 2nd, 1st person
export type Pada = 'parasmaipada' | 'atmanepada';

export interface VerbRow {
  person: Person;
  personName: string;
  pronoun: string;
  singular: string;
  dual: string;
  plural: string;
}

export interface ConjugationTable {
  root: string;
  rootMeaning: string;
  gana: string;
  lakara: Lakara;
  lakaraName: string;
  pada: Pada;
  rows: VerbRow[];
}

export const LAKARA_META: Record<Lakara, { devanagari: string; english: string; description: string }> = {
  lat: { devanagari: 'लट्-लकार (Laṭ)', english: 'Present Tense', description: 'Actions occurring currently (e.g. पठति - reads)' },
  lrt: { devanagari: 'लृट्-लकार (Lṛṭ)', english: 'Simple Future', description: 'Actions that will happen (e.g. पठिष्यति - will read)' },
  lan: { devanagari: 'लङ्-लकार (Laṅ)', english: 'Past Tense (Imperfect)', description: 'Completed past actions (e.g. अपठत् - read)' },
  lot: { devanagari: 'लोट्-लकार (Loṭ)', english: 'Imperative / Command', description: 'Commands and requests (e.g. पठतु - let him read / read!)' },
  vidhilin: { devanagari: 'विधिलिङ्-लकार (Vidhiliṅ)', english: 'Potential / Optative', description: 'Advice, possibility, should (e.g. पठेत् - should read)' },
};

// Common verb paradigms
export const ROOT_DICTIONARY: Record<string, { meaning: string; presentStem: string; futureStem: string; gana: string }> = {
  'पठ्': { meaning: 'to read, to study', presentStem: 'पठ', futureStem: 'पठिष्य', gana: 'भ्वादिगण (1st Gana)' },
  'गम्': { meaning: 'to go', presentStem: 'गच्छ', futureStem: 'गमिष्य', gana: 'भ्वादिगण (1st Gana)' },
  'भू': { meaning: 'to be, to become', presentStem: 'भव', futureStem: 'भविष्य', gana: 'भ्वादिगण (1st Gana)' },
  'वद्': { meaning: 'to speak, to say', presentStem: 'वद', futureStem: 'वदिष्य', gana: 'भ्वादिगण (1st Gana)' },
  'लिख्': { meaning: 'to write', presentStem: 'लिख', futureStem: 'लेखिष्य', gana: 'तुदादिगण (6th Gana)' },
  'दृश्': { meaning: 'to see', presentStem: 'पश्य', futureStem: 'द्रक्ष्य', gana: 'भ्वादिगण (1st Gana)' },
  'दा': { meaning: 'to give', presentStem: 'यच्छ', futureStem: 'दास्य', gana: 'भ्वादिगण (1st Gana)' },
  'खाद्': { meaning: 'to eat', presentStem: 'खाद', futureStem: 'खादिष्य', gana: 'भ्वादिगण (1st Gana)' },
  'पा': { meaning: 'to drink', presentStem: 'पिब', futureStem: 'पास्य', gana: 'भ्वादिगण (1st Gana)' },
  'स्था': { meaning: 'to stand, to stay', presentStem: 'तिष्ठ', futureStem: 'स्थास्य', gana: 'भ्वादिगण (1st Gana)' },
};

/**
 * Returns conjugation table for a root and lakara
 */
export function getVerbTable(root: string, lakara: Lakara = 'lat'): ConjugationTable {
  const info = ROOT_DICTIONARY[root] || {
    meaning: 'generic verb',
    presentStem: root.replace(/्$/, 'अ'),
    futureStem: `${root}िष्य`,
    gana: '1st Gana'
  };

  const pStem = info.presentStem;
  const fStem = info.futureStem;
  const lMeta = LAKARA_META[lakara];

  let rows: VerbRow[] = [];

  switch (lakara) {
    case 'lat': // Present
      rows = [
        {
          person: 'prathama',
          personName: 'प्रथम पुरुष (3rd Person)',
          pronoun: 'सः / सा / तत् (He/She/It)',
          singular: `${pStem}ति`,
          dual: `${pStem}तः`,
          plural: `${pStem}न्ति`
        },
        {
          person: 'madhyama',
          personName: 'मध्यम पुरुष (2nd Person)',
          pronoun: 'त्वम् (You)',
          singular: `${pStem}सि`,
          dual: `${pStem}थः`,
          plural: `${pStem}थ`
        },
        {
          person: 'uttama',
          personName: 'उत्तम पुरुष (1st Person)',
          pronoun: 'अहम् (I)',
          singular: `${pStem}ामि`,
          dual: `${pStem}ावः`,
          plural: `${pStem}ामः`
        },
      ];
      break;

    case 'lrt': // Future
      rows = [
        {
          person: 'prathama',
          personName: 'प्रथम पुरुष (3rd Person)',
          pronoun: 'सः / सा / तत्',
          singular: `${fStem}ति`,
          dual: `${fStem}तः`,
          plural: `${fStem}न्ति`
        },
        {
          person: 'madhyama',
          personName: 'मध्यम पुरुष (2nd Person)',
          pronoun: 'त्वम्',
          singular: `${fStem}सि`,
          dual: `${fStem}थः`,
          plural: `${fStem}थ`
        },
        {
          person: 'uttama',
          personName: 'उत्तम पुरुष (1st Person)',
          pronoun: 'अहम्',
          singular: `${fStem}ामि`,
          dual: `${fStem}ावः`,
          plural: `${fStem}ामः`
        },
      ];
      break;

    case 'lan': // Past
      rows = [
        {
          person: 'prathama',
          personName: 'प्रथम पुरुष (3rd Person)',
          pronoun: 'सः / सा / तत्',
          singular: `अ${pStem}त्`,
          dual: `अ${pStem}ताम्`,
          plural: `अ${pStem}न्`
        },
        {
          person: 'madhyama',
          personName: 'मध्यम पुरुष (2nd Person)',
          pronoun: 'त्वम्',
          singular: `अ${pStem}ः`,
          dual: `अ${pStem}तम्`,
          plural: `अ${pStem}त`
        },
        {
          person: 'uttama',
          personName: 'उत्तम पुरुष (1st Person)',
          pronoun: 'अहम्',
          singular: `अ${pStem}म्`,
          dual: `अ${pStem}ाव`,
          plural: `अ${pStem}ाम`
        },
      ];
      break;

    case 'lot': // Imperative
      rows = [
        {
          person: 'prathama',
          personName: 'प्रथम पुरुष (3rd Person)',
          pronoun: 'सः (Let him)',
          singular: `${pStem}तु`,
          dual: `${pStem}ताम्`,
          plural: `${pStem}न्तु`
        },
        {
          person: 'madhyama',
          personName: 'मध्यम पुरुष (2nd Person)',
          pronoun: 'त्वम् (Do / Read!)',
          singular: `${pStem}`,
          dual: `${pStem}तम्`,
          plural: `${pStem}त`
        },
        {
          person: 'uttama',
          personName: 'उत्तम पुरुष (1st Person)',
          pronoun: 'अहम् (Let me)',
          singular: `${pStem}ानि`,
          dual: `${pStem}ाव`,
          plural: `${pStem}ाम`
        },
      ];
      break;

    case 'vidhilin': // Potential
      rows = [
        {
          person: 'prathama',
          personName: 'प्रथम पुरुष (3rd Person)',
          pronoun: 'सः (He should)',
          singular: `${pStem}ेत्`,
          dual: `${pStem}ेताम्`,
          plural: `${pStem}ेयुः`
        },
        {
          person: 'madhyama',
          personName: 'मध्यम पुरुष (2nd Person)',
          pronoun: 'त्वम् (You should)',
          singular: `${pStem}ेः`,
          dual: `${pStem}ेतम्`,
          plural: `${pStem}ेत`
        },
        {
          person: 'uttama',
          personName: 'उत्तम पुरुष (1st Person)',
          pronoun: 'अहम् (I should)',
          singular: `${pStem}ेयम्`,
          dual: `${pStem}ेव`,
          plural: `${pStem}ेम`
        },
      ];
      break;
  }

  return {
    root,
    rootMeaning: info.meaning,
    gana: info.gana,
    lakara,
    lakaraName: lMeta.devanagari,
    pada: 'parasmaipada',
    rows
  };
}

// Special case: अस् धातु (to be / अस्ति, स्तः, सन्ति)
export const AS_DHATU_TABLE: ConjugationTable = {
  root: 'अस् (to be)',
  rootMeaning: 'to exist, to be',
  gana: 'अदादिगण (2nd Gana)',
  lakara: 'lat',
  lakaraName: 'लट्-लकार (Present Tense)',
  pada: 'parasmaipada',
  rows: [
    { person: 'prathama', personName: 'प्रथम पुरुष (3rd)', pronoun: 'सः/सा/तत्', singular: 'अस्ति (is)', dual: 'स्तः (are two)', plural: 'सन्ति (are all)' },
    { person: 'madhyama', personName: 'मध्यम पुरुष (2nd)', pronoun: 'त्वम्', singular: 'असि (are)', dual: 'स्थः (are two)', plural: 'स्थ (are all)' },
    { person: 'uttama', personName: 'उत्तम पुरुष (1st)', pronoun: 'अहम्', singular: 'अस्मि (am)', dual: 'स्वः (are two)', plural: 'स्मः (are all)' },
  ]
};
