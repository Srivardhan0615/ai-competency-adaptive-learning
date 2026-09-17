# AI Competency-Based Adaptive Learning Platform (`ai-competency-adaptive-learning`)

An AI-powered competency assessment, adaptive learning, and RAG question generation platform inspired by the **iGOT Karmayogi** ecosystem for civil servants and public sector administrators.

> **Research Prototype**: An independent research prototype designed for hackathon demonstration, combining dual-engine document ingestion, xAI Grok RAG question synthesis, and deterministic mathematical gap analysis.

---

## ?? Key Features

1. **iGOT Karmayogi Competency Framework**: Multi-dimensional capability matrix across **Behavioral**, **Functional**, and **Domain** pillars with 5 standardized proficiency levels (L1 Novice to L5 Expert).
2. **Dual-Engine OCR & Document Ingestion**:
   - PyMuPDF for native high-fidelity digital text extraction.
   - High-DPI Tesseract OCR fallback for scanned government circulars and gazettes.
   - Token-aware sliding window semantic chunking (500 tokens, 50-token overlap).
3. **pgvector Semantic Store**: Fast cosine similarity retrieval (`vector(1536)`) for curriculum RAG.
4. **xAI Grok RAG Question Studio**:
   - Zero-hallucination multiple-choice question generation strictly grounded in retrieved chunks.
   - Dynamic prompt alignment with Bloom''s Taxonomy dimensions (Remember, Understand, Apply, Analyze, Evaluate, Create).
   - Automated distractor plausibility and single-correct-answer validation pipeline.
5. **Deterministic Competency Scoring Engine**:
   - Mathematical item-response weighting ($W_{\text{diff}} \in [1.0, 2.5]$) eliminating stochastic LLM grading inaccuracies.
   - Continuous proficiency level tracking and automated gap magnitude calculation ($\text{Target} - \text{Current}$).
6. **Adaptive Learner Experience**:
   - Interactive SVG Competency Radar chart with real-time target benchmark overlays.
   - Distraction-free zen quiz runner with countdown timers and immediate pedagogical rationale drawers.
   - AI-curated personalized micro-intervention cards.
7. **Premium SaaS Aesthetic**:
   - Custom palette: Deep Navy (`#0A0E1A`), Midnight Slate (`#111827`), Electric Blue (`#3B82F6`), Indigo (`#6366F1`), and Soft Violet (`#8B5CF6`).

---

## ??? Technology Stack

- **Frontend**: Next.js 14/15 App Router, React 18, TypeScript, Tailwind CSS, Lucide React, Recharts.
- **Backend**: Next.js Server Components, Route Handlers, Supabase PostgreSQL, pgvector.
- **AI & LLM**: xAI Grok API (`grok-beta` / `grok-2` via OpenAI-compatible endpoints).
- **OCR Microservice**: Python 3.11, FastAPI, PyMuPDF (`fitz`), PyTesseract, Pillow, Docker.
- **Database & Storage**: Supabase Managed Postgres with Row Level Security (RLS) policies.

---

## ?? Quick Start Guide

### 1. Prerequisites
- Node.js `v18+` or `v20+` (verified on Node `v24`)
- Python `3.10+` (optional for local OCR microservice)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase and xAI Grok API credentials:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## ?? Project Structure

```
ai-competency-adaptive-learning/
+-- src/
¦   +-- app/
¦   ¦   +-- (learner)/
¦   ¦   ¦   +-- dashboard/       # Learner Competency Radar & Gap Console
¦   ¦   ¦   +-- courses/         # Competency-mapped course catalog
¦   ¦   ¦   +-- competencies/    # iGOT Karmayogi Competency Dictionary (L1-L5)
¦   ¦   ¦   +-- quiz/[quizId]/   # Interactive Adaptive Quiz Runner
¦   ¦   +-- (admin)/
¦   ¦   ¦   +-- admin/dashboard/ # Faculty & Ingestion Console
¦   ¦   ¦   +-- admin/documents/ # Dual-Engine OCR Dropzone & Chunk Inspector
¦   ¦   ¦   +-- admin/questions/ # Grok RAG Question Studio & Validator
¦   ¦   +-- api/
¦   ¦   ¦   +-- rag/             # Grok question synthesis endpoints
¦   ¦   ¦   +-- quizzes/         # Deterministic scoring endpoints
¦   ¦   +-- layout.tsx
¦   ¦   +-- page.tsx             # Aesthetic EdTech Landing Page
¦   +-- components/
¦   ¦   +-- competency/          # CompetencyRadar SVG chart
¦   ¦   +-- dashboard/           # StatsOverview, GapAlertCard, RecommendationList
¦   ¦   +-- quiz/                # QuizRunner, Timer, OptionGroup, ResultsReview
¦   ¦   +-- admin/               # DocumentUploader, QuestionGeneratorStudio
¦   ¦   +-- layout/              # Navbar with Learner/Faculty switcher
¦   +-- lib/
¦   ¦   +-- supabase/            # Client, Server, Admin DB helpers
¦   ¦   +-- grok/                # xAI API client & RAG prompts
¦   ¦   +-- scoring/             # Deterministic competency scoring formulas
¦   ¦   +-- mock-data.ts         # High-fidelity starter dataset
¦   +-- types/                   # TypeScript interfaces
+-- services/
¦   +-- document-processor/      # Python FastAPI OCR & chunking service
+-- supabase/
¦   +-- migrations/              # SQL schema with pgvector & RLS
¦   +-- seed.sql                 # Karmayogi competency seeds
+-- README.md
```

---

## ?? Supabase Database Setup

Run the SQL migration in `supabase/migrations/001_initial_schema.sql` inside the Supabase SQL Editor to initialize:
1. `vector` extension and HNSW cosine similarity index.
2. Tables: `profiles`, `competencies`, `courses`, `documents`, `document_chunks`, `questions`, `quizzes`, `quiz_attempts`, `learner_competency_scores`, `competency_gaps`, `personalized_recommendations`.
3. Row Level Security (RLS) policies.
4. Stored Procedure: `match_document_chunks(...)`.

---

## ?? Research Prototype Note
This platform is an independent research prototype inspired by the iGOT Karmayogi mission framework for competency-driven governance, designed for hackathons and academic research demonstrations.
