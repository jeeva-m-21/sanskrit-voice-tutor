/**
 * Sanskrit Curriculum & Graded Library Bank
 * Structured curriculum from Pre-A1 (Foundations) to B2 (Fluent Reader)
 */

export interface LessonUnit {
  id: string;
  stageNumber: number;
  stageTitle: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  description: string;
  levelBadge: 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2';
  grammarFocus: string[];
  vocabCount: number;
  unlocked: boolean;
  completed: boolean;
  dialoguePreview: {
    speaker: string;
    devanagari: string;
    iast: string;
    english: string;
  }[];
}

export interface LibraryText {
  id: string;
  title: string;
  category: 'shloka' | 'story' | 'subhashita';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  source: string;
  devanagariLines: string[];
  iastLines: string[];
  anvaya?: string; // Prose word-order for verses
  meter?: string; // Chandas (e.g. Anushtubh)
  wordByWord: {
    sanskrit: string;
    iast: string;
    meaning: string;
    role: string;
  }[];
  englishSummary: string;
}

export const CURRICULUM_STAGES: LessonUnit[] = [
  {
    id: 'stage0-unit1',
    stageNumber: 0,
    stageTitle: '0. Foundations (Pre-A1)',
    unitNumber: 1,
    title: 'वर्णमाला एवं उच्चारणम् (Varnamala & Sounds)',
    subtitle: 'Vowels, Consonants, Sthana and Prayatna',
    description: 'Master correct pronunciation of the 14 vowels (Svaras), 33 consonants (Vyanjanas), and sacred sounds like Visarga and Anusvara.',
    levelBadge: 'Pre-A1',
    grammarFocus: ['ह्रस्व-दीर्घ स्वराः', 'कण्ठ्य-तालव्य-मूर्धन्य वर्णाः', 'विसर्गः एवं अनुस्वारः'],
    vocabCount: 16,
    unlocked: true,
    completed: true,
    dialoguePreview: [
      { speaker: 'गुरुः', devanagari: 'ॐ नमो नारायणाय। अ, आ, इ, ई — उच्चारयतु।', iast: 'om namo nārāyaṇāya. a, ā, i, ī — uccārayatu.', english: 'Om. Pronounce: a, ā, i, ī.' },
      { speaker: 'छात्रः', devanagari: 'अ, आ, इ, ई।', iast: 'a, ā, i, ī.', english: 'a, ā, i, ī.' }
    ]
  },
  {
    id: 'stage1-unit1',
    stageNumber: 1,
    stageTitle: '1. Survival (A1)',
    unitNumber: 1,
    title: 'परिचयः एवं शिष्टाचारः (Introductions & Etiquette)',
    subtitle: 'Saying hello, asking names, and polite forms',
    description: 'Learn to introduce yourself, ask the names of others, exchange polite greetings, and use pronouns like "aham", "bhavān", and "bhavatī".',
    levelBadge: 'A1',
    grammarFocus: ['सर्वनाम (मम, भवतः, भवत्याः)', 'प्रथमा विभक्ति', 'अव्ययपदानि (कथम्, आम्, न)'],
    vocabCount: 24,
    unlocked: true,
    completed: false,
    dialoguePreview: [
      { speaker: 'गुरुः', devanagari: 'नमो नमः! भवतः नाम किम्?', iast: 'namo namaḥ! bhavataḥ nāma kim?', english: 'Salutations! What is your name?' },
      { speaker: 'छात्रः', devanagari: 'मम नाम आनन्दः अस्ति। भवत्याः नाम किम्?', iast: 'mama nāma ānandaḥ asti. bhavatyāḥ nāma kim?', english: 'My name is Ananda. What is your name?' }
    ]
  },
  {
    id: 'stage1-unit2',
    stageNumber: 1,
    stageTitle: '1. Survival (A1)',
    unitNumber: 2,
    title: 'दैनन्दिन-क्रियाः (Daily Verbs in Present Tense)',
    subtitle: 'Core verbs in Lat-Lakara (पठति, गच्छति, करोति)',
    description: 'Express what you and others are doing right now using 10 high-frequency verbs in the singular and plural present tense.',
    levelBadge: 'A1',
    grammarFocus: ['लट्-लकार (Present Tense)', 'प्रथम-उत्तम पुरुष (ति / मि)', 'पठ्, गम्, लिख्, खाद्'],
    vocabCount: 30,
    unlocked: false,
    completed: false,
    dialoguePreview: [
      { speaker: 'गुरुः', devanagari: 'भवान् किं करोति?', iast: 'bhavān kiṃ karoti?', english: 'What are you doing?' },
      { speaker: 'छात्रः', devanagari: 'अहं संस्कृतं पठामि।', iast: 'ahaṃ saṃskṛtaṃ paṭhāmi.', english: 'I am studying Sanskrit.' }
    ]
  },
  {
    id: 'stage2-unit1',
    stageNumber: 2,
    stageTitle: '2. Everyday (A2)',
    unitNumber: 1,
    title: 'विभक्तयः — कारकाणि (The 7 Cases in Context)',
    subtitle: 'Cases 1 to 7 with Ram, Phala, and Lata',
    description: 'Understand who did what, to whom, with what, where, and why using the 7 Vibhaktis in natural spoken conversations.',
    levelBadge: 'A2',
    grammarFocus: ['द्वितीया (कर्म)', 'तृतीया (करण)', 'सप्तमी (अधिकरण)', 'षष्ठी (सम्बन्ध)'],
    vocabCount: 45,
    unlocked: false,
    completed: false,
    dialoguePreview: [
      { speaker: 'गुरुः', devanagari: 'बालकः कुत्र गच्छति?', iast: 'bālakaḥ kutra gacchati?', english: 'Where is the boy going?' },
      { speaker: 'छात्रः', devanagari: 'बालकः मित्रैः सह विद्यालये पठितुं गच्छति।', iast: 'bālakaḥ mitraiḥ saha vidyālaye paṭhituṃ gacchati.', english: 'The boy is going to school with friends to study.' }
    ]
  },
  {
    id: 'stage3-unit1',
    stageNumber: 3,
    stageTitle: '3. Expressive (B1)',
    unitNumber: 1,
    title: 'कथा-कथनम् (Storytelling with Past & Future)',
    subtitle: 'Lan-Lakara, Kridanta (Ktva, Tumun)',
    description: 'Narrate past events, connect sentences with "having done" (-ktvā), and express desires and future plans.',
    levelBadge: 'B1',
    grammarFocus: ['लङ्-लकार (भूतकाल)', 'क्त्वा एवं तुमुन् प्रत्ययाः', 'उपसर्गाः'],
    vocabCount: 60,
    unlocked: false,
    completed: false,
    dialoguePreview: [
      { speaker: 'गुरुः', devanagari: 'ह्यः भवान् किं कृतवान्?', iast: 'hyaḥ bhavān kiṃ kṛtavān?', english: 'What did you do yesterday?' },
      { speaker: 'छात्रः', devanagari: 'अहं प्रातः उत्थाय पुस्तकं पठित्वा वनम् अगच्छम्।', iast: 'ahaṃ prātaḥ utthāya pustakaṃ paṭhitvā vanam agaccham.', english: 'Waking up in the morning and having read a book, I went to the forest.' }
    ]
  }
];

