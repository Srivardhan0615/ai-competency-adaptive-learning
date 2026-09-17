"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle, Clock, AlertTriangle, Layers, Eye } from "lucide-react";
import { DocumentRecord, DocumentChunk } from "@/types";

export default function DocumentUploader() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([
    {
      id: "doc-1",
      course_id: "course-101",
      filename: "Digital_Public_Infrastructure_Framework_v2.pdf",
      storage_path: "courses/course-101/dpi-framework.pdf",
      file_size: 2450000,
      mime_type: "application/pdf",
      ocr_status: "completed",
      total_pages: 14,
      extracted_text: "National Digital Transformation requires sovereign digital identity registries, interoperable transaction switches...",
      created_at: "2026-09-15T09:30:00Z"
    },
    {
      id: "doc-2",
      course_id: "course-101",
      filename: "Public_Procurement_and_Audit_Guidelines_Scanned.pdf",
      storage_path: "courses/course-101/audit-guidelines.pdf",
      file_size: 5120000,
      mime_type: "application/pdf",
      ocr_status: "completed",
      total_pages: 28,
      extracted_text: "Statutory requirements for multi-stage fiscal auditing mandates third-party reconciliation across all treasury nodes...",
      created_at: "2026-09-16T11:00:00Z"
    }
  ]);

  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(documents[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newDoc: DocumentRecord = {
        id: `doc-${Date.now()}`,
        course_id: "course-101",
        filename: "Competency_Framework_iGOT_Karmayogi_Curriculum.pdf",
        storage_path: "courses/course-101/curriculum.pdf",
        file_size: 3200000,
        mime_type: "application/pdf",
        ocr_status: "completed",
        total_pages: 18,
        extracted_text: "Civil service competency frameworks are structured across behavioral, functional, and domain capabilities...",
        created_at: new Date().toISOString()
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setSelectedDoc(newDoc);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="glass-panel rounded-3xl p-8 border-dashed border-2 border-brand-indigo/40 text-center hover:border-brand-indigo transition-all">
        <div className="max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-brand-indigo/10 border border-brand-indigo/30 flex items-center justify-center text-electric-400 mx-auto">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white tracking-tight">
            Ingest Curriculum Materials & Scanned Documents
          </h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Upload PDF course books or scanned gazettes. Our dual-engine Python pipeline extracts digital text and runs high-DPI OCR on scanned pages before token chunking into pgvector.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={handleSimulatedUpload}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-brand-indigo hover:from-electric-500 hover:to-brand-indigo text-white text-xs font-bold shadow-glow-indigo transition-all disabled:opacity-50"
            >
              {isProcessing ? "Processing Dual-Engine OCR..." : "Select Document / Demo Ingest"}
            </button>
          </div>
        </div>
      </div>

      {/* Document Records & Preview Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Ingestion List */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-4 h-4 text-electric-400" />
            <span>Ingested Documents ({documents.length})</span>
          </h4>

          <div className="space-y-2 mt-3">
            {documents.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;

              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-navy-850 border-electric-500 text-white"
                      : "bg-navy-900/60 border-navy-800 text-slate-400 hover:bg-navy-850 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold text-slate-200 truncate max-w-[200px]">
                      {doc.filename}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      OCR Ready
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-3 text-[11px] text-slate-400">
                    <span>{doc.total_pages} pages</span>
                    <span>•</span>
                    <span>{(doc.file_size / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extracted Text & Chunks Preview */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          {selectedDoc ? (
            <div>
              <div className="flex items-center justify-between border-b border-navy-700/60 pb-4 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedDoc.filename}</h4>
                  <p className="text-xs text-slate-400">Total pages: {selectedDoc.total_pages} • Tokenized for RAG vector search</p>
                </div>
                <span className="text-xs font-mono text-electric-400 px-2.5 py-1 rounded bg-electric-500/10 border border-electric-500/30">
                  Vector Chunks: {Math.max(1, selectedDoc.total_pages * 3)}
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Extracted Sample Stream:
                </span>
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 font-mono text-xs text-slate-300 leading-relaxed max-h-64 overflow-y-auto">
                  {selectedDoc.extracted_text}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-500 text-xs">
              Select a document to inspect its extracted text and vector chunks.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
