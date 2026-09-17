import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "AI Competency-Based Adaptive Learning Platform",
  description: "An AI-powered competency assessment, adaptive learning, and RAG question generation ecosystem inspired by iGOT Karmayogi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-navy-950 text-slate-100 flex flex-col antialiased selection:bg-brand-indigo/30 selection:text-electric-400">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
