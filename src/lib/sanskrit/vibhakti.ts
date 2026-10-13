/**
 * Sanskrit Subanta (Noun Declension / Vibhakti) Generator
 * Computes case forms for classical nominal stems.
 */

export type Gender = 'masculine' | 'feminine' | 'neuter';
export type CaseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // 8 is Sambodhana (Vocative)

export interface DeclensionCell {
  form: string;
  transliteration: string;
  caseName: string;
  caseNumber: CaseNumber;
  number: 'singular' | 'dual' | 'plural';
}

export interface DeclensionTable {
  stem: string;
  gender: Gender;
  ending: string;
  title: string;
  rows: {
    caseName: string;
    caseNumber: CaseNumber;
    singular: string;
    dual: string;
    plural: string;
    meaning: string;
  }[];
}

// Case names in Sanskrit and grammatical roles
export const CASE_META: Record<CaseNumber, { name: string; role: string; english: string }> = {
  1: { name: 'प्रथमा (Prathamā)', role: 'Subject (कर्ता / Karta)', english: 'Nominative' },
  2: { name: 'द्वितीया (Dvitīyā)', role: 'Direct Object (कर्म / Karma)', english: 'Accusative' },
  3: { name: 'तृतीया (Tṛtīyā)', role: 'Instrument / By / With (करण / Karana)', english: 'Instrumental' },
  4: { name: 'चतुर्थी (Caturthī)', role: 'For / To (सम्प्रदान / Sampradana)', english: 'Dative' },
  5: { name: 'पञ्चमी (Pañcamī)', role: 'From / Away from (अपादान / Apadana)', english: 'Ablative' },
  6: { name: 'षष्ठी (Ṣaṣṭhī)', role: 'Of / Belonging to (सम्बन्ध / Sambandha)', english: 'Genitive' },
  7: { name: 'सप्तमी (Saptamī)', role: 'In / On / At (अधिकरण / Adhikarana)', english: 'Locative' },
  8: { name: 'सम्बोधन (Sambodhana)', role: 'Addressing / O! (सम्बोधन)', english: 'Vocative' },
};

