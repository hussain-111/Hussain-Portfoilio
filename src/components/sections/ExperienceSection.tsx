import React from 'react';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2, Terminal, Shield, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="w-full space-y-8 py-10">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-emerald-400" />
          <span>Enterprise Industry Experience</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-400 font-mono font-semibold tracking-wide uppercase mt-1.5">
          Production Engineering at Scale
        </p>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
          Operating enterprise data pipelines for high-reliability financial institutions, translating business requirements into fault-tolerant distributed systems.
        </p>
      </div>

      <div className="space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6"
          >
            {/* Top gradient indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            {/* Header meta */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {exp.type}
                  </span>
                  {exp.client && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      Client: {exp.client}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                  <span>{exp.role}</span>
                  <span className="text-slate-500 font-normal">@</span>
                  <span className="text-emerald-400">{exp.company}</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            {/* Role Narrative */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {exp.description}
            </p>

            {/* Highlights Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Production Responsibilities & Impact</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Tech Stack */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Core Production Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-emerald-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
