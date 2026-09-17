import Link from "next/link";
import { 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  Target, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Layers, 
  Cpu 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 py-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-14 text-center border-brand-indigo/30">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-indigo/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-brand-indigo/40 text-brand-violet text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-electric-400" />
          <span>Next-Generation Adaptive EdTech Prototype</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          AI-Powered <span className="bg-gradient-to-r from-electric-400 via-brand-indigo to-brand-violet bg-clip-text text-transparent">Competency-Based</span> Adaptive Learning
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Inspired by the <strong>iGOT Karmayogi</strong> competency ecosystem. Integrating dual-engine OCR document ingestion, <strong>xAI Grok RAG</strong> grounded question synthesis, and deterministic mathematical gap detection.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 via-brand-indigo to-brand-violet hover:opacity-95 text-white font-bold text-sm shadow-glow-indigo transition-all flex items-center space-x-2"
          >
            <span>Enter Learner Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/admin/dashboard"
            className="px-7 py-3.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-200 font-semibold text-sm border border-navy-700 transition-all flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-brand-violet" />
            <span>Faculty & Ingestion Studio</span>
          </Link>
        </div>
      </section>

      {/* 3 Pillar Framework Overview */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            iGOT Karmayogi Competency Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Multi-dimensional evaluation across 5 structured proficiency tiers (L1 Novice to L5 Expert).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Behavioral */}
          <div className="glass-panel rounded-2xl p-6 border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-brand-violet mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet">Pillar I</span>
            <h3 className="text-lg font-bold text-white mt-1">Behavioral Competencies</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Strategic decision-making, ethical leadership, crisis governance, and multi-stakeholder negotiation models.
            </p>
          </div>

          {/* Functional */}
          <div className="glass-panel rounded-2xl p-6 border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-electric-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-electric-400">Pillar II</span>
            <h3 className="text-lg font-bold text-white mt-1">Functional Competencies</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Data-driven public policy evaluation, statistical indicators, budget audits, and statutory compliance.
            </p>
          </div>

          {/* Domain */}
          <div className="glass-panel rounded-2xl p-6 border-indigo-500/20 hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Pillar III</span>
            <h3 className="text-lg font-bold text-white mt-1">Domain Competencies</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Digital Public Infrastructure (DPI), sovereign registries, open API standards, and responsible AI deployments.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Core Highlights */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 border-navy-700/80">
        <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center space-x-2">
          <Award className="w-5 h-5 text-electric-400" />
          <span>Core Engineering & AI Subsystems</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
            <h4 className="text-sm font-bold text-white">Dual-Engine OCR</h4>
            <p className="text-xs text-slate-400 mt-1">PyMuPDF digital extraction + Tesseract OCR for scanned PDF gazettes.</p>
          </div>
          <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
            <h4 className="text-sm font-bold text-white">pgvector Semantic Store</h4>
            <p className="text-xs text-slate-400 mt-1">Sub-millisecond cosine similarity search on 1536-dim document chunks.</p>
          </div>
          <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
            <h4 className="text-sm font-bold text-white">xAI Grok RAG Engine</h4>
            <p className="text-xs text-slate-400 mt-1">Zero-hallucination grounded MCQ synthesis with Bloom taxonomy tuning.</p>
          </div>
          <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
            <h4 className="text-sm font-bold text-white">Deterministic Scoring</h4>
            <p className="text-xs text-slate-400 mt-1">Mathematical item response weighting with continuous gap detection.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
