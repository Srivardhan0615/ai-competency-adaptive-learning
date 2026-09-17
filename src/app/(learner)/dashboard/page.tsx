import React from "react";
import Link from "next/link";
import { Play, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import StatsOverview from "@/components/dashboard/StatsOverview";
import CompetencyRadar from "@/components/competency/CompetencyRadar";
import GapAlertCard from "@/components/dashboard/GapAlertCard";
import RecommendationList from "@/components/dashboard/RecommendationList";
import { 
  INITIAL_COMPETENCIES, 
  INITIAL_LEARNER_SCORES, 
  INITIAL_GAPS, 
  INITIAL_RECOMMENDATIONS,
  INITIAL_COURSES
} from "@/lib/mock-data";

export default function LearnerDashboardPage() {
  const avgLevel =
    INITIAL_LEARNER_SCORES.reduce((acc, curr) => acc + curr.current_proficiency_level, 0) /
    INITIAL_LEARNER_SCORES.length;

  const overallMastery =
    INITIAL_LEARNER_SCORES.reduce((acc, curr) => acc + curr.mastery_score, 0) /
    INITIAL_LEARNER_SCORES.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-navy-700/60 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-brand-violet font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Learner Adaptive Intelligence Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Civil Service Competency Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time mastery index mapped against iGOT Karmayogi proficiency standards.
          </p>
        </div>

        <Link
          href="/quiz/course-101"
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-electric-600 via-brand-indigo to-brand-violet hover:opacity-95 text-white font-bold text-xs shadow-glow-indigo transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Launch Adaptive Diagnostic Quiz</span>
        </Link>
      </div>

      {/* KPI Stats Overview */}
      <StatsOverview
        avgLevel={avgLevel}
        overallMastery={overallMastery}
        activeGapsCount={INITIAL_GAPS.length}
        completedAssessments={9}
      />

      {/* Radar Chart & Active Gaps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Competency Radar Projection */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-navy-700/60 pb-3">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Competency Radar Projection</h3>
              <p className="text-xs text-slate-400">Assessed proficiency (solid blue) vs Target (dashed indigo)</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
              L1 - L5 Scale
            </span>
          </div>

          <CompetencyRadar
            competencies={INITIAL_COMPETENCIES}
            scores={INITIAL_LEARNER_SCORES}
            targetLevel={4.0}
          />
        </div>

        {/* Competency Gaps & Action Items */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <GapAlertCard gaps={INITIAL_GAPS} />
        </div>
      </div>

      {/* AI Personalized Learning Pathways */}
      <RecommendationList recommendations={INITIAL_RECOMMENDATIONS} />
    </div>
  );
}
