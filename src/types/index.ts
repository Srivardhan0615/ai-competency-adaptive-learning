export type UserRole = "learner" | "faculty" | "admin";
export type CompetencyDomain = "Behavioral" | "Functional" | "Domain";
export type ProcessingStatus = "pending" | "processing" | "completed" | "failed";
export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
export type QuizType = "diagnostic" | "formative" | "adaptive_remedial" | "summative";
export type AttemptStatus = "in_progress" | "completed" | "abandoned";
export type RecommendationType = "targeted_reading" | "remedial_quiz" | "micro_module";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  department?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Competency {
  id: string;
  code: string;
  title: string;
  domain: CompetencyDomain;
  description: string;
  level_1_desc: string;
  level_2_desc: string;
  level_3_desc: string;
  level_4_desc: string;
  level_5_desc: string;
  created_at?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  target_role: string;
  created_by?: string;
  is_published: boolean;
  competencies?: {
    competency: Competency;
    target_proficiency_level: number;
  }[];
  created_at?: string;
}

export interface DocumentRecord {
  id: string;
  course_id: string;
  filename: string;
  storage_path: string;
  file_size: number;
  mime_type: string;
  ocr_status: ProcessingStatus;
  total_pages: number;
  extracted_text?: string;
  ocr_error_message?: string;
  uploaded_by?: string;
  created_at: string;
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  chunk_index: number;
  page_number: number;
  content: string;
  token_count: number;
  similarity?: number;
  competency_hints?: string[];
}

export interface QuestionOption {
  id: string;
  question_id?: string;
  option_label: string;
  option_text: string;
  is_correct: boolean;
  rationale?: string;
}

export interface Question {
  id: string;
  course_id: string;
  document_id?: string;
  source_chunk_id?: string;
  competency_id: string;
  competency?: Competency;
  difficulty_level: number;
  bloom_level: BloomLevel;
  question_text: string;
  explanation: string;
  is_validated: boolean;
  validation_notes?: {
    grounding_score?: number;
    distractor_quality?: string;
    grok_notes?: string;
  };
  options?: QuestionOption[];
}

export interface Quiz {
  id: string;
  course_id: string;
  title: string;
  quiz_type: QuizType;
  time_limit_minutes: number;
  pass_percentage: number;
  questions?: Question[];
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  learner_id: string;
  status: AttemptStatus;
  score_percentage: number;
  total_questions: number;
  correct_answers: number;
  started_at: string;
  completed_at?: string;
  time_spent_seconds: number;
}

export interface LearnerCompetencyScore {
  id: string;
  learner_id: string;
  competency_id: string;
  competency?: Competency;
  current_proficiency_level: number;
  mastery_score: number;
  assessments_count: number;
  questions_attempted: number;
  questions_correct: number;
  last_assessed_at: string;
}

export interface CompetencyGap {
  id: string;
  learner_id: string;
  competency_id: string;
  competency?: Competency;
  target_level: number;
  current_level: number;
  gap_magnitude: number;
  is_resolved: boolean;
  detected_at: string;
}

export interface PersonalizedRecommendation {
  id: string;
  learner_id: string;
  competency_id: string;
  competency?: Competency;
  gap_id?: string;
  rec_type: RecommendationType;
  title: string;
  description: string;
  action_url: string;
  is_completed: boolean;
  created_at: string;
}

export interface EvaluatedResponse {
  question: Question;
  selectedOptionId: string;
  isCorrect: boolean;
  timeTakenSeconds: number;
}

export interface ScoringResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  passed: boolean;
  competencyScores: {
    competencyId: string;
    previousLevel: number;
    newLevel: number;
    masteryScore: number;
    questionsAttempted: number;
    questionsCorrect: number;
  }[];
  gapsDetected: CompetencyGap[];
  recommendations: Partial<PersonalizedRecommendation>[];
}
