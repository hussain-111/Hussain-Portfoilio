import React, { useState, useRef } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useAvatar } from '../../utils/avatarStore';
import { sound } from '../../utils/audio';

export const Interactive3DPortrait: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { avatarUrl } = useAvatar();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth gentle tilt (-8 to +8 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative flex items-center justify-center p-4 sm:p-6 perspective-[1000px]">
      {/* Soft warm ambient lighting glow (clean and understated) */}
      <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/15 via-sky-500/15 to-indigo-600/15 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main 3D Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-64 sm:w-80 md:w-96 rounded-3xl bg-slate-900/90 border border-slate-700/80 p-3 sm:p-3.5 shadow-2xl shadow-slate-950/80 overflow-hidden select-none transition-colors"
      >
        {/* Dynamic Specular Light Glare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 60%)`,
          }}
        />

        {/* Clean Header Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 mb-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="font-semibold text-slate-200">
              Executive Profile
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>Shaik Hussain Basha</span>
          </div>
        </div>

        {/* Portrait Image (Exact suit portrait with clear glasses and relaxed executive posture) */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner group">
          <img
            src={avatarUrl}
            alt={PERSONAL_INFO.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
          />

          {/* Smooth, subtle gradient on bottom to guarantee text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-95 pointer-events-none" />

          {/* Bottom Card Title Banner */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-left space-y-1 shadow-lg pointer-events-none">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Active in Hyderabad
              </span>
            </div>
            <p className="text-xs text-sky-300 font-medium">
              Data Engineer @ TCS • AI Systems Architect
            </p>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className="mt-2.5 flex items-center justify-between px-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Portfolio Profile</span>
          </div>
          <span className="text-slate-400 text-[10px]">Interactive 3D Tilt</span>
        </div>
      </div>
    </div>
  );
};
