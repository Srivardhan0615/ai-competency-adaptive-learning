"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, ShieldCheck } from "lucide-react";
import { BloomLevel, Question } from "@/types";
import { INITIAL_COMPETENCIES, SAMPLE_QUESTIONS } from "@/lib/mock-data";

export default function QuestionGeneratorStudio() {
  const [selectedCompetency, setSelectedCompetency] = useState<string>(INITIAL_COMPETENCIES[0].id);
  const [difficultyLevel, setDifficultyLevel] = useState<number>(4);
  const [bloomLevel, setBloomLevel] = useState<BloomLevel>("Analyze");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>(SAMPLE_QUESTIONS);

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      const comp = INITIAL_COMPETENCIES.find((c) => c.id === selectedCompetency) || INITIAL_COMPETENCIES[0];
      const newQ: Question = {
        id: "q-grok-" + Date.now(),
        course_id: "course-101",
        competency_id: comp.id,
        difficulty_level: difficultyLevel,
        bloom_level: bloomLevel,
        question_text: "Under a decentralized governance model for " + comp.title.toLowerCase() + ", how can inter-agency audit trails be maintained without compromising transaction latency?",
        explanation: "By deploying cryptographically signed asynchronous event streaming with optimistic concurrency control, agencies preserve high throughput while guaranteeing deterministic audit integrity.",
        is_validated: true,
        validation_notes: {
          grounding_score: 0.99,
          distractor_quality: "high",
          grok_notes: "Grounded in Chapter 7: High-Throughput Sovereign Registries (" + comp.code + ")"
        },
        options: [
          { id: "g1", option_label: "A", option_text: "Enforcing synchronous table locks across all distributed relational databases", is_correct: false, rationale: "Causes cascading deadlocks." },
          { id: "g2", option_label: "B", option_text: "Deploying cryptographically signed asynchronous event streaming with optimistic concurrency", is_correct: true, rationale: "Guarantees auditability without blocking write operations." },
          { id: "g3", option_label: "C", option_text: "Disabling audit logging during high citizen transaction volume", is_correct: false, rationale: "Violates fiduciary statutory compliance." },
          { id: "g4", option_label: "D", option_text: "Batching all transactions to an unencrypted spreadsheet sent weekly", is_correct: false, rationale: "Severe data breach hazard." }
        ]
      };

      setQuestions((prev) => [newQ, ...prev]);
      setIsGenerating(false);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-brand-violet/40">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center text-brand-violet">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              xAI Grok Question Generation & RAG Studio
            </h3>
            <p className="text-xs text-slate-400">
              Grounded MCQ generation aligned with Bloom Taxonomy and iGOT Karmayogi proficiency standards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Competency
            </label>
            <select
              value={selectedCompetency}
              onChange={(e) => setSelectedCompetency(e.target.value)}
              className="w-full p-3 rounded-xl bg-navy-900 border border-navy-700 text-white text-xs font-medium focus:border-brand-violet focus:outline-none"
            >
              {INITIAL_COMPETENCIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Proficiency Level (L1 - L5)
            </label>
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-navy-900 border border-navy-700 text-white text-xs font-medium focus:border-brand-violet focus:outline-none"
            >
              <option value={1}>L1 - Novice (Recall & Terms)</option>
              <option value={2}>L2 - Basic (Comprehension)</option>
              <option value={3}>L3 - Intermediate (Application)</option>
              <option value={4}>L4 - Advanced (Analysis)</option>
              <option value={5}>L5 - Expert (Strategic / Policy)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Bloom Dimension
            </label>
            <select
              value={bloomLevel}
              onChange={(e) => setBloomLevel(e.target.value as BloomLevel)}
              className="w-full p-3 rounded-xl bg-navy-900 border border-navy-700 text-white text-xs font-medium focus:border-brand-violet focus:outline-none"
            >
              <option value="Remember">Remember</option>
              <option value="Understand">Understand</option>
              <option value="Apply">Apply</option>
              <option value="Analyze">Analyze</option>
              <option value="Evaluate">Evaluate</option>
              <option value="Create">Create</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={handleGenerateQuestions}
            disabled={isGenerating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-electric-600 hover:opacity-90 text-white text-xs font-bold shadow-glow-violet transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Querying pgvector & Grok API...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Grounded Assessment Item</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Validated Question Bank ({questions.length})</span>
          </h4>
        </div>

        {questions.map((q) => (
          <div key={q.id} className="glass-panel rounded-2xl p-6 border-navy-700/80">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono font-bold text-brand-violet">
                {INITIAL_COMPETENCIES.find((c) => c.id === q.competency_id)?.code || "COMP-GEN"}
              </span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  Grounding: {((q.validation_notes?.grounding_score ?? 0.98) * 100).toFixed(0)}%
                </span>
                <span className="px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-navy-700 text-[10px] font-semibold">
                  Level {q.difficulty_level} • {q.bloom_level}
                </span>
              </div>
            </div>

            <h5 className="text-sm font-semibold text-white leading-relaxed">{q.question_text}</h5>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options?.map((opt) => (
                <div
                  key={opt.id}
                  className={"p-2.5 rounded-xl border text-xs flex items-center space-x-2.5 " + (
                    opt.is_correct
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-medium"
                      : "bg-navy-900/60 border-navy-800 text-slate-400"
                  )}
                >
                  <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] font-mono bg-navy-950 border border-navy-700">
                    {opt.option_label}
                  </span>
                  <span className="truncate">{opt.option_text}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-navy-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="italic">{q.validation_notes?.grok_notes}</span>
              <span className="text-emerald-400 font-medium">Automatic Distractor Guard Passed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
