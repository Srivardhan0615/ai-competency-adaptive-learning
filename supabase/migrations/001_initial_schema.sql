-- Enable pgvector and UUID extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & RBAC
CREATE TYPE user_role AS ENUM ('learner', 'faculty', 'admin');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'learner',
    department TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users" 
ON profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 2. Competency Framework (iGOT Karmayogi inspired)
CREATE TYPE competency_domain AS ENUM ('Behavioral', 'Functional', 'Domain');

CREATE TABLE competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    domain competency_domain NOT NULL,
    description TEXT NOT NULL,
    level_1_desc TEXT NOT NULL,
    level_2_desc TEXT NOT NULL,
    level_3_desc TEXT NOT NULL,
    level_4_desc TEXT NOT NULL,
    level_5_desc TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Competencies are viewable by all authenticated users" 
ON competencies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Competencies manageable by admin and faculty" 
ON competencies FOR ALL TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('faculty', 'admin')
    )
);

-- 3. Courses & Competencies
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_role TEXT,
    created_by UUID REFERENCES profiles(id),
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published courses viewable by all authenticated" 
ON courses FOR SELECT TO authenticated 
USING (is_published = true OR auth.uid() = created_by);
CREATE POLICY "Courses manageable by faculty and admin" 
ON courses FOR ALL TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('faculty', 'admin')
    )
);

CREATE TABLE course_competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    competency_id UUID REFERENCES competencies(id) ON DELETE CASCADE,
    target_proficiency_level INT NOT NULL CHECK (target_proficiency_level BETWEEN 1 AND 5),
    UNIQUE(course_id, competency_id)
);

ALTER TABLE course_competencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Course competencies viewable by authenticated users" 
ON course_competencies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Course competencies manageable by faculty/admin" 
ON course_competencies FOR ALL TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('faculty', 'admin')
    )
);

-- 4. Documents & OCR
CREATE TYPE processing_status AS ENUM ('pending', 'processing', 'completed', 'failed');

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_size INT NOT NULL,
    mime_type TEXT NOT NULL,
    ocr_status processing_status DEFAULT 'pending',
    total_pages INT DEFAULT 0,
    extracted_text TEXT,
    ocr_error_message TEXT,
    uploaded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Documents viewable by course managers and enrolled learners" 
ON documents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Documents uploadable by faculty/admin" 
ON documents FOR INSERT TO authenticated 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('faculty', 'admin')
    )
);

-- 5. Document Chunks & Vector Store
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    page_number INT NOT NULL,
    content TEXT NOT NULL,
    token_count INT NOT NULL,
    embedding vector(1536),
    competency_hints TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding 
ON document_chunks USING hnsw (embedding vector_cosine_ops);

ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Chunks readable by authenticated users" 
ON document_chunks FOR SELECT TO authenticated USING (true);

-- 6. Questions & Options
CREATE TYPE bloom_level AS ENUM ('Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create');

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    source_chunk_id UUID REFERENCES document_chunks(id) ON DELETE SET NULL,
    competency_id UUID REFERENCES competencies(id) ON DELETE CASCADE,
    difficulty_level INT NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
    bloom_level bloom_level NOT NULL,
    question_text TEXT NOT NULL,
    explanation TEXT NOT NULL,
    is_validated BOOLEAN DEFAULT FALSE,
    validation_notes JSONB,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Validated questions viewable by authenticated users" 
ON questions FOR SELECT TO authenticated USING (is_validated = true OR created_by = auth.uid());
CREATE POLICY "Questions manageable by faculty and admin" 
ON questions FOR ALL TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('faculty', 'admin')
    )
);

CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    option_label CHAR(1) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    rationale TEXT
);

ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Options viewable by authenticated users" 
ON question_options FOR SELECT TO authenticated USING (true);

-- 7. Quizzes
CREATE TYPE quiz_type AS ENUM ('diagnostic', 'formative', 'adaptive_remedial', 'summative');

CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    quiz_type quiz_type NOT NULL,
    time_limit_minutes INT DEFAULT 15,
    pass_percentage INT DEFAULT 60,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    order_index INT NOT NULL,
    UNIQUE(quiz_id, question_id)
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quizzes viewable by authenticated users" ON quizzes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Quizzes manageable by faculty/admin" ON quizzes FOR ALL TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('faculty', 'admin')
    )
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quiz questions viewable by authenticated users" ON quiz_questions FOR SELECT TO authenticated USING (true);

-- 8. Quiz Attempts & Responses
CREATE TYPE attempt_status AS ENUM ('in_progress', 'completed', 'abandoned');

CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    learner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status attempt_status DEFAULT 'in_progress',
    score_percentage NUMERIC(5,2),
    total_questions INT NOT NULL,
    correct_answers INT DEFAULT 0,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    time_spent_seconds INT DEFAULT 0
);

CREATE TABLE quiz_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_id UUID REFERENCES question_options(id),
    is_correct BOOLEAN NOT NULL,
    time_taken_seconds INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learners can view and manage their own attempts" 
ON quiz_attempts FOR ALL TO authenticated USING (learner_id = auth.uid());

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learners can manage their own responses" 
ON quiz_responses FOR ALL TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM quiz_attempts 
        WHERE quiz_attempts.id = quiz_responses.attempt_id 
        AND quiz_attempts.learner_id = auth.uid()
    )
);

-- 9. Competency Mastery & Gaps
CREATE TABLE learner_competency_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    learner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    competency_id UUID REFERENCES competencies(id) ON DELETE CASCADE,
    current_proficiency_level NUMERIC(3,2) NOT NULL DEFAULT 1.00,
    mastery_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    assessments_count INT DEFAULT 0,
    questions_attempted INT DEFAULT 0,
    questions_correct INT DEFAULT 0,
    last_assessed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(learner_id, competency_id)
);

ALTER TABLE learner_competency_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learners can view own scores" 
ON learner_competency_scores FOR SELECT TO authenticated 
USING (learner_id = auth.uid());
CREATE POLICY "Faculty can view cohort scores" 
ON learner_competency_scores FOR SELECT TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('faculty', 'admin')
    )
);

CREATE TABLE competency_gaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    learner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    competency_id UUID REFERENCES competencies(id) ON DELETE CASCADE,
    target_level INT NOT NULL,
    current_level NUMERIC(3,2) NOT NULL,
    gap_magnitude NUMERIC(3,2) NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

ALTER TABLE competency_gaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learners can view own competency gaps" 
ON competency_gaps FOR SELECT TO authenticated USING (learner_id = auth.uid());

-- 10. Recommendations
CREATE TYPE recommendation_type AS ENUM ('targeted_reading', 'remedial_quiz', 'micro_module');

CREATE TABLE personalized_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    learner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    competency_id UUID REFERENCES competencies(id) ON DELETE CASCADE,
    gap_id UUID REFERENCES competency_gaps(id) ON DELETE SET NULL,
    rec_type recommendation_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    action_url TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE personalized_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learners manage own recommendations" 
ON personalized_recommendations FOR ALL TO authenticated USING (learner_id = auth.uid());

-- 11. Stored Procedure for Vector Search
CREATE OR REPLACE FUNCTION match_document_chunks (
    query_embedding vector(1536),
    match_threshold FLOAT,
    match_count INT,
    filter_course_id UUID DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    document_id UUID,
    content TEXT,
    page_number INT,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        dc.id,
        dc.document_id,
        dc.content,
        dc.page_number,
        (1 - (dc.embedding <=> query_embedding))::FLOAT AS similarity
    FROM document_chunks dc
    JOIN documents d ON dc.document_id = d.id
    WHERE (filter_course_id IS NULL OR d.course_id = filter_course_id)
      AND (1 - (dc.embedding <=> query_embedding)) > match_threshold
    ORDER BY dc.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;
