import React from "react";
import QuestionGeneratorStudio from "@/components/admin/QuestionGeneratorStudio";
import { Sparkles } from "lucide-react";

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex items-center space-x-2 text-xs text-brand-violet font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>AI Item Synthesis & Validation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Grok RAG Question Generation Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Synthesize high-rigor multiple choice items grounded in document chunks and validated against Bloom taxonomy benchmarks.
        </p>
      </div>

      <QuestionGeneratorStudio />
    </div>
  );
}
