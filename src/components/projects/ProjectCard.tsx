import React, { useState } from 'react';
import { Github, ExternalLink, Cpu, ChevronRight, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import { ProjectHologram } from '../canvas/ProjectHologram';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Category badge colors
  const categoryColorMap = {
    'Big Data & Pipelines': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'GenAI & Agents': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    'Full-Stack & Systems': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  };

  return (
    <div
      id={`project-card-${project.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
    >
      {/* Top Accent Line on hover */}
      <div className={`h-1 w-full transition-all duration-300 ${
        isHovered
          ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500'
          : 'bg-transparent'
      }`} />

      <div className="p-5 sm:p-6 space-y-4">
        {/* Header with 3D Hologram Miniature & Category */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${categoryColorMap[project.techCategory]}`}>
                {project.techCategory}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> Featured
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-slate-400 line-clamp-1">
              {project.tagline}
            </p>
          </div>

          {/* Interactive 3D Miniature Hologram */}
          <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-cyan-500/30 transition-colors">
            <ProjectHologram
              type={project.model3DType}
              size={76}
              interactive={false}
              className="scale-90"
            />
            <span className="absolute bottom-1 right-1 text-[9px] font-mono text-slate-500 px-1 rounded bg-slate-900/90">
              3D
            </span>
          </div>
        </div>

        {/* Project Summary */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* Key Metrics Pill Badges */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>Key Engineering Metrics:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {project.metrics.slice(0, 2).map((metric, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/70 truncate"
                title={metric}
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Alignment Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.roles.map((r) => (
            <span
              key={r}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {r}
            </span>
          ))}
        </div>

        {/* Technologies Chip Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950/70 text-cyan-300/90 border border-slate-800 hover:border-slate-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-slate-950/70 text-slate-400 border border-slate-800">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 sm:px-6 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          type="button"
          id={`view-details-${project.id}`}
          onClick={() => onSelectProject(project)}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5"
        >
          <span>Architecture & Live Trace</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-lg transition-colors"
              title="View GitHub Repository"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-cyan-400 hover:text-cyan-200 hover:bg-slate-800/80 rounded-lg transition-colors"
              title="Open Live Application"
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