// Declension paradigms for common types
export function getDeclensionTable(stem: string, gender: Gender = 'masculine'): DeclensionTable {
  // Normalize stem (strip virama/halanta if any)
  const cleanStem = stem.trim().replace(/ः$/, '');

  // 1. Akārānta Pulliṅga (e.g. राम, बालक, नर)
  if (gender === 'masculine') {
    return {
      stem: cleanStem,
      gender: 'masculine',
      ending: 'अ-कारान्त पुंल्लिङ्ग (Masculine ending in a)',
      title: `${cleanStem} (अ-कारान्तः पुंल्लिङ्गः)`,
      rows: [
        { caseName: 'प्रथमा (Nominative)', caseNumber: 1, singular: `${cleanStem}ः`, dual: `${cleanStem}ौ`, plural: `${cleanStem}ाः`, meaning: 'Subject' },
        { caseName: 'द्वितीया (Accusative)', caseNumber: 2, singular: `${cleanStem}म्`, dual: `${cleanStem}ौ`, plural: `${cleanStem}ान्`, meaning: 'Object' },
        { caseName: 'तृतीया (Instrumental)', caseNumber: 3, singular: `${cleanStem}ेन`, dual: `${cleanStem}ाभ्याम्`, plural: `${cleanStem}ैः`, meaning: 'With / By' },
        { caseName: 'चतुर्थी (Dative)', caseNumber: 4, singular: `${cleanStem}ाय`, dual: `${cleanStem}ाभ्याम्`, plural: `${cleanStem}ेभ्यः`, meaning: 'For / To' },
        { caseName: 'पञ्चमी (Ablative)', caseNumber: 5, singular: `${cleanStem}ात्`, dual: `${cleanStem}ाभ्याम्`, plural: `${cleanStem}ेभ्यः`, meaning: 'From' },
        { caseName: 'षष्ठी (Genitive)', caseNumber: 6, singular: `${cleanStem}स्य`, dual: `${cleanStem}योः`, plural: `${cleanStem}ानाम्`, meaning: 'Of' },
        { caseName: 'सप्तमी (Locative)', caseNumber: 7, singular: `${cleanStem}े`, dual: `${cleanStem}योः`, plural: `${cleanStem}ेषु`, meaning: 'In / On' },
        { caseName: 'सम्बोधन (Vocative)', caseNumber: 8, singular: `हे ${cleanStem}!`, dual: `हे ${cleanStem}ौ!`, plural: `हे ${cleanStem}ाः!`, meaning: 'O ...!' },
      ]
    };
  }

  // 2. Ākārānta Strīliṅga (e.g. लता, बालिका, माला)
  if (gender === 'feminine') {
    const base = cleanStem.endsWith('ा') ? cleanStem.slice(0, -1) : cleanStem;
    return {
      stem: cleanStem,
      gender: 'feminine',
      ending: 'आ-कारान्त स्त्रीलिङ्ग (Feminine ending in ā)',
      title: `${cleanStem} (आ-कारान्तः स्त्रीलिङ्गः)`,
      rows: [
        { caseName: 'प्रथमा (Nominative)', caseNumber: 1, singular: `${base}ा`, dual: `${base}े`, plural: `${base}ाः`, meaning: 'Subject' },
        { caseName: 'द्वितीया (Accusative)', caseNumber: 2, singular: `${base}ाम्`, dual: `${base}े`, plural: `${base}ाः`, meaning: 'Object' },
        { caseName: 'तृतीया (Instrumental)', caseNumber: 3, singular: `${base}या`, dual: `${base}ाभ्याम्`, plural: `${base}ाभिः`, meaning: 'With / By' },
        { caseName: 'चतुर्थी (Dative)', caseNumber: 4, singular: `${base}ायै`, dual: `${base}ाभ्याम्`, plural: `${base}ाभ्यः`, meaning: 'For / To' },
        { caseName: 'पञ्चमी (Ablative)', caseNumber: 5, singular: `${base}ायाः`, dual: `${base}ाभ्याम्`, plural: `${base}ाभ्यः`, meaning: 'From' },
        { caseName: 'षष्ठी (Genitive)', caseNumber: 6, singular: `${base}ायाः`, dual: `${base}योः`, plural: `${base}ानाम्`, meaning: 'Of' },
        { caseName: 'सप्तमी (Locative)', caseNumber: 7, singular: `${base}ायाम्`, dual: `${base}योः`, plural: `${base}ासु`, meaning: 'In / On' },
        { caseName: 'सम्बोधन (Vocative)', caseNumber: 8, singular: `हे ${base}े!`, dual: `हे ${base}े!`, plural: `हे ${base}ाः!`, meaning: 'O ...!' },
      ]
    };
  }

  // 3. Akārānta Napuṃsakaliṅga (e.g. फल, वन, पुस्तक)
  return {
    stem: cleanStem,
    gender: 'neuter',
    ending: 'अ-कारान्त नपुंसकलिङ्ग (Neuter ending in a)',
    title: `${cleanStem} (अ-कारान्तः नपुंसकलिङ्गः)`,
    rows: [
      { caseName: 'प्रथमा (Nominative)', caseNumber: 1, singular: `${cleanStem}म्`, dual: `${cleanStem}े`, plural: `${cleanStem}ानि`, meaning: 'Subject' },
      { caseName: 'द्वितीया (Accusative)', caseNumber: 2, singular: `${cleanStem}म्`, dual: `${cleanStem}े`, plural: `${cleanStem}ानि`, meaning: 'Object' },
      { caseName: 'तृतीया (Instrumental)', caseNumber: 3, singular: `${cleanStem}ेन`, dual: `${cleanStem}ाभ्याम्`, plural: `${cleanStem}ैः`, meaning: 'With / By' },
      { caseName: 'चतुर्थी (Dative)', caseNumber: 4, singular: `${cleanStem}ाय`, dual: `${cleanStem}ाभ्याम्`, plural: `${cleanStem}ेभ्यः`, meaning: 'For / To' },
      { caseName: 'पञ्चमी (Ablative)', caseNumber: 5, singular: `${cleanStem}ात्`, dual: `${cleanStem}ाभ्याम्`, plural: `${cleanStem}ेभ्यः`, meaning: 'From' },
      { caseName: 'षष्ठी (Genitive)', caseNumber: 6, singular: `${cleanStem}स्य`, dual: `${cleanStem}योः`, plural: `${cleanStem}ानाम्`, meaning: 'Of' },
      { caseName: 'सप्तमी (Locative)', caseNumber: 7, singular: `${cleanStem}े`, dual: `${cleanStem}योः`, plural: `${cleanStem}ेषु`, meaning: 'In / On' },
      { caseName: 'सम्बोधन (Vocative)', caseNumber: 8, singular: `हे ${cleanStem}!`, dual: `हे ${cleanStem}े!`, plural: `हे ${cleanStem}ानि!`, meaning: 'O ...!' },
    ]
  };
}

