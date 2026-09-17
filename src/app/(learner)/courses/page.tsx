import React from "react";
import Link from "next/link";
import { BookOpen, Target, ArrowRight, ShieldCheck, Play } from "lucide-react";
import { INITIAL_COURSES } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex items-center space-x-2 text-xs text-electric-400 font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Catalog</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Competency-Mapped Programs
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Courses with verified competency mappings and AI-driven adaptive assessment banks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_COURSES.map((course) => (
          <div
            key={course.id}
            className="glass-panel rounded-3xl p-7 border-navy-700/70 hover:border-brand-indigo/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-electric-400 px-2.5 py-1 rounded-lg bg-electric-500/10 border border-electric-500/30">
                  {course.code}
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Karmayogi Framework</span>
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-electric-300 transition-colors">
                {course.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {course.description}
              </p>

              {/* Target Competencies */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Target Competencies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {course.competencies?.map((item) => (
                    <span
                      key={item.competency.id}
                      className="px-2.5 py-1 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300 flex items-center space-x-1.5"
                    >
                      <span className="font-mono text-brand-violet">{item.competency.code}</span>
                      <span>•</span>
                      <span className="text-[11px] text-electric-400 font-bold">Target L{item.target_proficiency_level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-navy-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Target Role: {course.target_role}</span>
              <Link
                href={`/quiz/${course.id}`}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Take Assessment</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
