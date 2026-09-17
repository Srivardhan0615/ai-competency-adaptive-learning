-- Seed Competencies (iGOT Karmayogi inspired framework)
INSERT INTO competencies (id, code, title, domain, description, level_1_desc, level_2_desc, level_3_desc, level_4_desc, level_5_desc) VALUES
(
    'c1111111-1111-1111-1111-111111111111',
    'COMP-BEH-01',
    'Strategic Decision Making & Governance',
    'Behavioral',
    'Ability to evaluate complex situations, assess risks, and formulate evidence-based decisions under regulatory constraints.',
    'Identifies standard operational protocols and basic policy guidelines.',
    'Comprehends the rationale behind governance decisions and standard frameworks.',
    'Applies risk assessment models to routine multi-stakeholder scenarios.',
    'Analyzes conflicting priorities and optimizes resource allocation across departments.',
    'Formulates novel institutional policies and steers long-term strategic transformation.'
),
(
    'c2222222-2222-2222-2222-222222222222',
    'COMP-FUN-01',
    'Data-Driven Public Policy & Analytics',
    'Functional',
    'Skill in interpreting public sector data, evaluating statistical indicators, and driving evidence-backed program interventions.',
    'Recognizes key performance metrics and basic statistical charts.',
    'Interprets demographic and operational indicators in program evaluation reports.',
    'Applies statistical methods and predictive metrics to evaluate public delivery outcomes.',
    'Diagnoses systemic bottlenecks through advanced multivariate data analysis.',
    'Designs end-to-end data governance architectures and national monitoring frameworks.'
),
(
    'c3333333-3333-3333-3333-333333333333',
    'COMP-DOM-01',
    'Digital Public Infrastructure & AI Systems',
    'Domain',
    'Deep understanding of digital transformation architectures, open API ecosystems, and responsible AI adoption in governance.',
    'Defines core concepts of digital public goods, federated IDs, and API gateways.',
    'Explains cybersecurity requirements, privacy principles, and system interoperability.',
    'Deploys digital citizen service workflows integrating automated validation.',
    'Evaluates algorithmic bias, scalability bottlenecks, and data protection compliance.',
    'Architects sovereign digital ecosystems, AI-assisted governance systems, and standards.'
)
ON CONFLICT (code) DO NOTHING;

-- Seed Sample Course
INSERT INTO courses (id, code, title, description, target_role, is_published) VALUES
(
    'd1111111-1111-1111-1111-111111111111',
    'CRS-DPI-101',
    'Digital Public Infrastructure & Competency-Based Governance',
    'Foundational and advanced mastery program on architecting next-generation digital services, citizen-centric workflows, and AI policy alignment.',
    'Public Sector Technologists, Policy Analysts & Administrators',
    true
)
ON CONFLICT (code) DO NOTHING;

-- Map Course Competencies
INSERT INTO course_competencies (course_id, competency_id, target_proficiency_level) VALUES
('d1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 4),
('d1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', 4),
('d1111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333', 5)
ON CONFLICT DO NOTHING;
