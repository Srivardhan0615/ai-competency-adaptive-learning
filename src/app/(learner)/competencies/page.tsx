import React from "react";
import { GraduationCap, Layers, Sparkles } from "lucide-react";
import { INITIAL_COMPETENCIES } from "@/lib/mock-data";
import { getDomainBadgeColor } from "@/lib/utils";

export default function CompetenciesMatrixPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex items-center space-x-2 text-xs text-brand-violet font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Competency Dictionary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          iGOT Karmayogi Competency Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Standardized multi-level descriptors across Behavioral, Functional, and Domain tiers.
        </p>
      </div>

      <div className="space-y-6">
        {INITIAL_COMPETENCIES.map((comp) => (
          <div
            key={comp.id}
            className="glass-panel rounded-3xl p-6 sm:p-8 border-navy-700/80 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-navy-800 pb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-sm text-electric-400">
                    {comp.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getDomainBadgeColor(
                      comp.domain
                    )}`}
                  >
                    {comp.domain} Pillar
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5">{comp.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{comp.description}</p>
              </div>
            </div>

            {/* 5 Levels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-800">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">L1: Novice</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{comp.level_1_desc}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-800">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">L2: Basic</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{comp.level_2_desc}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-800">
                <span className="text-[10px] font-mono font-bold text-electric-400 uppercase">L3: Intermediate</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{comp.level_3_desc}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-800">
                <span className="text-[10px] font-mono font-bold text-brand-violet uppercase">L4: Advanced</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{comp.level_4_desc}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-800">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">L5: Expert</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{comp.level_5_desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
