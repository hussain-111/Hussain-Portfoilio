import React from 'react';
import { Search, Filter, Layers, Briefcase, X, SlidersHorizontal, Check } from 'lucide-react';
import { RoleCategory, TechStackCategory } from '../../types';

interface ProjectFilterBarProps {
  selectedRole: RoleCategory;
  onRoleChange: (role: RoleCategory) => void;
  selectedTechStack: TechStackCategory;
  onTechStackChange: (stack: TechStackCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
  onResetFilters: () => void;
}

const TECH_STACK_OPTIONS: { label: TechStackCategory; countHint?: string; color: string }[] = [
  { label: 'All Stacks', color: 'hover:border-slate-600' },
  { label: 'Big Data & Pipelines', color: 'hover:border-emerald-500/50 text-emerald-400' },
  { label: 'GenAI & Agents', color: 'hover:border-cyan-500/50 text-cyan-400' },
];

const ROLE_OPTIONS: { label: RoleCategory; badge: string }[] = [
  { label: 'All Roles', badge: 'All' },
  { label: 'Data Engineer', badge: 'Big Data & Spark' },
  { label: 'AI Engineer', badge: 'LLM & Agents' },
  { label: 'Software Engineer', badge: 'Systems & APIs' },
];

export const ProjectFilterBar: React.FC<ProjectFilterBarProps> = ({
  selectedRole,
  onRoleChange,
  selectedTechStack,
  onTechStackChange,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
  onResetFilters,
}) => {
  const hasActiveFilters =
    selectedRole !== 'All Roles' ||
    selectedTechStack !== 'All Stacks' ||
    searchQuery.trim().length > 0;

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
      {/* Top Search & Filter Summary Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            id="project-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter by tech (e.g. PySpark, Gemini, LangChain, Kafka)..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/70 rounded-xl pl-10 pr-9 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono"
          />
          {searchQuery && (
            <button
              type="button"
              id="clear-search-btn"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Counter & Reset Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-300 font-semibold">{filteredCount}</span>
            <span>of</span>
            <span className="text-slate-300 font-semibold">{totalCount}</span>
            <span>projects visible</span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              id="reset-filters-btn"
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 transition-colors font-medium text-xs"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <div className="h-px bg-slate-800/80" />

      {/* Filter Row 1: Technical Stack Categories */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 tracking-wide uppercase">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Filter by Technical Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK_OPTIONS.map((option) => {
            const isSelected = selectedTechStack === option.label;
            return (
              <button
                key={option.label}
                type="button"
                id={`tech-filter-${option.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onTechStackChange(option.label)}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-200 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Row 2: Target Roles Filter */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 tracking-wide uppercase">
          <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
          <span>Role Alignment Filter</span>
          <span className="text-[10px] text-slate-400 normal-case font-normal">
            (Tailored for specific hiring tracks)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ROLE_OPTIONS.map((option) => {
            const isSelected = selectedRole === option.label;
            return (
              <button
                key={option.label}
                type="button"
                id={`role-filter-${option.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onRoleChange(option.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-200 shadow-sm shadow-indigo-500/20 font-semibold'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                <span>{option.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800/80 text-slate-400'
                }`}>
                  {option.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