// Common Pronoun declension data
export const PRONOUN_TABLES: Record<string, DeclensionTable> = {
  'अस्मद् (I / We)': {
    stem: 'अस्मद्',
    gender: 'masculine',
    ending: 'सर्वनाम (First Person Pronoun)',
    title: 'अस्मद् (I, We Two, We All)',
    rows: [
      { caseName: 'प्रथमा (Nominative)', caseNumber: 1, singular: 'अहम् (I)', dual: 'आवाम् (We two)', plural: 'वयम् (We all)', meaning: 'Subject' },
      { caseName: 'द्वितीया (Accusative)', caseNumber: 2, singular: 'माम् / मा', dual: 'आवाम् / नौ', plural: 'अस्मान् / नः', meaning: 'Me / Us' },
      { caseName: 'तृतीया (Instrumental)', caseNumber: 3, singular: 'मया', dual: 'आवाभ्याम्', plural: 'अस्माभिः', meaning: 'By/With me' },
      { caseName: 'चतुर्थी (Dative)', caseNumber: 4, singular: 'मह्यम् / मे', dual: 'आवाभ्याम् / नौ', plural: 'अस्मभ्यम् / नः', meaning: 'For me' },
      { caseName: 'पञ्चमी (Ablative)', caseNumber: 5, singular: 'मत्', dual: 'आवाभ्याम्', plural: 'अस्मत्', meaning: 'From me' },
      { caseName: 'षष्ठी (Genitive)', caseNumber: 6, singular: 'मम / मे (My/Mine)', dual: 'आवयोः / नौ', plural: 'अस्माकम् / नः (Our)', meaning: 'My / Our' },
      { caseName: 'सप्तमी (Locative)', caseNumber: 7, singular: 'मयि', dual: 'आवयोः', plural: 'अस्मासु', meaning: 'In me' },
      { caseName: 'सम्बोधन (Vocative)', caseNumber: 8, singular: '-', dual: '-', plural: '-', meaning: 'None' },
    ]
  },
  'युष्मद् (You)': {
    stem: 'युष्मद्',
    gender: 'masculine',
    ending: 'सर्वनाम (Second Person Pronoun)',
    title: 'युष्मद् (You, You Two, You All)',
    rows: [
      { caseName: 'प्रथमा (Nominative)', caseNumber: 1, singular: 'त्वम् (You)', dual: 'युवाम् (You two)', plural: 'यूयम् (You all)', meaning: 'Subject' },
      { caseName: 'द्वितीया (Accusative)', caseNumber: 2, singular: 'त्वाम् / त्वा', dual: 'युवाम् / वाम्', plural: 'युष्मान् / वः', meaning: 'You' },
      { caseName: 'तृतीया (Instrumental)', caseNumber: 3, singular: 'त्वया', dual: 'युवाभ्याम्', plural: 'युष्माभिः', meaning: 'By/With you' },
      { caseName: 'चतुर्थी (Dative)', caseNumber: 4, singular: 'तुभ्यम् / ते', dual: 'युवाभ्याम् / वाम्', plural: 'युष्मभ्यम् / वः', meaning: 'For you' },
      { caseName: 'पञ्चमी (Ablative)', caseNumber: 5, singular: 'त्वत्', dual: 'युवाभ्याम्', plural: 'युष्मत्', meaning: 'From you' },
      { caseName: 'षष्ठी (Genitive)', caseNumber: 6, singular: 'तव / ते (Your)', dual: 'युवयोः / वाम्', plural: 'युष्माकम् / वः (Your)', meaning: 'Your' },
      { caseName: 'सप्तमी (Locative)', caseNumber: 7, singular: 'त्वयि', dual: 'युवयोः', plural: 'युष्मासु', meaning: 'In you' },
      { caseName: 'सम्बोधन (Vocative)', caseNumber: 8, singular: '-', dual: '-', plural: '-', meaning: 'None' },
    ]
  }
};
