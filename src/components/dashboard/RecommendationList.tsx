import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { PersonalizedRecommendation } from "@/types";

interface RecommendationListProps {
  recommendations: PersonalizedRecommendation[];
}

export default function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center text-brand-violet">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">AI Personalized Pathway</h3>
            <p className="text-xs text-slate-400">Curated micro-interventions grounded in your weak nodes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const isReading = rec.rec_type === "targeted_reading";

          return (
            <div
              key={rec.id}
              className="p-4 rounded-xl bg-navy-900/60 border border-navy-700/60 hover:border-brand-violet/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isReading
                        ? "bg-electric-500/10 text-electric-400 border-electric-500/30"
                        : "bg-brand-violet/10 text-brand-violet border-brand-violet/30"
                    }`}
                  >
                    {isReading ? "Targeted Reading" : "Remedial Sprint"}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {rec.competency?.code}
                  </span>
                </div>

                <h4 className="mt-2.5 text-sm font-semibold text-white group-hover:text-electric-300 transition-colors">
                  {rec.title}
                </h4>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Estimated ~8 mins</span>
                <Link
                  href={rec.action_url}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-electric-400 hover:text-electric-300 transition-colors"
                >
                  <span>Start Module</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
