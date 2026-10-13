'use client';

import React, { useState } from 'react';
import { joinSandhi, splitSandhi } from '@/lib/sanskrit/sandhi';
import { getDeclensionTable, PRONOUN_TABLES, Gender } from '@/lib/sanskrit/vibhakti';
import { getVerbTable, Lakara, ROOT_DICTIONARY, LAKARA_META } from '@/lib/sanskrit/dhatu';
import { BookOpen, Sparkles, Split, Table } from 'lucide-react';

export const GrammarToolsView: React.FC = () => {
  const [toolMode, setToolMode] = useState<'sandhi' | 'vibhakti' | 'dhatu'>('sandhi');

  // Sandhi State
  const [word1, setWord1] = useState('रामः');
  const [word2, setWord2] = useState('गच्छति');
  const [splitInput, setSplitInput] = useState('सूर्योदयः');

  // Vibhakti State
  const [selectedStem, setSelectedStem] = useState('राम');
  const [selectedGender, setSelectedGender] = useState<Gender>('masculine');

  // Dhatu State
  const [selectedRoot, setSelectedRoot] = useState('पठ्');
  const [selectedLakara, setSelectedLakara] = useState<Lakara>('lat');

  const sandhiJoin = joinSandhi(word1, word2);
  const sandhiSplits = splitSandhi(splitInput);

  const declensionTable = getDeclensionTable(selectedStem, selectedGender);
  const verbTable = getVerbTable(selectedRoot, selectedLakara);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-serif text-amber-300 flex items-center gap-2">
          <span>व्याकरण-यन्त्राणि (Deterministic Grammar Engine)</span>
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Rule-based Paninian generators for Sandhi, Subanta (cases), and Tinganta (verbs) with zero LLM hallucination.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex gap-2 border-b border-stone-800 pb-3">
        <button
          onClick={() => setToolMode('sandhi')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
            toolMode === 'sandhi'
              ? 'bg-amber-600 text-stone-950 border-amber-500'
              : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
          }`}
        >
          सन्धि-संयोजकः / विच्छेदः (Sandhi)
        </button>
        <button
          onClick={() => setToolMode('vibhakti')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
            toolMode === 'vibhakti'
              ? 'bg-amber-600 text-stone-950 border-amber-500'
              : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
          }`}
        >
          सुबन्तरूपाणि (Noun Declension)
        </button>
        <button
          onClick={() => setToolMode('dhatu')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
            toolMode === 'dhatu'
              ? 'bg-amber-600 text-stone-950 border-amber-500'
              : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
          }`}
        >
          तिङन्तरूपाणि (Verb Conjugation)
        </button>
      </div>

      {/* Mode 1: Sandhi Tool */}
      {toolMode === 'sandhi' && (
        <div className="space-y-6">
          {/* Joiner */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-serif text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>सन्धि-संयोजनम् (Sandhi Combiner)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-stone-400 mb-1 block">पूर्वपदम् (First Word):</label>
                <input
                  type="text"
                  value={word1}
                  onChange={(e) => setWord1(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-serif text-lg focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-stone-400 mb-1 block">उत्तरपदम् (Second Word):</label>
                <input
                  type="text"
                  value={word2}
                  onChange={(e) => setWord2(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-serif text-lg focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Result */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 text-center space-y-1">
              <span className="text-[11px] font-semibold uppercase text-stone-400 block">संयुक्तपदम् (Combined Result)</span>
              <p className="text-2xl sm:text-3xl font-serif text-amber-200 font-bold">{sandhiJoin.combined}</p>
              <p className="text-xs text-amber-400 font-medium">{sandhiJoin.ruleName}</p>
              {sandhiJoin.sutra && <p className="text-[11px] font-mono text-stone-400">सूत्रम्: {sandhiJoin.sutra}</p>}
              <p className="text-xs text-stone-300 pt-1 italic">{sandhiJoin.explanation}</p>
            </div>
          </div>

          {/* Splitter */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-serif text-amber-300 flex items-center gap-2">
              <Split className="w-4 h-4" />
              <span>सन्धि-विच्छेदः (Sandhi Splitter)</span>
            </h3>

            <div>
              <label className="text-xs text-stone-400 mb-1 block">समस्तपदम् (Compound Word):</label>
              <input
                type="text"
                value={splitInput}
                onChange={(e) => setSplitInput(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-serif text-lg focus:border-amber-500 outline-none"
              />
            </div>

            {sandhiSplits.length > 0 ? (
              <div className="space-y-2">
                {sandhiSplits.map((res, idx) => (
                  <div key={idx} className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-serif text-amber-200">
                        {res.word1} + {res.word2}
                      </p>
                      <p className="text-xs text-stone-400">{res.explanation}</p>
                    </div>
                    <span className="text-xs text-amber-400 font-medium px-2 py-1 bg-amber-500/10 rounded-md border border-amber-500/30">
                      {res.ruleName}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 italic">No direct vowel split pattern identified for this input.</p>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: Vibhakti Generator */}
      {toolMode === 'vibhakti' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-amber-200">
                {declensionTable.title}
              </h3>
              <p className="text-xs text-stone-400">{declensionTable.ending}</p>
            </div>

            <div className="flex gap-2">
              {(['masculine', 'feminine', 'neuter'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setSelectedGender(g);
                    setSelectedStem(g === 'masculine' ? 'राम' : g === 'feminine' ? 'लता' : 'फल');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize border transition ${
                    selectedGender === g
                      ? 'bg-amber-600 text-stone-950 border-amber-500'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-800 text-amber-400 font-semibold">
                  <th className="py-2.5 px-3">विभक्तिः (Case)</th>
                  <th className="py-2.5 px-3">एकवचनम् (Singular)</th>
                  <th className="py-2.5 px-3">द्विवचनम् (Dual)</th>
                  <th className="py-2.5 px-3">बहुवचनम् (Plural)</th>
                  <th className="py-2.5 px-3 text-stone-400">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-serif">
                {declensionTable.rows.map((row) => (
                  <tr key={row.caseNumber} className="hover:bg-stone-800/40 transition">
                    <td className="py-2.5 px-3 font-sans font-semibold text-stone-300">{row.caseName}</td>
                    <td className="py-2.5 px-3 text-amber-200 text-base">{row.singular}</td>
                    <td className="py-2.5 px-3 text-stone-300 text-base">{row.dual}</td>
                    <td className="py-2.5 px-3 text-stone-300 text-base">{row.plural}</td>
                    <td className="py-2.5 px-3 font-sans text-xs text-stone-400">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mode 3: Dhatu Conjugation Table */}
      {toolMode === 'dhatu' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-amber-200">
                {verbTable.root} ({verbTable.rootMeaning})
              </h3>
              <p className="text-xs text-stone-400">
                {verbTable.gana} • {verbTable.lakaraName}
              </p>
            </div>

            {/* Root Selector */}
            <div className="flex gap-2">
              {Object.keys(ROOT_DICTIONARY).slice(0, 5).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRoot(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-serif border transition ${
                    selectedRoot === r
                      ? 'bg-amber-600 text-stone-950 border-amber-500'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Lakara Selector */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(Object.keys(LAKARA_META) as Lakara[]).map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLakara(l)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition ${
                  selectedLakara === l
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-stone-800 text-stone-400 border-stone-700'
                }`}
              >
                {LAKARA_META[l].devanagari}
              </button>
            ))}
          </div>

          {/* Conjugation Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-800 text-amber-400 font-semibold">
                  <th className="py-2.5 px-3">पुरुषः (Person)</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">एकवचनम् (Singular)</th>
                  <th className="py-2.5 px-3">द्विवचनम् (Dual)</th>
                  <th className="py-2.5 px-3">बहुवचनम् (Plural)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-serif">
                {verbTable.rows.map((row) => (
                  <tr key={row.person} className="hover:bg-stone-800/40 transition">
                    <td className="py-2.5 px-3 font-sans font-semibold text-stone-300">{row.personName}</td>
                    <td className="py-2.5 px-3 font-sans text-xs text-stone-400">{row.pronoun}</td>
                    <td className="py-2.5 px-3 text-amber-200 text-base">{row.singular}</td>
                    <td className="py-2.5 px-3 text-stone-300 text-base">{row.dual}</td>
                    <td className="py-2.5 px-3 text-stone-300 text-base">{row.plural}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
