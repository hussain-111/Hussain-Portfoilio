import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, ExternalLink, Mail, Phone, MapPin, Sparkles, Home, ArrowLeft } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_GROUPS, CERTIFICATIONS, ACHIEVEMENTS } from '../../data/portfolioData';
import { useAvatar } from '../../utils/avatarStore';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { avatarUrl } = useAvatar();
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleNavigateHome = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyText = () => {
    const text = `
SHAIK HUSSAIN BASHA
Software Engineer | Data Engineer | AI Agents & LLM Integration
Location: ${PERSONAL_INFO.location} | Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

SUMMARY:
${PERSONAL_INFO.summary}

EXPERIENCE:
Data Engineer — Tata Consultancy Services (TCS) (Apr 2025 - Present)
Client: Tier-1 Global Financial Institution | Enterprise Data Platform
- Build and maintain PySpark/HiveQL pipelines on a Hadoop-based Enterprise Data Platform, processing large daily volumes of banking and fiscal data.
- Own pipeline issues from first alert through the fix.
- Write SQL, HiveQL, and SparkSQL transformations pulling from Teradata and mainframe sources.
- Automate batch scheduling with Autosys and shell scripts.

KEY PROJECTS:
1. SkillForge — AI Career & Exam Prep Platform (Python, Gemini API, Firebase Firestore)
2. HabitualAI — Agentic AI Habit Coach (Python, LangChain, OpenAI API, Vector DB)
3. Enterprise Big Data Lakehouse Pipelines (Tier-1 Financial Client / TCS) (PySpark, HiveQL, Hadoop)
4. AI Medical Report Analyzer Agent (Python, Gemini Pro, RAG, FAISS, FastAPI)
5. PySpark-Powered Agentic AI Data Assistant (PySpark, LLM Tool Calling, SparkSQL)

EDUCATION:
B.Tech, Mechanical Engineering — RGMCET, JNTUA | CGPA: 8.5 | 2024

CERTIFICATIONS:
Anthropic Claude Developer Certification • Career Essentials in Generative AI (Microsoft & LinkedIn) • Azure Fundamentals (AZ-900) • AWS ML Foundations • PySpark for Big Data Processing • Python Essentials (Cisco)
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Verified Candidate Document
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Shaik Hussain Basha — Professional Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="resume-navigate-home-top-btn"
              onClick={handleNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/40 text-cyan-200 text-xs font-semibold transition-colors"
              title="Navigate back to Home Portfolio"
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span>Navigate to Home</span>
            </button>

            <button
              type="button"
              id="copy-resume-text-btn"
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              id="print-resume-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Area */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-950/60 font-sans space-y-6 print:bg-white print:text-black print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-800 print:border-black pb-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl flex-shrink-0">
              <img
                src={avatarUrl}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100 print:text-black tracking-tight uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-cyan-400 print:text-gray-800 font-mono">
                Software Engineer | Data Engineer | AI Agents & LLM Integration
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 print:text-gray-600 pt-0.5">
                <span>{PERSONAL_INFO.location}</span>
                <span>•</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">
                  {PERSONAL_INFO.email}
                </a>
                <span>•</span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:underline">
                  {PERSONAL_INFO.phone}
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-400 print:text-blue-700">
                  LinkedIn
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-400 print:text-blue-700">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800/80 print:border-gray-400 pb-1">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800/80 print:border-gray-400 pb-1">
              Professional Experience
            </h2>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-bold text-slate-200 print:text-black">
                  <span>
                    {exp.role} — {exp.company}
                  </span>
                  <span className="font-mono text-xs text-slate-400 print:text-gray-600">
                    {exp.period}
                  </span>
                </div>
                {exp.client && (
                  <p className="text-xs font-mono text-cyan-400/90 print:text-gray-700 italic">
                    Client: {exp.client}
                  </p>
                )}
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 print:text-gray-800">
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800/80 print:border-gray-400 pb-1">
              Key Engineering Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.slice(0, 5).map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-bold text-slate-200 print:text-black">
                    <span className="text-cyan-300 print:text-blue-800 font-semibold">{p.title}</span>
                    <span className="font-mono text-[11px] text-slate-400 print:text-gray-600">
                      {p.technologies.slice(0, 4).join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 print:text-gray-800">
                    {p.summary}
                  </p>
                  <ul className="list-disc pl-5 text-[11px] text-slate-400 print:text-gray-700 space-y-0.5">
                    {p.architectureHighlights.slice(0, 2).map((a, ai) => (
                      <li key={ai}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800/80 print:border-gray-400 pb-1">
              Core Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SKILL_GROUPS.map((g) => (
                <div key={g.category} className="space-y-0.5">
                  <span className="font-bold text-slate-200 print:text-black font-mono text-[11px]">
                    {g.category}:
                  </span>{' '}
                  <span className="text-slate-400 print:text-gray-700">
                    {g.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1.5">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800/80 print:border-gray-400 pb-1">
                Education
              </h2>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-slate-200 print:text-black">
                  B.Tech, Mechanical Engineering
                </p>
                <p className="text-slate-400 print:text-gray-700">
                  RGMCET, JNTUA | CGPA: 8.5 | 2024
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800/80 print:border-gray-400 pb-1">
                Accreditations
              </h2>
              <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
                {CERTIFICATIONS.map((c) => c.name).join(' • ')}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Bar with Navigate to Home */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3.5 border-t border-slate-800 bg-slate-950/95 print:hidden">
          <button
            type="button"
            id="resume-bottom-navigate-home-btn"
            onClick={handleNavigateHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 text-xs font-semibold transition-all shadow-md"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Navigate to Home</span>
          </button>

          <div className="w-full sm:w-auto flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
