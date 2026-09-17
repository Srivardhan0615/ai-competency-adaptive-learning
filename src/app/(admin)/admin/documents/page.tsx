import React from "react";
import DocumentUploader from "@/components/admin/DocumentUploader";
import { FileText } from "lucide-react";

export default function AdminDocumentsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex items-center space-x-2 text-xs text-electric-400 font-semibold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Curriculum Ingestion Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Dual-Engine OCR & Document Processing
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Upload PDF curriculum materials. Process digital text or run high-DPI Tesseract OCR for semantic chunking and pgvector embedding.
        </p>
      </div>

      <DocumentUploader />
    </div>
  );
}
