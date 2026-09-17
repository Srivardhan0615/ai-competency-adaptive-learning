import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Play, ShieldAlert } from "lucide-react";
import { CompetencyGap } from "@/types";

interface GapAlertCardProps {
  gaps: CompetencyGap[];
}

export default function GapAlertCard({ gaps }: GapAlertCardProps) {
  if (gaps.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-white">All Target Competencies Achieved</h4>
            <p className="text-xs text-slate-400">Your continuous proficiency meets or exceeds all current course benchmarks.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 border-status-gap/30 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-status-gap/10 border border-status-gap/30 flex items-center justify-center text-status-gap">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Active Competency Gaps ({gaps.length})
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-status-gap/20 text-status-gap border border-status-gap/40">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Algorithm detected proficiency deficits compared to target course standards.
            </p>
          </div>
        </div>

        <Link
          href="/courses"
          className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-electric-400 hover:text-electric-300 transition-colors"
        >
          <span>View Curriculum</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Gap List */}
      <div className="mt-5 space-y-3">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="p-4 rounded-xl bg-navy-900/80 border border-navy-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-status-gap/40 transition-all"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-brand-violet">
                  {gap.competency?.code || "COMP-REQ"}
                </span>
                <span className="text-sm font-semibold text-slate-200">
                  {gap.competency?.title || "Competency Domain"}
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-3 text-xs text-slate-400">
                <span>Assessed: <strong className="text-status-gap font-mono">L{gap.current_level.toFixed(1)}</strong></span>
                <span>•</span>
                <span>Target: <strong className="text-slate-200 font-mono">L{gap.target_level}.0</strong></span>
                <span>•</span>
                <span className="text-rose-400 font-medium">Deficit: -{gap.gap_magnitude.toFixed(1)}</span>
              </div>
            </div>

            <Link
              href={`/quiz/course-101`}
              className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Adaptive Sprint</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
