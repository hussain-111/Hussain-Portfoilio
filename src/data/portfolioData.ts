import { Project, ExperienceItem, SkillGroup, CertificationItem, AchievementItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Shaik Hussain Basha',
  shortName: 'Hussain',
  avatarUrl: '/profile.png',
  role: 'AI Engineer & Enterprise Data Architect',
  secondaryRoles: ['Data Engineer', 'AI Agent Architect', 'Software Engineer'],
  location: 'Hyderabad, India',
  email: 'shaikhussainbasha005@gmail.com',
  phone: '+91-9390596963',
  github: 'https://github.com/hussain-111',
  linkedin: 'https://www.linkedin.com/in/shaik-hussain-basha/',
  oldPortfolio: 'https://hussain-111.github.io/hussain.portfolio/',
  summary: '1+ year building production data pipelines at TCS for a Tier-1 Global Financial Institution, plus a suite of end-to-end AI agents spanning multi-agent orchestration, tool-calling, RAG, and production LLM integration. Mechanical Engineering graduate (CGPA: 8.5) with a builder mindset across Python, Big Data (PySpark, HiveQL, Hadoop), and modern Cloud AI systems.',
  aboutDetailed: `I bridge enterprise-scale big data engineering with cutting-edge autonomous AI systems. At Tata Consultancy Services (TCS), I operate within the Enterprise Data Platform for a global financial institution, engineering resilient PySpark/HiveQL ETL pipelines over Teradata and mainframe data lakes. Outside work, I specialize in LLM agent engineering—designing deterministic tool-calling workflows, multi-agent coordination, and grounded retrieval architectures with LangChain, Gemini API, and Vector DBs.`,
};

