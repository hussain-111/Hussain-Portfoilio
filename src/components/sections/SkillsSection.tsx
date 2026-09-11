import React, { useState } from 'react';
import { Bot, Database, Code, Cpu, Sparkles, CheckCircle } from 'lucide-react';
import { SKILL_GROUPS } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-4 h-4 text-cyan-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Code':
        return <Code className="w-4 h-4 text-indigo-400" />;
      default:
        return <Cpu className="w-4 h-4 text-purple-400" />;
    }
  };

  const activeGroup = SKILL_GROUPS[activeGroupIndex];

  return (
    <section id="skills" className="w-full space-y-8 py-10">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span>Technical Capabilities</span>
        </h2>
        <p className="text-xs sm:text-sm text-cyan-400 font-mono font-semibold tracking-wide uppercase mt-1.5">
          Engineering &amp; Architecture Arsenal
        </p>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
          Grounded in rigorous computer science fundamentals, enterprise big data pipelines, and modern autonomous LLM systems.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SKILL_GROUPS.map((group, idx) => {
          const isSelected = activeGroupIndex === idx;
          return (
            <button
              key={group.category}
              type="button"
              id={`skill-category-${idx}`}
              onClick={() => setActiveGroupIndex(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  {getIcon(group.iconName)}
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {group.skills.length} Skills
                </span>
              </div>
              <div className="mt-3">
                <h4 className={`text-sm font-bold ${isSelected ? 'text-slate-100' : 'text-slate-300'}`}>
                  {group.category}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Skill Group Detail Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 space-y-6 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getIcon(activeGroup.iconName)}
            <h3 className="text-xl font-bold text-slate-100">
              {activeGroup.category}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {activeGroup.description}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeGroup.skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  {skill.highlighted && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                  <span className="font-semibold text-slate-200">
                    {skill.name}
                  </span>
                </div>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {skill.level}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