export const LIBRARY_TEXTS: LibraryText[] = [
  {
    id: 'gita-2-47',
    title: 'कर्मण्येवाधिकारस्ते (Gita 2.47)',
    category: 'shloka',
    difficulty: 'Beginner',
    source: 'श्रीमद्भगवद्गीता (अध्याय २, श्लोक ४७)',
    devanagariLines: [
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
      'मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥'
    ],
    iastLines: [
      'karmaṇy-evādhikāras-te mā phaleṣu kadācana |',
      'mā karma-phala-hetur-bhūr-mā te saṅgo\'stv-akarmaṇi ||'
    ],
    anvaya: 'ते अधिकारः कर्मणि एव (अस्ति), फलेषु कदाचन मा (अस्तु)। त्वं कर्मफलहेतुः मा भूः, अकर्मणि ते सङ्गः मा अस्तु।',
    meter: 'अनुष्टुप् छन्दः (Anuṣṭubh - 8 syllables per quarter)',
    englishSummary: 'You have a right only to work, never to its fruits; let not the fruits of action be your motive, nor let your attachment be to inaction.',
    wordByWord: [
      { sanskrit: 'कर्मणि', iast: 'karmaṇi', meaning: 'in action / in duty', role: 'सप्तमी एकवचन (Locative)' },
      { sanskrit: 'एव', iast: 'eva', meaning: 'only / alone', role: 'अव्यय (Indeclinable emphasis)' },
      { sanskrit: 'अधिकारः', iast: 'adhikāraḥ', meaning: 'right / prerogative', role: 'प्रथमा एकवचन (Nominative)' },
      { sanskrit: 'ते', iast: 'te', meaning: 'your / to you', role: 'षष्ठी/चतुर्थी एकवचन' },
      { sanskrit: 'मा', iast: 'mā', meaning: 'not / never', role: 'निषेधार्थक अव्यय' },
      { sanskrit: 'फलेषु', iast: 'phaleṣu', meaning: 'in fruits / in results', role: 'सप्तमी बहुवचन (Locative plural)' },
      { sanskrit: 'कदाचन', iast: 'kadācana', meaning: 'at any time / ever', role: 'अव्यय' },
      { sanskrit: 'अकर्मणि', iast: 'akarmaṇi', meaning: 'in inaction / laziness', role: 'सप्तमी एकवचन (Locative)' },
    ]
  },
  {
    id: 'subhashita-vidya',
    title: 'विद्या ददाति विनयम् (Subhashita on Learning)',
    category: 'subhashita',
    difficulty: 'Beginner',
    source: 'हितोपदेशः (Hitopadesha)',
    devanagariLines: [
      'विद्या ददाति विनयं विनयाद्याति पात्रताम्।',
      'पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥'
    ],
    iastLines: [
      'vidyā dadāti vinayaṃ vinayād-yāti pātratām |',
      'pātratvād-dhanam-āpnoti dhanād-dharmaṃ tataḥ sukham ||'
    ],
    anvaya: 'विद्या विनयं ददाति, विनयात् पात्रतां याति, पात्रत्वात् धनम् आप्नोति, धनात् धर्मं, ततः सुखं (भवति)।',
    meter: 'अनुष्टुप् छन्दः (Anuṣṭubh)',
    englishSummary: 'Knowledge bestows humility; from humility one attains worthiness; from worthiness one acquires wealth; with wealth one performs righteous duty, and from that comes lasting joy.',
    wordByWord: [
      { sanskrit: 'विद्या', iast: 'vidyā', meaning: 'Knowledge / True learning', role: 'प्रथमा एकवचन (Subject)' },
      { sanskrit: 'ददाति', iast: 'dadāti', meaning: 'gives / bestows', role: 'लट् लकार प्रथम पुरुष' },
      { sanskrit: 'विनयम्', iast: 'vinayam', meaning: 'humility / discipline', role: 'द्वितीया एकवचन (Object)' },
      { sanskrit: 'पात्रताम्', iast: 'pātratām', meaning: 'worthiness / capacity', role: 'द्वितीया एकवचन' },
      { sanskrit: 'धनम्', iast: 'dhanam', meaning: 'wealth / resources', role: 'द्वितीया एकवचन' },
      { sanskrit: 'सुखम्', iast: 'sukham', meaning: 'true happiness', role: 'प्रथमा एकवचन' }
    ]
  },
  {
    id: 'panchatantra-story',
    title: 'सिंह-शशक-कथा (The Lion and the Wise Hare)',
    category: 'story',
    difficulty: 'Intermediate',
    source: 'पञ्चतन्त्रम् (मित्रभेदः)',
    devanagariLines: [
      'एकस्मिन् वने भासुरकः नाम महाबलवान् सिंहः प्रतिवसति स्म।',
      'सः नित्यम् अनेक-मृगान् व्यापादयति स्म।',
      'एकदा शशकस्य वारः समागतः। बुद्धिमान् शशकः मन्दं मन्दं अगच्छत्।',
      'शशकः सिंहम् एकस्य कूपस्य समीपं अनयत्। सिंहः कूपे स्वप्रतिबिम्बं दृष्ट्वा कूर्दनम् अकरोत्।'
    ],
    iastLines: [
      'ekasmin vane bhāsurakaḥ nāma mahābalavān siṃhaḥ prativasati sma |',
      'saḥ nityam aneka-mṛgān vyāpādayati sma |',
      'ekadā śaśakasya vāraḥ samāgataḥ | buddhimān śaśakaḥ mandaṃ mandaṃ agacchata |',
      'śaśakaḥ siṃham ekasya kūpasya samīpaṃ anayat | siṃhaḥ kūpe sva-pratibimbaṃ dṛṣṭvā kūrdanam akarot ||'
    ],
    englishSummary: 'In a forest lived a ferocious lion named Bhasuraka who preyed on all animals daily. When it was the wise hare\'s turn, he walked deliberately slowly, led the lion to a deep well, and the lion, seeing his own reflection, leaped in and perished.',
    wordByWord: [
      { sanskrit: 'एकस्मिन् वने', iast: 'ekasmin vane', meaning: 'in a certain forest', role: 'सप्तमी एकवचन (Locative)' },
      { sanskrit: 'सिंहः', iast: 'siṃhaḥ', meaning: 'lion', role: 'प्रथमा एकवचन (Subject)' },
      { sanskrit: 'बुद्धिमान् शशकः', iast: 'buddhimān śaśakaḥ', meaning: 'wise hare', role: 'विशेषण + विशेष्य' },
      { sanskrit: 'दृष्ट्वा', iast: 'dṛṣṭvā', meaning: 'having seen', role: 'क्त्वा-प्रत्यय (Gerund)' },
      { sanskrit: 'कूपे', iast: 'kūpe', meaning: 'into the well', role: 'सप्तमी एकवचन' }
    ]
  }
];
