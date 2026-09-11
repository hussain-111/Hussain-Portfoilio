import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Mail, FileText, Menu, X, Sparkles, ExternalLink, Volume2, VolumeX, Play, Pause, Home } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useAvatar } from '../../utils/avatarStore';
import { sound } from '../../utils/audio';
import { narrationManager, NarrationState } from '../../utils/voiceNarration';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [narrationState, setNarrationState] = useState<NarrationState>(narrationManager.getState());
  const { avatarUrl } = useAvatar();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Role Lens', href: '#roles' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo with Hussain's portrait */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          id="navbar-brand-link"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500/60 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              src={avatarUrl}
              alt={PERSONAL_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
              Shaik Hussain Basha
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for AI & Data Roles</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors rounded-full hover:bg-slate-800/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Voice Narration Audio Button (Male Voice: Self Intro, Experience, Projects, Certifications) */}
          <button
            type="button"
            id="navbar-sound-toggle-btn"
            onClick={handleToggleNarration}
            className={`px-3 py-1.5 rounded-xl border transition-all text-xs font-mono flex items-center gap-2 ${
              narrationState.isPlaying
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-400 animate-pulse'
                : narrationState.isPaused
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
            }`}
            title="Audio Narration (Male Voice): Plays Self Intro, Experience, Projects, and Certifications"
          >
            {narrationState.isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-300 animate-bounce" />
            ) : narrationState.isPaused ? (
              <Pause className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="text-[11px] font-semibold">
              {narrationState.isPlaying ? 'Speaking (Male Voice)' : narrationState.isPaused ? 'Voice Paused' : 'Voice Tour'}
            </span>
          </button>

          <button
            type="button"
            id="view-resume-btn"
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
            title="GitHub Profile"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
            title="LinkedIn Profile"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/20"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            id="mobile-voice-tour-btn"
            onClick={handleToggleNarration}
            className={`p-2 rounded-xl border transition-all text-xs font-mono flex items-center gap-1 ${
              narrationState.isPlaying
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
            title="Audio Voice Tour (Male Voice)"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-bold">Voice</span>
          </button>
          <button
            type="button"
            id="open-resume-mobile-btn"
            onClick={onOpenResumeModal}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-mono"
          >
            CV
          </button>
          <button
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 p-4 space-y-3 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          {/* Quick Voice Tour Button */}
          <button
            type="button"
            onClick={() => {
              handleToggleNarration();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>{narrationState.isPlaying ? 'Pause Voice Tour' : 'Listen to Voice Tour (Male Voice)'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex-1 text-center py-2 rounded-xl bg-cyan-500 text-white text-xs font-semibold"
            >
              Email Hussain
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
