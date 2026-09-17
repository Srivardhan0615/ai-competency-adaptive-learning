"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BrainCircuit, 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  LogOut,
  LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith("/admin");
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-700/60 bg-navy-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo via-electric-500 to-brand-violet p-[1px] shadow-glow-indigo transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-navy-950 rounded-[11px] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-electric-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-white group-hover:text-electric-400 transition-colors">
                Karmayogi<span className="text-brand-violet">AI</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-brand-indigo/20 text-brand-violet border border-brand-indigo/30">
                Research
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Competency-Based Adaptive Learning</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {!isAdmin ? (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5",
                  pathname === "/dashboard"
                    ? "bg-navy-800 text-electric-400 border border-electric-500/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-navy-850"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Learner Dashboard</span>
              </Link>
              <Link
                href="/courses"
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5",
                  pathname.startsWith("/courses")
                    ? "bg-navy-800 text-electric-400 border border-electric-500/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-navy-850"
                )}
              >
                <BookOpen className="w-4 h-4" />
                <span>Courses</span>
              </Link>
              <Link
                href="/competencies"
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5",
                  pathname === "/competencies"
                    ? "bg-navy-800 text-electric-400 border border-electric-500/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-navy-850"
                )}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Competency Matrix</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/admin/dashboard"
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5",
                  pathname === "/admin/dashboard"
                    ? "bg-navy-800 text-brand-violet border border-brand-violet/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-navy-850"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Faculty Overview</span>
              </Link>
              <Link
                href="/admin/documents"
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5",
                  pathname === "/admin/documents"
                    ? "bg-navy-800 text-brand-violet border border-brand-violet/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-navy-850"
                )}
              >
                <FileText className="w-4 h-4" />
                <span>OCR & Documents</span>
              </Link>
              <Link
                href="/admin/questions"
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5",
                  pathname === "/admin/questions"
                    ? "bg-navy-800 text-brand-violet border border-brand-violet/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-navy-850"
                )}
              >
                <Sparkles className="w-4 h-4" />
                <span>Grok Question Studio</span>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href={isAdmin ? "/dashboard" : "/admin/dashboard"}
            className={cn(
              "px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all flex items-center space-x-1.5",
              isAdmin
                ? "bg-electric-500/10 text-electric-400 border-electric-500/30 hover:bg-electric-500/20"
                : "bg-brand-violet/10 text-brand-violet border-brand-violet/30 hover:bg-brand-violet/20"
            )}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdmin ? "Switch to Learner" : "Faculty Portal"}</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-2">
              <span className="hidden md:inline-block text-xs text-slate-300 font-medium px-2 py-1 rounded bg-navy-900 border border-navy-800">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </span>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-navy-900 border border-transparent hover:border-rose-500/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-electric-600 hover:bg-electric-500 text-white flex items-center space-x-1 shadow-sm transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}