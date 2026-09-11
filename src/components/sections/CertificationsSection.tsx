import React from 'react';
import { Award, Trophy, GraduationCap, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="w-full space-y-12 py-10">
      {/* Certifications Block */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Certifications &amp; Specializations</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-400 font-mono font-semibold tracking-wide uppercase mt-1.5">
            Verified Credentials
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            Industry accredited verifications spanning Anthropic Claude, Microsoft GenAI, Azure Cloud, and Big Data PySpark.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/90 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${cert.badgeColor}`}>
                    {cert.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {cert.year}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-100">
                  {cert.name}
                </h4>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {cert.issuer}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & Honors */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>Competitive Recognition &amp; Badges</span>
          </h3>
          <p className="text-xs sm:text-sm text-yellow-400 font-mono font-semibold tracking-wide uppercase mt-1.5">
            Honors &amp; Milestones
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/90 hover:border-slate-700 transition-all flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-slate-100">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold flex-shrink-0">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {item.organization} • {item.year}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Block */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Academic Foundation
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-slate-100">
              B.Tech in Mechanical Engineering
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Rajeev Gandhi Memorial College of Engineering & Technology (RGMCET), JNTUA
            </p>
            <p className="text-xs text-slate-400 pt-1">
              Cultivated first-principles problem solving, mathematics, and high-rigor discipline that powered an accelerated transition into Data Engineering and Generative AI.
            </p>
          </div>
        </div>

        <div className="flex md:flex-col items-center md:items-end justify-between gap-2 flex-shrink-0 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <span className="text-xs font-mono text-slate-400">Cumulative CGPA</span>
          <span className="text-2xl font-black text-cyan-300 font-mono">8.5 / 10.0</span>
          <span className="text-[11px] font-mono text-emerald-400">Graduated 2024</span>
        </div>
      </div>
    </section>
  );
};
