/**
 * Spaced Repetition System (SRS) Engine
 * Implements an optimized SM-2 / FSRS memory interval algorithm for Sanskrit vocabulary and grammar.
 */

export type Rating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SRSCard {
  id: string;
  front: string; // Devanagari word or prompt
  back: string; // Meaning / Translation / Form
  iast?: string;
  cardType: 'vocab' | 'vibhakti' | 'dhatu' | 'audio_recall' | 'dictation';
  grammarMeta?: string;
  intervalDays: number;
  easeFactor: number; // Defaults to 2.5
  reps: number;
  lapses: number;
  dueDate: string; // ISO string
  createdAt: string;
}

export interface ReviewResult {
  updatedCard: SRSCard;
  nextIntervalText: string;
}

/**
 * Calculates next review interval using SuperMemo SM-2 with modifications
 */
export function processReview(card: SRSCard, rating: Rating): ReviewResult {
  let { intervalDays, easeFactor, reps, lapses } = card;

  if (rating === 1) {
    // Again: Card failed / forgotten
    reps = 0;
    intervalDays = 1; // Repeat tomorrow
    lapses += 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    // Correct recall (Hard, Good, Easy)
    if (reps === 0) {
      intervalDays = 1;
    } else if (reps === 1) {
      intervalDays = rating === 2 ? 2 : (rating === 3 ? 3 : 5);
    } else {
      let bonusMultiplier = 1.0;
      if (rating === 2) {
        bonusMultiplier = 0.8;
        easeFactor = Math.max(1.3, easeFactor - 0.15);
      } else if (rating === 4) {
        bonusMultiplier = 1.3;
        easeFactor = Math.min(3.0, easeFactor + 0.15);
      }
      intervalDays = Math.round(intervalDays * easeFactor * bonusMultiplier);
    }
    reps += 1;
  }

  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + intervalDays);

  const updatedCard: SRSCard = {
    ...card,
    intervalDays,
    easeFactor,
    reps,
    lapses,
    dueDate: nextDue.toISOString(),
  };

  const nextIntervalText = intervalDays === 1 ? 'Tomorrow' : `in ${intervalDays} days`;

  return { updatedCard, nextIntervalText };
}

/**
 * Default starter deck based on Stage 0 and Stage 1 curriculum
 */
export const DEFAULT_DECK: SRSCard[] = [
  {
    id: 'card-1',
    front: 'नमो नमः',
    back: 'Greetings / Salutations',
    iast: 'namo namaḥ',
    cardType: 'vocab',
    grammarMeta: 'अव्यय (Traditional Sanskrit greeting)',
    intervalDays: 1,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'card-2',
    front: 'मम नाम',
    back: 'My name is...',
    iast: 'mama nāma',
    cardType: 'vocab',
    grammarMeta: 'षष्ठी विभक्ति (मम) + प्रथमा (नाम)',
    intervalDays: 1,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'card-3',
    front: 'भवतः नाम किम्?',
    back: 'What is your name? (asking a male)',
    iast: 'bhavataḥ nāma kim?',
    cardType: 'vocab',
    grammarMeta: 'भवतः = षष्ठी एकवचन (पुंल्लिङ्ग)',
    intervalDays: 1,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'card-4',
    front: 'अहम् पठामि',
    back: 'I read / I study',
    iast: 'aham paṭhāmi',
    cardType: 'dhatu',
    grammarMeta: 'पठ् धातु | लट् लकार | उत्तम पुरुष एकवचन',
    intervalDays: 1,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'card-5',
    front: 'सः गच्छति',
    back: 'He goes',
    iast: 'saḥ gacchati',
    cardType: 'dhatu',
    grammarMeta: 'गम् धातु | लट् लकार | प्रथम पुरुष एकवचन',
    intervalDays: 1,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'card-6',
    front: 'रामस्य',
    back: 'Of Rama / Rama\'s',
    iast: 'rāmasya',
    cardType: 'vibhakti',
    grammarMeta: 'राम शब्द | षष्ठी विभक्ति (Genitive) | एकवचन',
    intervalDays: 1,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'card-7',
    front: 'वने',
    back: 'In the forest',
    iast: 'vane',
    cardType: 'vibhakti',
    grammarMeta: 'वन शब्द (नपुंसकलिङ्ग) | सप्तमी विभक्ति (Locative) | एकवचन',
    intervalDays: 1,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];
