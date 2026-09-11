import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, FileText, Github, Linkedin, Database, Cpu, Award, Briefcase, Volume2, Pause } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Hero3DCanvas } from '../canvas/Hero3DCanvas';
import { Interactive3DPortrait } from '../canvas/Interactive3DPortrait';
import { sound } from '../../utils/audio';
import { narrationManager, NarrationState } from '../../utils/voiceNarration';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
  onExploreProjects: () => void;
  onSelectRole?: (role: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResumeModal,
  onExploreProjects,
  onSelectRole,
}) => {
  const [narrationState, setNarrationState] = useState<NarrationState>(narrationManager.getState());

  useEffect(() => {
    const unsubscribe = narrationManager.subscribe((state) => {
      setNarrationState(state);
    });
    return unsubscribe;
  }, []);

  const handleToggleNarration = () => {
    sound.playClick();
    narrationManager.toggle();
  };
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 overflow-hidden bg-slate-950">
      {/* Interactive 3D WebGL Canvas Layer (Calm, smooth ambient 3D, zero zig-zags) */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-auto">
        <Hero3DCanvas />
      </div>

      {/* Gentle radial vignette for supreme contrast & comfortable reading */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/95" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Narrative & Credentials */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill - Clear, readable, professional */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-200 font-medium">Data Engineer at TCS</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-300 font-medium">Big Data & AI Architect</span>
            </div>

            {/* Main Display Typography - Clear and Understandable */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                <span className="block text-slate-100">Shaik Hussain</span>
                <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Basha
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-200 leading-snug">
                Data Engineer &amp; Practical AI Systems Builder
              </p>
            </div>

            {/* Clear, Human-Understandable Summary for Any Persona */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              With 1+ year at Tata Consultancy Services (TCS), I build reliable, high-volume <strong className="text-white font-semibold">PySpark and SQL data pipelines</strong> for a major global financial institution. In parallel, I engineer <strong className="text-white font-semibold">autonomous AI assistants and intelligent agent workflows</strong> using modern LLMs, vector search, and clean software architecture.
            </p>

            {/* Filter by Role - Clean, Understandable Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="text-slate-400 text-xs font-medium mr-1">Explore Specializations:</span>
              {[
                { name: 'Data Engineer', color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/60 hover:bg-emerald-900/60 shadow-emerald-950/30' },
                { name: 'AI Engineer', color: 'text-sky-300 border-sky-500/40 bg-sky-950/60 hover:bg-sky-900/60 shadow-sky-950/30' },
                { name: 'Software Engineer', color: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-900/60 shadow-indigo-950/30' },
              ].map((role) => (
                <button
                  key={role.name}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    if (onSelectRole) onSelectRole(role.name);
                  }}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer ${role.color}`}
                >
                  {role.name}
                </button>
              ))}
            </div>

            {/* Primary Actions Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                id="hero-explore-projects-btn"
                onClick={() => {
                  sound.playClick();
                  onExploreProjects();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Projects &amp; Demos</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="hero-view-cv-btn"
                onClick={() => {
                  sound.playClick();
                  onOpenResumeModal();
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-sm backdrop-blur-md transition-all shadow-md cursor-pointer"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Open Verified Resume</span>
              </button>

              <button
                type="button"
                id="hero-voice-tour-btn"
                onClick={handleToggleNarration}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm backdrop-blur-md transition-all shadow-md cursor-pointer ${
                  narrationState.isPlaying
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-cyan-500/20 ring-1 ring-cyan-400 animate-pulse'
                    : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-cyan-300 hover:text-white'
                }`}
                title="Hussain's Real Voice Tour (Male Voice • Denoised Audio) - Self Intro, Experience, Projects & Certifications"
              >
                {narrationState.isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-cyan-300" />
                    <span>Pause Voice Tour</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>Voice Tour (Hussain's Voice)</span>
                  </>
                )}
              </button>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shadow-md"
                title="GitHub Profile"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-sky-400 hover:text-sky-300 transition-all shadow-md"
                title="LinkedIn Profile"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Stats Grid - Clear, readable, zero ambiguity */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
                <span className="text-[11px] text-slate-400 block font-medium">Experience</span>
                <span className="text-sm sm:text-base font-bold text-slate-100">1+ Year @ TCS</span>
                <span className="text-[11px] text-emerald-400 block truncate">Financial Data Lake</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
                <span className="text-[11px] text-slate-400 block font-medium">Core Tech</span>
                <span className="text-sm sm:text-base font-bold text-slate-100">PySpark &amp; SQL</span>
                <span className="text-[11px] text-sky-400 block truncate">Millions of Records/Day</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
                <span className="text-[11px] text-slate-400 block font-medium">AI Systems</span>
                <span className="text-sm sm:text-base font-bold text-slate-100">5-Agent Mesh</span>
                <span className="text-[11px] text-indigo-300 block truncate">SkillForge &amp; LLMs</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
                <span className="text-[11px] text-slate-400 block font-medium">Problem Solving</span>
                <span className="text-sm sm:text-base font-bold text-slate-100">5-Star Gold</span>
                <span className="text-[11px] text-amber-300 block truncate">Python &amp; SQL</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Parallax Portrait with Formal Glasses */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Interactive3DPortrait />
          </div>

        </div>
      </div>
    </section>
  );
};
