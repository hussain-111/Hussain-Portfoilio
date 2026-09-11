import React from 'react';
import { Bot, Database, Code, Cpu, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { RoleCategory } from '../../types';
import { ROLE_HIGHLIGHTS } from '../../data/portfolioData';

interface RoleAudienceLensProps {
  selectedRole: RoleCategory;
  onSelectRole: (role: RoleCategory) => void;
  onScrollToProjects: () => void;
}

export const RoleAudienceLens: React.FC<RoleAudienceLensProps> = ({
  selectedRole,
  onSelectRole,
  onScrollToProjects,
}) => {
  const rolesList: {
    key: 'Data Engineer' | 'AI Engineer' | 'Software Engineer';
    icon: React.ReactNode;
    color: string;
    borderActive: string;
  }[] = [
    {
      key: 'Data Engineer',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderActive: 'border-emerald-500/70 text-emerald-300',
    },
    {
      key: 'AI Engineer',
      icon: <Bot className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/10',
      borderActive: 'border-cyan-500/70 text-cyan-300',
    },
    {
      key: 'Software Engineer',
      icon: <Code className="w-5 h-5 text-indigo-400" />,
      color: 'from-indigo-500/20 to-purple-500/10',
      borderActive: 'border-indigo-500/70 text-indigo-300',
    },
  ];

  const activeKey: 'Data Engineer' | 'AI Engineer' | 'Software Engineer' =
    selectedRole === 'All Roles' ? 'Data Engineer' : (selectedRole as 'Data Engineer' | 'AI Engineer' | 'Software Engineer');

  const currentHighlight = ROLE_HIGHLIGHTS[activeKey];

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Candidate Suitability Matrix</span>
          </h3>
          <p className="text-xs sm:text-sm text-cyan-400 font-mono font-semibold tracking-wide uppercase mt-1">
            Recruiter &amp; Technical Evaluator Lens
          </p>
          <p className="text-xs sm:text-sm text-slate-400">
            Select a candidate profile track to inspect Hussain's verified qualifications, production architecture, and project portfolio.
          </p>
        </div>

        {/* Role Select Pills */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {rolesList.map((r) => {
            const isSelected = selectedRole === r.key;
            return (
              <button
                key={r.key}
                type="button"
                id={`lens-tab-${r.key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onSelectRole(r.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? `${r.borderActive} bg-slate-950 shadow-md`
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {r.icon}
                <span>{r.key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Role Deep-Dive Card */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>{currentHighlight.title}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentHighlight.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectRole(activeKey);
              onScrollToProjects();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all flex-shrink-0 self-start sm:self-center"
          >
            <span>Filter Projects for {activeKey}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Pillars of Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {currentHighlight.keyPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
