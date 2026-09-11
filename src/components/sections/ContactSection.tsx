import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Copy, Check, Send, Sparkles, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', roleType: 'AI Engineer', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate sending message or opening mail client
    const subject = encodeURIComponent(`Portfolio Inquiry for ${formData.roleType} - ${formData.name}`);
    const body = encodeURIComponent(`Hi Hussain,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  return (
    <section id="contact" className="w-full space-y-8 py-16">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span>Connect with Shaik Hussain Basha</span>
        </h2>
        <p className="text-xs sm:text-sm text-cyan-400 font-mono font-semibold tracking-wide uppercase mt-1.5">
          Let's Build Something High-Impact
        </p>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Actively considering opportunities for AI Engineer, Enterprise Data Engineer, and Software Engineer roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Contact Methods & Direct Actions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">
              Direct Contact Channels
            </h3>

            {/* Email card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-400 block">Email Address</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 transition-colors flex-shrink-0"
                title="Copy Email"
                aria-label="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Phone & WhatsApp</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-emerald-300 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                id="copy-phone-btn"
                onClick={handleCopyPhone}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 transition-colors flex-shrink-0"
                title="Copy Phone"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">Base Location</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  {PERSONAL_INFO.location} (Open to Relocation / Remote)
                </span>
              </div>
            </div>

            {/* External Links */}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GitHub (@hussain-111)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.oldPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-purple-400" />
                  <span>Previous Portfolio Archive</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

            {/* Resume button */}
            <button
              type="button"
              id="resume-cta-btn"
              onClick={onOpenResumeModal}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-850 hover:from-slate-750 hover:to-slate-800 border border-slate-700 text-slate-100 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Inspect & Print Clean Resume Format</span>
            </button>
          </div>
        </div>

        {/* Right Side: Quick Message Sender */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                Send a Direct Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Reach out regarding technical interviews, consulting inquiries, or engineering collaborations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name-input" className="text-xs font-mono text-slate-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name-input"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email-input" className="text-xs font-mono text-slate-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email-input"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-role-select" className="text-xs font-mono text-slate-300">
                  Role Focus / Discussion Topic
                </label>
                <select
                  id="contact-role-select"
                  value={formData.roleType}
                  onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="Data Engineer">Enterprise Data Engineer / Big Data (TCS)</option>
                  <option value="AI Engineer">AI Engineer / Autonomous LLM Agents</option>
                  <option value="Software Engineer">Full-Stack / Systems Software Engineer</option>
                  <option value="General Technical Consultation">General Technical Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message-input" className="text-xs font-mono text-slate-300">
                  Message / Project Scope
                </label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about the role, team, or technical challenge you'd like to discuss..."
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <button
                type="submit"
                id="submit-contact-form-btn"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Email Message</span>
              </button>

              {formSent && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Email client opened! Hussain will reply promptly to your inquiry.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
