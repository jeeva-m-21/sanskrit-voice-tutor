/**
 * Sanskrit Grammar Test Suite
 * Validates transliteration, sandhi joining/splitting, vibhakti noun declension, and dhatu conjugations.
 */

import { devanagariToIast, iastToDevanagari } from './transliterate';
import { joinSandhi, splitSandhi } from './sandhi';
import { getDeclensionTable } from './vibhakti';
import { getVerbTable } from './dhatu';
import { tokenizeAndGloss } from './glossary';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('--- 1. Testing Transliteration ---');
const deva1 = 'संस्कृतम्';
const iast1 = devanagariToIast(deva1);
console.log(`${deva1} -> IAST: ${iast1}`);
assert(iast1 === 'saṃskṛtam', `Expected saṃskṛtam, got ${iast1}`);

const iast2 = 'namo namaḥ';
const deva2 = iastToDevanagari(iast2);
console.log(`${iast2} -> Devanagari: ${deva2}`);
assert(deva2 === 'नमो नमः', `Expected नमो नमः, got ${deva2}`);

console.log('--- 2. Testing Sandhi Engine ---');
const join1 = joinSandhi('रामः', 'गच्छति');
console.log(`रामः + गच्छति = ${join1.combined} (${join1.ruleName})`);

const join2 = joinSandhi('हिम', 'आलयः');
console.log(`हिम + आलयः = ${join2.combined} (${join2.ruleName})`);
assert(join2.combined === 'हिमालयः', `Expected हिमालयः, got ${join2.combined}`);

const join3 = joinSandhi('नर', 'इन्द्रः');
console.log(`नर + इन्द्रः = ${join3.combined} (${join3.ruleName})`);
assert(join3.combined === 'नरेन्द्रः', `Expected नरेन्द्रः, got ${join3.combined}`);

const join4 = joinSandhi('ते', 'अपि');
console.log(`ते + अपि = ${join4.combined} (${join4.ruleName})`);
assert(join4.combined === "तेऽपि", `Expected तेऽपि, got ${join4.combined}`);

const splits = splitSandhi('सूर्योदयः');
console.log('Split सूर्योदयः:', splits.map(s => `${s.word1} + ${s.word2}`));
assert(splits.length > 0, 'Expected split results for सूर्योदयः');

console.log('--- 3. Testing Vibhakti Subanta Table ---');
const ramaTable = getDeclensionTable('राम', 'masculine');
assert(ramaTable.rows.length === 8, 'Expected 8 case rows');
assert(ramaTable.rows[0].singular === 'रामः', 'Expected Prathama Ekavacana to be रामः');
assert(ramaTable.rows[1].singular === 'रामम्', 'Expected Dvitiya Ekavacana to be रामम्');
assert(ramaTable.rows[5].singular === 'रामस्य', 'Expected Shasthi Ekavacana to be रामस्य');
console.log('Rama Shasthi Singular:', ramaTable.rows[5].singular);

console.log('--- 4. Testing Dhatu Tinganta Table ---');
const pathTable = getVerbTable('पठ्', 'lat');
assert(pathTable.rows.length === 3, 'Expected 3 purusha rows');
assert(pathTable.rows[0].singular === 'पठति', 'Expected Prathama to be पठति');
assert(pathTable.rows[1].singular === 'पठसि', 'Expected Madhyama to be पठसि');
assert(pathTable.rows[2].singular === 'पठामि', 'Expected Uttama to be पठामि');
console.log('Path Lat 1st person singular:', pathTable.rows[2].singular);

console.log('--- 5. Testing Tokenizer & Gloss ---');
const tokens = tokenizeAndGloss('नमो नमः! अहम् संस्कृतं पठामि।');
console.log('Tokens found:', tokens.map(t => `${t.word} (${t.meaning})`));
assert(tokens.length >= 4, 'Expected at least 4 tokens');
assert(tokens[0].cleanWord === 'नमः', 'Expected first word to map to root नमः');

console.log('\n✅ ALL SANSKRIT GRAMMAR ENGINE TESTS PASSED SUCCESSFULLY!');
