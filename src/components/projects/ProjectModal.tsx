import React, { useState } from 'react';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Play, Terminal, Copy, Check, Sparkles, Layers, ShieldCheck, Home } from 'lucide-react';
import { Project } from '../../types';
import { ProjectHologram } from '../canvas/ProjectHologram';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'architecture' | 'simulation' | 'code'>('architecture');
  const [copied, setCopied] = useState(false);
  const [simStepIndex, setSimStepIndex] = useState(0);
  const [isRunningSim, setIsRunningSim] = useState(false);

  const handleNavigateHome = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = () => {
    if (project.workflowDemo?.codeSnippet) {
      navigator.clipboard.writeText(project.workflowDemo.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRunSimulation = () => {
    if (!project.workflowDemo?.steps) return;
    setIsRunningSim(true);
    setSimStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= project.workflowDemo!.steps.length) {
        clearInterval(interval);
        setIsRunningSim(false);
      } else {
        setSimStepIndex(current);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        id="project-detail-modal"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {project.techCategory}
            </span>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              ID: {project.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="project-modal-navigate-home-top-btn"
              onClick={handleNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-semibold transition-colors"
              title="Navigate back to Home Portfolio"
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span>Navigate to Home</span>
            </button>

            <button
              type="button"
              id="close-project-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Hero Row: Title & 3D WebGL Hologram Preview */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-4 border-b border-slate-800/80">
            <div className="space-y-2 flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm font-mono text-cyan-400">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.roles.map((role) => (
                  <span
                    key={role}
                    className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  >
                    Target Role: {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive 3D Hologram Canvas */}
            <div className="flex flex-col items-center bg-slate-950/90 border border-slate-800 rounded-2xl p-3 shadow-inner">
              <ProjectHologram
                type={project.model3DType}
                size={140}
                interactive={true}
                className="hover:scale-105 transition-transform"
              />
              <span className="text-[10px] font-mono text-cyan-400/90 mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Drag to rotate 3D node
              </span>
            </div>
          </div>

          {/* Navigation Tabs for Architecture vs Simulation vs Code */}
          <div className="flex items-center gap-2 border-b border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'architecture'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              Architecture & Impact
            </button>

            {project.workflowDemo && (
              <button
                type="button"
                onClick={() => setActiveTab('simulation')}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'simulation'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-4 h-4" />
                Live Workflow Simulator
              </button>
            )}

            {project.workflowDemo?.codeSnippet && (
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'code'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4" />
                Core Implementation Snippet
              </button>
            )}
          </div>

          {/* Tab 1: Architecture & Impact */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Comprehensive Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Engineering Overview & Problem Solved
                </h4>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Engineering Metrics Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Quantitative Milestones & Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Production Architecture Design
                </h4>
                <div className="space-y-2">
                  {project.architectureHighlights.map((hl, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-850 text-xs sm:text-sm text-slate-300"
                    >
                      <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Tech Stack Badges */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Technologies & Frameworks Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-cyan-300 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Workflow Simulator */}
          {activeTab === 'simulation' && project.workflowDemo && (
            <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Pipeline & Agent Trace Runner</span>
                </div>
                <button
                  type="button"
                  onClick={handleRunSimulation}
                  disabled={isRunningSim}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  {isRunningSim ? 'Executing Stages...' : 'Re-Run Live Trace'}
                </button>
              </div>

              {/* Step by Step Flow */}
              <div className="space-y-3">
                {project.workflowDemo.steps.map((step, idx) => {
                  const isCurrent = isRunningSim && simStepIndex === idx;
                  const isDone = !isRunningSim || simStepIndex >= idx;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-cyan-950/40 border-cyan-500/70 shadow-lg shadow-cyan-500/10'
                          : isDone
                          ? 'bg-slate-900/80 border-slate-800/90'
                          : 'bg-slate-900/30 border-slate-850 opacity-40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                            isDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={isCurrent ? 'text-cyan-300' : 'text-slate-200'}>
                            {step.title}
                          </span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${
                          isCurrent
                            ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                            : isDone
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isCurrent ? 'PROCESSING' : isDone ? 'VERIFIED' : 'QUEUED'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 pl-7">
                        {step.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Code Snippet */}
          {activeTab === 'code' && project.workflowDemo?.codeSnippet && (
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Implementation Reference</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{project.workflowDemo.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live System</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              id="project-modal-navigate-home-bottom-btn"
              onClick={handleNavigateHome}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 text-xs font-semibold transition-all shadow-md"
            >
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Navigate to Home</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
