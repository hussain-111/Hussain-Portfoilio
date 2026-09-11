import React, { useState, useMemo, useRef } from 'react';
import { Sparkles, Layers, SlidersHorizontal, ArrowUp, Github, Linkedin, Mail, Heart, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from './data/portfolioData';
import { Project, RoleCategory, TechStackCategory } from './types';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { RoleAudienceLens } from './components/sections/RoleAudienceLens';
import { ProjectFilterBar } from './components/projects/ProjectFilterBar';
import { ProjectCard } from './components/projects/ProjectCard';
import { ProjectModal } from './components/projects/ProjectModal';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { ResumeModal } from './components/modals/ResumeModal';
import { AgentSimulationPlayground } from './components/interactive/AgentSimulationPlayground';
import { VoiceNarrationBar } from './components/audio/VoiceNarrationBar';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<RoleCategory>('All Roles');
  const [selectedTechStack, setSelectedTechStack] = useState<TechStackCategory>('All Stacks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const projectsSectionRef = useRef<HTMLDivElement>(null);

  // Filter projects based on technical stack, target role, and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // 1. Role filter
      if (selectedRole !== 'All Roles') {
        const matchesRole = project.roles.some((r) => r === selectedRole);
        if (!matchesRole) return false;
      }

      // 2. Tech stack filter
      if (selectedTechStack !== 'All Stacks') {
        if (project.techCategory !== selectedTechStack) return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesTagline = project.tagline.toLowerCase().includes(query);
        const matchesSummary = project.summary.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(query));
        const matchesMetrics = project.metrics.some((m) => m.toLowerCase().includes(query));
        if (!matchesTitle && !matchesTagline && !matchesSummary && !matchesTech && !matchesMetrics) {
          return false;
        }
      }

      return true;
    });
  }, [selectedRole, selectedTechStack, searchQuery]);

  const handleResetFilters = () => {
    setSelectedRole('All Roles');
    setSelectedTechStack('All Stacks');
    setSearchQuery('');
  };

  const scrollToProjects = () => {
    projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Primary Navigation */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Hero with 3D WebGL Canvas */}
      <main className="flex-1">
        <HeroSection
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onExploreProjects={scrollToProjects}
          onSelectRole={(role) => {
            setSelectedRole(role as RoleCategory);
            scrollToProjects();
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
          {/* Section 1: Recruiter Role Audience Lens */}
          <section id="roles" className="pt-6">
            <RoleAudienceLens
              selectedRole={selectedRole}
              onSelectRole={(role) => setSelectedRole(role)}
              onScrollToProjects={scrollToProjects}
            />
          </section>

          {/* Section 2: Projects Showcase with Technical Stack & Role Filter System */}
          <section id="projects" ref={projectsSectionRef} className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
                    <Layers className="w-6 h-6 text-cyan-400" />
                    <span>Interactive Projects Showcase</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-400 font-mono font-semibold tracking-wide uppercase mt-1.5">
                    Engineered for Production &amp; Research
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Multi-agent AI platforms, enterprise financial lakehouses, clinical RAG systems, and high-throughput data pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Bar Component */}
            <ProjectFilterBar
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              selectedTechStack={selectedTechStack}
              onTechStackChange={setSelectedTechStack}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={PROJECTS.length}
              filteredCount={filteredProjects.length}
              onResetFilters={handleResetFilters}
            />

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelectProject={(p) => setSelectedProject(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-200">
                    No projects found for current filters
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Try adjusting the search query or selecting "All Stacks" and "All Roles".
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Interactive Multi-Agent Simulation Playground */}
            <div className="pt-6">
              <AgentSimulationPlayground />
            </div>
          </section>

          {/* Section 3: Enterprise Experience at TCS (Enterprise Data Platform) */}
          <ExperienceSection />

          {/* Section 4: Technical Arsenal & Skills Matrix */}
          <SkillsSection />

          {/* Section 5: Certifications, Accreditations & Honors */}
          <CertificationsSection />

          {/* Section 6: Contact & Direct Dispatch */}
          <ContactSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        </div>
      </main>

      {/* Global Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Floating Audio Voice Tour Player Bar */}
      <VoiceNarrationBar />

      {/* Sleek Modern Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-black text-slate-100">
              <span className="w-6 h-6 rounded-lg bg-cyan-500 flex items-center justify-center text-xs text-white">
                HB
              </span>
              <span>Shaik Hussain Basha</span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive 3D WebGL Portfolio • AI Engineer & Enterprise Data Architect
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.oldPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              Archive
            </a>
            <span>•</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-cyan-300 transition-colors"
            >
              Email
            </a>
          </div>

          <button
            type="button"
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
