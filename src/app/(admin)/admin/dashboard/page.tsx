import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, Sparkles, Users, Award, BookOpen } from "lucide-react";
import { INITIAL_COURSES, INITIAL_COMPETENCIES, SAMPLE_QUESTIONS } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex items-center space-x-2 text-xs text-brand-violet font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Faculty & Curriculum Administration Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Competency Governance & AI Ingestion
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage document pipelines, trigger Grok RAG question synthesis, and review cohort competency analytics.
        </p>
      </div>

      {/* Admin Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border-brand-violet/30">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Competencies</span>
          <div className="text-3xl font-bold text-white mt-2">{INITIAL_COMPETENCIES.length}</div>
          <span className="text-[11px] text-brand-violet font-medium">iGOT Karmayogi Pillars</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-electric-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curriculum Courses</span>
          <div className="text-3xl font-bold text-white mt-2">{INITIAL_COURSES.length}</div>
          <span className="text-[11px] text-electric-400 font-medium">Mapped & Published</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-emerald-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Validated Questions</span>
          <div className="text-3xl font-bold text-emerald-400 mt-2">{SAMPLE_QUESTIONS.length + 12}</div>
          <span className="text-[11px] text-emerald-400 font-medium">Grounded & Verified</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-indigo-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Learner Cohort Size</span>
          <div className="text-3xl font-bold text-white mt-2">128</div>
          <span className="text-[11px] text-indigo-400 font-medium">Active Research Cohort</span>
        </div>
      </div>

      {/* Studio Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel-glow rounded-3xl p-7 border-brand-indigo/30 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 border border-brand-indigo/30 flex items-center justify-center text-electric-400 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Dual-Engine OCR & Document Ingestion</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Upload PDF textbooks or scanned circulars. The pipeline runs digital text extraction and Tesseract OCR, tokenizes content into 500-token chunks, and embeds them into pgvector.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/documents"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Launch Document Ingestion Pipeline</span>
            </Link>
          </div>
        </div>

        <div className="glass-panel-glow rounded-3xl p-7 border-brand-violet/30 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center text-brand-violet mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">xAI Grok Question Generation Studio</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Synthesize high-rigor multiple choice questions strictly grounded in curriculum vector chunks. Automated single-answer and distractor plausibility validation.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/questions"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-violet hover:opacity-90 text-white text-xs font-bold shadow-glow-violet transition-all"
            >
              <span>Launch Grok Question Studio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
