"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Timer, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Award, 
  RotateCcw, 
  AlertCircle,
  HelpCircle,
  BookOpen
} from "lucide-react";
import { Question, ScoringResult } from "@/types";
import { calculateDeterministicScore, EvaluatedResponse } from "@/lib/scoring/engine";
import { INITIAL_COMPETENCIES } from "@/lib/mock-data";

interface QuizRunnerProps {
  quizTitle: string;
  courseId: string;
  questions: Question[];
}

export default function QuizRunner({ quizTitle, courseId, questions }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 mins in seconds
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmitQuiz = () => {
    const evaluated: EvaluatedResponse[] = questions.map((q) => {
      const chosenOptId = selectedAnswers[q.id];
      const opt = q.options?.find((o) => o.id === chosenOptId);
      return {
        question: q,
        selectedOptionId: chosenOptId || "",
        isCorrect: opt?.is_correct || false,
        timeTakenSeconds: 20,
      };
    });

    const targets = INITIAL_COMPETENCIES.map((c) => ({
      competencyId: c.id,
      targetLevel: 4,
    }));

    const result = calculateDeterministicScore(evaluated, targets);
    setScoringResult(result);
    setIsSubmitted(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // RESULTS VIEW
  if (isSubmitted && scoringResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in py-4">
        {/* Results Banner */}
        <div className="glass-panel-glow rounded-3xl p-8 border-brand-indigo/40 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 rounded-full blur-3xl"></div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30 text-xs font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>Assessment Complete</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Deterministic Competency Evaluation
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Your answers have been scored against iGOT Karmayogi weighted item parameters.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-navy-900/80 border border-navy-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Weighted Score</span>
              <div className="text-3xl font-bold text-white mt-1">{scoringResult.scorePercentage}%</div>
              <span className={`text-[11px] font-semibold ${scoringResult.passed ? "text-emerald-400" : "text-rose-400"}`}>
                {scoringResult.passed ? "Mastery Target Met" : "Target Deficit Flagged"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-navy-900/80 border border-navy-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Correct Answers</span>
              <div className="text-3xl font-bold text-electric-400 mt-1">
                {scoringResult.correctAnswers} / {scoringResult.totalQuestions}
              </div>
              <span className="text-[11px] text-slate-400">Validated items</span>
            </div>

            <div className="p-4 rounded-2xl bg-navy-900/80 border border-navy-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Gaps Detected</span>
              <div className="text-3xl font-bold text-status-gap mt-1">
                {scoringResult.gapsDetected.length}
              </div>
              <span className="text-[11px] text-status-gap">Remediation created</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-sm shadow-glow-blue transition-all"
            >
              View Updated Competency Radar
            </Link>
            <button
              onClick={() => {
                setSelectedAnswers({});
                setIsSubmitted(false);
                setScoringResult(null);
                setCurrentIndex(0);
                setTimeLeft(15 * 60);
              }}
              className="px-5 py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 font-semibold text-sm border border-navy-700 transition-all flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>

        {/* Question Review Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-electric-400" />
            <span>Detailed Question & Rationale Breakdown</span>
          </h3>

          {questions.map((q, idx) => {
            const selectedOptId = selectedAnswers[q.id];
            const correctOpt = q.options?.find((o) => o.is_correct);
            const isUserCorrect = selectedOptId === correctOpt?.id;

            return (
              <div
                key={q.id}
                className={`glass-panel rounded-2xl p-6 border-l-4 ${
                  isUserCorrect ? "border-l-emerald-500 border-emerald-500/30" : "border-l-rose-500 border-rose-500/30"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-slate-400">Question {idx + 1} of {questions.length}</span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-navy-800 text-brand-violet border border-navy-700 text-[10px] font-bold uppercase">
                      Level {q.difficulty_level} • {q.bloom_level}
                    </span>
                    <span className={`flex items-center space-x-1 font-bold ${isUserCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                      {isUserCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <h4 className="text-base font-semibold text-white leading-relaxed">{q.question_text}</h4>

                {/* Options Review */}
                <div className="mt-4 space-y-2">
                  {q.options?.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    const isCorrect = opt.is_correct;

                    let badgeStyle = "bg-navy-900/60 border-navy-800 text-slate-400";
                    if (isCorrect) {
                      badgeStyle = "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium";
                    } else if (isSelected && !isCorrect) {
                      badgeStyle = "bg-rose-950/40 border-rose-500/50 text-rose-300 line-through";
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-start space-x-3 ${badgeStyle}`}
                      >
                        <span className="font-bold font-mono px-1.5 py-0.5 rounded bg-navy-950 border border-navy-700">
                          {opt.option_label}
                        </span>
                        <div className="flex-1">
                          <span>{opt.option_text}</span>
                          {opt.rationale && (
                            <p className="mt-1 text-[11px] text-slate-400 italic">
                              Rationale: {opt.rationale}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pedagogical Explanation */}
                <div className="mt-4 p-3.5 rounded-xl bg-navy-900/90 border border-navy-700/80 text-xs">
                  <span className="font-bold text-electric-400 flex items-center space-x-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pedagogical Grounding:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ RUNNER
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Top Header & Timer Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 flex items-center justify-between border-navy-700/80">
        <div>
          <span className="text-xs font-semibold text-brand-violet uppercase tracking-wider">
            Adaptive Evaluation
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight">{quizTitle}</h2>
        </div>

        <div className="flex items-center space-x-3">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border font-mono text-sm font-bold shadow-inner ${
              timeLeft < 180
                ? "bg-rose-950/40 text-rose-400 border-rose-500/40 animate-pulse"
                : "bg-navy-900 text-electric-400 border-electric-500/30"
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Question Progress Dots */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {questions.map((q, idx) => {
          const isAnswered = !!selectedAnswers[q.id];
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 flex-1 min-w-[28px] rounded-full transition-all ${
                isCurrent
                  ? "bg-electric-400 shadow-glow-blue scale-y-125"
                  : isAnswered
                  ? "bg-brand-indigo"
                  : "bg-navy-800"
              }`}
              title={`Question ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-navy-700/80 relative">
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="font-mono font-bold text-slate-400">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-navy-900 border border-brand-indigo/30 text-brand-violet font-semibold">
              Proficiency L{currentQ.difficulty_level} • {currentQ.bloom_level}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
            {currentQ.question_text}
          </h3>

          {/* Options Group */}
          <div className="mt-6 space-y-3">
            {currentQ.options?.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-3.5 group ${
                    isSelected
                      ? "bg-electric-500/15 border-electric-500 text-white shadow-glow-blue"
                      : "bg-navy-900/70 border-navy-700/70 text-slate-300 hover:bg-navy-850 hover:border-navy-600"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 transition-colors ${
                      isSelected
                        ? "bg-electric-500 text-white"
                        : "bg-navy-800 text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {opt.option_label}
                  </span>
                  <span className="text-sm font-medium leading-relaxed pt-0.5">
                    {opt.option_text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="mt-8 pt-5 border-t border-navy-800 flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold border border-navy-600 transition-all flex items-center space-x-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-brand-indigo hover:from-electric-500 hover:to-brand-indigo text-white text-xs font-bold shadow-glow-indigo transition-all flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
