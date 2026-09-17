import React from "react";
import { Award, Target, AlertTriangle, Zap } from "lucide-react";

interface StatsOverviewProps {
  avgLevel: number;
  overallMastery: number;
  activeGapsCount: number;
  completedAssessments: number;
}

export default function StatsOverview({
  avgLevel,
  overallMastery,
  activeGapsCount,
  completedAssessments,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Average Proficiency */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-electric-500/40 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-electric-500/10 rounded-full blur-2xl group-hover:bg-electric-500/20 transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Proficiency Level</span>
          <div className="w-8 h-8 rounded-xl bg-electric-500/10 border border-electric-500/30 flex items-center justify-center text-electric-400">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">L{avgLevel.toFixed(1)}</span>
          <span className="text-xs text-slate-400 font-medium">/ L5.0</span>
        </div>
        <p className="mt-1 text-xs text-emerald-400 font-medium flex items-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
          Karmayogi Tier Active
        </p>
      </div>

      {/* Overall Mastery */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-brand-violet/40 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-violet/10 rounded-full blur-2xl group-hover:bg-brand-violet/20 transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weighted Mastery</span>
          <div className="w-8 h-8 rounded-xl bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center text-brand-violet">
            <Target className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">{overallMastery.toFixed(1)}%</span>
        </div>
        <div className="mt-2 w-full bg-navy-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-indigo to-brand-violet h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, overallMastery)}%` }}
          ></div>
        </div>
      </div>

      {/* Competency Gaps */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-status-gap/40 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-status-gap/10 rounded-full blur-2xl group-hover:bg-status-gap/20 transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Deficits</span>
          <div className="w-8 h-8 rounded-xl bg-status-gap/10 border border-status-gap/30 flex items-center justify-center text-status-gap">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">{activeGapsCount}</span>
          <span className="text-xs text-status-gap font-medium">Gaps flagged</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">Adaptive remedial path ready</p>
      </div>

      {/* Completed Assessments */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-brand-indigo/40 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/10 rounded-full blur-2xl group-hover:bg-brand-indigo/20 transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evaluations</span>
          <div className="w-8 h-8 rounded-xl bg-brand-indigo/10 border border-brand-indigo/30 flex items-center justify-center text-brand-indigo">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">{completedAssessments}</span>
          <span className="text-xs text-slate-400 font-medium">Completed</span>
        </div>
        <p className="mt-1 text-xs text-electric-400 font-medium">Deterministic Scoring</p>
      </div>
    </div>
  );
}