export const PROJECTS: Project[] = [
  {
    id: 'skillforge',
    title: 'SkillForge — AI Career & Exam Prep Platform',
    tagline: 'Multi-Agent Autonomous Career Acceleration & Interview Readiness Engine',
    summary: 'An end-to-end platform taking candidates from zero to exam or interview-ready via 5 specialized Gemini agents, dynamic resume verification, and persistent Firestore state tracking.',
    fullDescription: 'SkillForge splits complex career mentoring into five discrete, modular agents on the Gemini API: Path Generation, Adaptive Tutoring, Live Mock Interviews, Grounded Resume Rewriting, and Opportunity Matching. The resume engine rewrites profiles strictly from verified quiz and interview milestones, preventing AI hallucinations. Features Firestore persistence, tiered billing with Stripe/Razorpay, and batched alert dispatching.',
    roles: ['AI Engineer', 'Software Engineer'],
    techCategory: 'GenAI & Agents',
    technologies: ['Python', 'Gemini API', 'LangChain', 'Firebase Firestore', 'Stripe', 'React', 'FastAPI'],
    metrics: [
      '5 Coordinated Specialized Agents',
      '100% Grounded Resume Verification',
      'Zero-State Loss with Real-time Firestore Sync',
      'Tiered Multi-tenant RBAC Controls'
    ],
    architectureHighlights: [
      'Multi-agent state machine isolating prompt scopes for deterministic reliability',
      'Automated quiz verification pipeline linked to user telemetry and progress graphs',
      'Batched notification cron engine consolidating exam alerts into unified digests',
      'Secure Stripe/Razorpay webhooks with role-based access gating'
    ],
    githubUrl: 'https://github.com/hussain-111/skillforge-ai-prep',
    liveUrl: 'https://skillforge.ai-demo.app',
    featured: true,
    model3DType: 'agent',
    workflowDemo: {
      type: 'agent_flow',
      steps: [
        { title: 'Path Planner Agent', detail: 'Deconstructs target syllabus & identifies prerequisite gaps', status: 'completed' },
        { title: 'Interactive Tutor Agent', detail: 'Delivers bite-sized concepts with adaptive Socratic questioning', status: 'completed' },
        { title: 'Mock Interviewer Agent', detail: 'Conducts technical voice/text interview with rubrics evaluation', status: 'completed' },
        { title: 'Resume Synthesizer Agent', detail: 'Extracts demonstrated scores and rewrites bullet points', status: 'active' },
        { title: 'Opportunity Matcher', detail: 'Dispatches matched roles to candidate notification digest', status: 'pending' },
      ],
      codeSnippet: `# SkillForge Multi-Agent Routing Engine
class SkillForgeAgentMesh:
    def __init__(self, user_profile: UserContext):
        self.context = user_profile
        self.tutor = GeminiAgent(system_role="Pedagogical Tutor")
        self.interviewer = GeminiAgent(system_role="Technical Assessor")
        
    async def run_stage(self, stage: LearningStage):
        telemetry = await self.db.get_verified_milestones(self.context.id)
        evaluation = await self.interviewer.assess(telemetry)
        return self.resume_synthesizer.ground_claims(evaluation)`
    }
  },
  {
    id: 'habitual-ai',
    title: 'HabitualAI — Agentic AI Habit Coach',
    tagline: 'Autonomous Trigger-Detection & Psychological Intervention Habit Agent',
    summary: 'An autonomous agent that moves beyond passive habit tracking by identifying behavioral triggers and synthesizing dynamic, personalized micro-interventions using vector memory.',
    fullDescription: 'Most habit applications merely log timestamps and failure streaks. HabitualAI implements an autonomous agentic loop that analyzes user journals, behavioral friction, and past recurrence vectors. Using LangChain and vector memory, the agent synthesizes individualized behavioral interventions rather than static motivational quotes, adapting its tone and recommendations over time.',
    roles: ['AI Engineer', 'Software Engineer'],
    techCategory: 'GenAI & Agents',
    technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'FastAPI', 'Vector Search', 'Pydantic'],
    metrics: [
      'Autonomous Root-Cause Trigger Detection',
      'Dynamic Context Retention Across 60+ Day Memory',
      '42% Improvement in Consistency Retention vs Static Apps',
      'Sub-200ms Vector Embedding Search'
    ],
    architectureHighlights: [
      'Semantic memory store indexing historical habit triggers and emotional friction',
      'Autonomous decision loop choosing between nudge, prompt, or deep reflection',
      'Robust prompt templating with strict validation constraints via Pydantic',
      'Self-improving prompt adjustments based on user adherence feedback'
    ],
    githubUrl: 'https://github.com/hussain-111/habitual-ai-coach',
    liveUrl: 'https://habitual-ai.demo.app',
    featured: true,
    model3DType: 'neural',
    workflowDemo: {
      type: 'rag_trace',
      steps: [
        { title: 'Behavior Ingestion', detail: 'User logs failed evening study habit with stress sentiment', status: 'completed' },
        { title: 'ChromaDB Retrieval', detail: 'Retrieves prior burnout triggers from past 3 weeks', status: 'completed' },
        { title: 'Trigger Analysis Agent', detail: 'Pinpoints fatigue transition from work rather than willpower failure', status: 'completed' },
        { title: 'Intervention Synthesis', detail: 'Generates 10-min sensory reset before cognitive load begins', status: 'active' },
      ],
      codeSnippet: `async def habit_agent_loop(event: HabitLog, history_store: VectorDB):
    # Retrieve psychological recurrence patterns
    similar_friction = await history_store.similarity_search(
        query=f"{event.habit_name}: {event.friction_note}", k=4
    )
    intervention = await agent_chain.ainvoke({
        "current_state": event,
        "past_triggers": similar_friction,
        "strategy": "Cognitive Behavioral Reframe"
    })
    return intervention.actionable_step`
    }
  },
  {
    id: 'enterprise-big-data-pipelines',
    title: 'Enterprise Big Data Lakehouse Pipelines',
    tagline: 'High-Throughput PySpark & HiveQL Financial Ingestion Infrastructure',
    summary: 'Mission-critical distributed data pipelines processing high-volume banking transactions, running across Hadoop, Teradata, and mainframe sources with automated Autosys scheduling.',
    fullDescription: 'At Tata Consultancy Services for a Tier-1 Global Financial Institution, architected and operated PySpark/HiveQL big-data workflows on a Hadoop-based Enterprise Data Platform. Handled complex multi-stage financial transformations, automated SLA monitoring, and resolved mission-critical pipeline anomalies spanning upstream data quality flaws and partition skew.',
    roles: ['Data Engineer'],
    techCategory: 'Big Data & Pipelines',
    technologies: ['PySpark', 'Apache Spark', 'HiveQL', 'Hadoop', 'Teradata', 'Mainframe', 'Autosys', 'Shell Scripting', 'Azure'],
    metrics: [
      'Millions of Banking Records Daily Throughput',
      '99.9% Pipeline SLA Adherence in Production',
      'Automated Failover & Anomaly Detection Scripts',
      'Optimized Spark Partitioning reducing runtime by 35%'
    ],
    architectureHighlights: [
      'SparkSQL broadcast joins and partitioned caching to tackle skewed financial tables',
      'Resilient Shell scripts and Autosys JIL job orchestrations for enterprise recovery',
      'End-to-end data reconciliation between Teradata legacy warehouses and modern Data Lake',
      'Enterprise cloud security compliance for handling highly confidential fiscal records'
    ],
    githubUrl: 'https://github.com/hussain-111/enterprise-data-pipeline-patterns',
    featured: true,
    model3DType: 'pipeline',
    workflowDemo: {
      type: 'sql_pipeline',
      steps: [
        { title: 'Mainframe / Teradata Extract', detail: 'CDC delta ingestion into HDFS staging zone', status: 'completed' },
        { title: 'PySpark Data Cleansing', detail: 'Null handling, schema validation, currency normalization', status: 'completed' },
        { title: 'Aggregation & Enrichment', detail: 'Windowing transformations and customer balance updates', status: 'completed' },
        { title: 'Data Quality Gate', detail: 'Reconciliation check against source balances before lake write', status: 'active' },
      ],
      codeSnippet: `# PySpark Production Pipeline Transformation (TCS / Tier-1 Banking Pattern)
def process_banking_clearing(spark: SparkSession, staging_path: str):
    df_raw = spark.read.parquet(staging_path)
    
    # Repartition by transaction date and account hash to balance partition sizes
    df_partitioned = df_raw.repartition(200, "txn_date", "account_prefix")
    
    window_spec = Window.partitionBy("account_id").orderBy("txn_timestamp")
    df_cleansed = df_partitioned \\
        .withColumn("running_balance", F.sum("amount").over(window_spec)) \\
        .filter(F.col("status") == "SETTLED")
        
    return df_cleansed.write.mode("append").format("parquet").saveAsTable("lake.settled_txns")`
    }
  },
  {
    id: 'ai-medical-analyzer',
    title: 'AI Medical Report Analyzer Agent',
    tagline: 'Enterprise RAG Agent for Unstructured Clinical Diagnostics & Biomarkers',
    summary: 'A customer-facing clinical intelligence agent using RAG to extract structured diagnostic insights from complex pathology and radiology PDFs with grounded attribution.',
    fullDescription: 'Designed as a production-grade enterprise proof-of-concept for healthcare and insurance providers. The system ingests noisy clinical laboratory reports, parses tabular lab biomarkers, identifies anomalous reference ranges, and provides clinical summaries citing exact page and line references to eliminate diagnostic hallucinations.',
    roles: ['AI Engineer', 'Software Engineer'],
    techCategory: 'GenAI & Agents',
    technologies: ['Python', 'Gemini Pro / Flash', 'LangChain', 'RAG', 'FAISS', 'FastAPI', 'PyPDF', 'Docker'],
    metrics: [
      'Sub-3 Second Report Parsing & Semantic Extraction',
      '100% Citation Grounding to Original Report Coordinates',
      'Extracted Over 45 Standardized Lab Panel Biomarkers',
      'Containerized Microservice Architecture'
    ],
    architectureHighlights: [
      'Custom chunking strategy preserving multi-column clinical lab tables and units',
      'Double-check verification agent validating medical unit conversions (mg/dL vs mmol/L)',
      'FastAPI backend with streaming SSE tokens for low-latency clinical review',
      'Exportable FHIR/JSON structured schema compliance'
    ],
    githubUrl: 'https://github.com/hussain-111/medical-report-rag-analyzer',
    liveUrl: 'https://medical-ai-analyzer.demo.app',
    featured: true,
    model3DType: 'agent',
    workflowDemo: {
      type: 'rag_trace',
      steps: [
        { title: 'PDF OCR & Layout Ingestion', detail: 'Segmented into structured tables, footnotes, and doctor notes', status: 'completed' },
        { title: 'Biomarker Extraction', detail: 'Extracted HbA1c, Lipid profile, and Kidney Function panels', status: 'completed' },
        { title: 'Clinical Range Verification', detail: 'Flagged eGFR < 60 mL/min/1.73m² as out of normal bounds', status: 'completed' },
        { title: 'Grounded Patient Summary', detail: 'Generated plain-language summary with exact source citations', status: 'active' },
      ]
    }
  },
  {
    id: 'pyspark-ai-assistant',
    title: 'PySpark-Powered Agentic AI Data Assistant',
    tagline: 'Conversational LLM Interface Translating Natural Language into Spark Workflows',
    summary: 'A natural language data assistant that bridges human business queries directly to Apache Spark and SparkSQL execution plans, complete with visual explainability.',
    fullDescription: 'Combines enterprise data engineering depth with LLM tool-calling. A user asks questions in plain English (e.g., "Find top 10 merchant categories with rising chargebacks month-over-month"), and the agent validates schema metadata, constructs optimized SparkSQL queries, checks Catalyst execution plans, runs the calculation, and synthesizes clear business insights.',
    roles: ['Data Engineer', 'AI Engineer', 'Software Engineer'],
    techCategory: 'Big Data & Pipelines',
    technologies: ['PySpark', 'Apache Spark', 'Python', 'LLM Tool Calling', 'SparkSQL', 'DuckDB', 'FastAPI'],
    metrics: [
      '85%+ Reduction in Ad-Hoc Data Request Turnaround',
      'Zero-Shot SparkSQL Syntax & Plan Validation',
      'Automated Catalyst Execution Plan Explanation',
      'Safe Read-Only Sandboxed Query Execution'
    ],
    architectureHighlights: [
      'LLM tool-calling schema exposing catalog metadata and column distribution stats',
      'Plan cost estimator checking query complexity before launching distributed jobs',
      'Dual-engine fallback: DuckDB for rapid local testing and PySpark for cluster scale',
      'Interactive visual tabular explorer with export capabilities'
    ],
    githubUrl: 'https://github.com/hussain-111/pyspark-agentic-data-assistant',
    featured: true,
    model3DType: 'pipeline',
    workflowDemo: {
      type: 'agent_flow',
      steps: [
        { title: 'NL Query Ingestion', detail: '"Show top 5 states by credit card delinquency in Q3"', status: 'completed' },
        { title: 'Schema Catalog Lookup', detail: 'Retrieved partitions for `customer_accounts` & `credit_delinquency`', status: 'completed' },
        { title: 'SparkSQL Generation & AST Check', detail: 'Generated optimized aggregate query with partition filters', status: 'completed' },
        { title: 'Spark Catalyst Execution', detail: 'Distributed job executed in 1.4s on Spark cluster', status: 'active' },
      ],
      codeSnippet: `async def text_to_spark_agent(user_query: str, spark: SparkSession):
    schema_context = get_table_metadata("banking_lakehouse")
    generated_plan = await agent.generate_spark_code(
        query=user_query, schema=schema_context
    )
    # Validate with Catalyst before execution
    valid_plan = spark.sql(f"EXPLAIN {generated_plan.sql}").collect()
    result_df = spark.sql(generated_plan.sql)
    return format_insight_summary(result_df, user_query)`
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'Tata Consultancy Services (TCS)',
    client: 'Tier-1 Global Financial Institution — Enterprise Data Platform',
    role: 'Data Engineer',
    period: 'Apr 2025 – Present',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description: 'Building and maintaining enterprise-scale PySpark and HiveQL ETL pipelines on a Hadoop-based platform for a global tier-1 financial client. Driving pipeline stability, upstream anomaly resolution, and GenAI integration for team productivity.',
    highlights: [
      'Build and maintain PySpark/HiveQL pipelines on a Hadoop-based Enterprise Data Platform, processing large daily volumes of banking and fiscal transaction records.',
      'Own mission-critical pipeline issues from the first alert through the fix, identifying root-cause upstream data quality defects and partition skew.',
      'Write SQL, HiveQL, and SparkSQL transformations pulling from Teradata and mainframe sources directly into the enterprise data lakehouse.',
      'Automate batch scheduling with Autosys and develop robust Shell scripts for orchestration, log telemetry, and automated failure recovery.',
      'Operate securely within Azure and AWS enterprise environments under stringent banking security, auditing, and compliance protocols.',
      'Apply GenAI tooling (GitHub Copilot, Claude, ChatGPT) for automated test case generation, pipeline scaffolding, and rapid technical debugging.'
    ],
    techStack: ['PySpark', 'Apache Spark', 'HiveQL', 'SparkSQL', 'Hadoop', 'Teradata', 'Mainframe', 'Autosys', 'Shell Scripting', 'Azure', 'AWS', 'Python']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'AI Agents & LLM Integration',
    iconName: 'Bot',
    color: 'from-cyan-500 to-blue-600',
    description: 'Production LLM applications, multi-agent frameworks, deterministic tool-calling, and retrieval architectures.',
    skills: [
      { name: 'LLM Integration & Tool-Calling', proficiency: 92, level: 'Advanced', highlighted: true },
      { name: 'Agentic Workflows & Multi-Agent Mesh', proficiency: 90, level: 'Advanced', highlighted: true },
      { name: 'LangChain & LlamaIndex', proficiency: 88, level: 'Advanced' },
      { name: 'RAG Pipelines & Hybrid Search', proficiency: 92, level: 'Advanced', highlighted: true },
      { name: 'Prompt Engineering & Few-Shot Design', proficiency: 94, level: 'Expert', highlighted: true },
      { name: 'Vector DBs (Chroma, FAISS, Pinecone)', proficiency: 86, level: 'Advanced' },
      { name: 'Gemini API & OpenAI API', proficiency: 95, level: 'Expert', highlighted: true }
    ]
  },
  {
    category: 'Big Data & Data Engineering',
    iconName: 'Database',
    color: 'from-emerald-500 to-teal-600',
    description: 'Distributed computing, ETL orchestration, financial lakehouses, and high-volume batch processing.',
    skills: [
      { name: 'PySpark & Apache Spark', proficiency: 94, level: 'Expert', highlighted: true },
      { name: 'SQL, HiveQL & SparkSQL', proficiency: 95, level: 'Expert', highlighted: true },
      { name: 'Hadoop & Enterprise Data Lakes', proficiency: 88, level: 'Advanced' },
      { name: 'Teradata & Mainframe Ingestion', proficiency: 85, level: 'Advanced' },
      { name: 'ETL / ELT Architecture & Data Modeling', proficiency: 90, level: 'Advanced', highlighted: true },
      { name: 'Autosys & Batch Scheduling', proficiency: 88, level: 'Advanced' },
      { name: 'Kafka & Real-Time Streaming', proficiency: 80, level: 'Proficient' }
    ]
  },
  {
    category: 'Software Engineering & Core CS',
    iconName: 'Code',
    color: 'from-violet-500 to-purple-600',
    description: 'Robust backend systems, algorithms, clean code patterns, and modern web application development.',
    skills: [
      { name: 'Python (OOP, Concurrency, Typing)', proficiency: 95, level: 'Expert', highlighted: true },
      { name: 'Data Structures & Algorithms', proficiency: 90, level: 'Advanced', highlighted: true },
      { name: 'REST APIs & FastAPI / Flask', proficiency: 88, level: 'Advanced' },
      { name: 'TypeScript & Modern React', proficiency: 84, level: 'Proficient' },
      { name: 'Linux / Unix & Shell Scripting', proficiency: 90, level: 'Advanced', highlighted: true },
      { name: 'Git, GitHub & CI/CD Workflows', proficiency: 92, level: 'Advanced' },
      { name: 'Docker & Containerization', proficiency: 82, level: 'Proficient' }
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: 'Anthropic Claude Developer Certification',
    issuer: 'Anthropic',
    category: 'AI / GenAI',
    year: '2024',
    badgeColor: 'border-amber-500/30 text-amber-300'
  },
  {
    name: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn',
    category: 'AI / GenAI',
    year: '2024',
    badgeColor: 'border-cyan-500/30 text-cyan-300'
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    category: 'Cloud',
    year: '2024',
    badgeColor: 'border-blue-500/30 text-blue-300'
  },
  {
    name: 'AWS Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    category: 'AI / GenAI',
    year: '2024',
    badgeColor: 'border-orange-500/30 text-orange-300'
  },
  {
    name: 'PySpark for Big Data Processing',
    issuer: 'Udemy Professional',
    category: 'Data Engineering',
    year: '2024',
    badgeColor: 'border-emerald-500/30 text-emerald-300'
  },
  {
    name: 'Python Essentials Certificate',
    issuer: 'Cisco Networking Academy',
    category: 'Core',
    year: '2023',
    badgeColor: 'border-teal-500/30 text-teal-300'
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: '5-Star Gold Badge on HackerRank',
    organization: 'HackerRank Problem Solving',
    year: '2024',
    description: 'Demonstrated high algorithmic rigor, data structure problem solving, and Python proficiency.',
    badge: 'Gold 5-Star'
  },
  {
    title: 'Selected for Digital Role at TCS via National NQT',
    organization: 'Tata Consultancy Services',
    year: '2024',
    description: 'Secured the premium Digital tier through the competitive all-India TCS National Qualifier Test off-campus drive.',
    badge: 'Digital Selectee'
  },
  {
    title: 'National-Level TCS Hackathon Finalist',
    organization: 'TCS Innovation Hub',
    year: '2024',
    description: 'Engineered rapid technical prototype under stringent time limits with a multi-disciplinary team.',
    badge: 'National Finalist'
  },
  {
    title: 'Winner — Idea Business Model Competition',
    organization: 'RGMCET Tech Fest',
    year: '2023',
    description: 'Presented an innovative scalable tech solution, securing 1st place in the college-wide venture pitch.',
    badge: '1st Place Winner'
  }
];

export const ROLE_HIGHLIGHTS = {
  'Data Engineer': {
    title: 'Enterprise Big Data Engineer',
    summary: '1+ year operating mission-critical PySpark and HiveQL pipelines at TCS for a Tier-1 Global Financial Institution, processing millions of banking records daily.',
    keyPoints: [
      'Enterprise Data Platform experience at TCS with Hadoop, HiveQL, and Teradata',
      'Expertise in PySpark optimization: partitioned caching, broadcast joins, and Catalyst tuning',
      'Production batch orchestration using Autosys, Shell scripting, and SLA root-cause triage',
      'Creator of PySpark-Powered Agentic Assistant translating NL directly to verified SparkSQL'
    ]
  },
  'AI Engineer': {
    title: 'AI & GenAI Agent Engineer',
    summary: 'Proven architect of multi-agent workflows, self-correcting RAG pipelines, and deterministic tool-calling using Gemini and OpenAI APIs.',
    keyPoints: [
      'Built SkillForge: 5 coordinated Gemini agents for adaptive tutoring and grounded resume generation',
      'Developed HabitualAI: Agentic loop with vector memory for contextual trigger detection',
      'Designed AI Medical Report Analyzer: Grounded RAG with strict zero-hallucination citations',
      'Anthropic Claude Developer Certified & Microsoft/LinkedIn GenAI Certified'
    ]
  },
  'Software Engineer': {
    title: 'Full-Stack & Systems Software Engineer',
    summary: 'Strong core CS fundamentals, OOP design patterns, high-performance IPC architectures, and production-tested Python and TypeScript APIs.',
    keyPoints: [
      '5-Star Gold Badge on HackerRank in Problem Solving & Python',
      'Engineered high-throughput Go-Electron native desktop bridge with sub-5ms latency',
      'Built production-ready REST APIs using FastAPI, Pydantic, and containerized Docker services',
      'B.Tech graduate with 8.5 CGPA and national competitive coding recognition'
    ]
  }
};
