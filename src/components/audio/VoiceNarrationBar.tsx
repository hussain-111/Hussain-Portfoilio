import React, { useEffect, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  User,
  Sparkles,
  X,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  Mic
} from 'lucide-react';
import { narrationManager, NarrationState, NARRATION_SECTIONS } from '../../utils/voiceNarration';

export const VoiceNarrationBar: React.FC = () => {
  const [state, setState] = useState<NarrationState>(narrationManager.getState());
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const unsubscribe = narrationManager.subscribe((newState) => {
      setState(newState);
      if (newState.isPlaying || newState.isPaused) {
        setIsVisible(true);
      }
    });
    return unsubscribe;
  }, []);

  if (!state.isSupported || !isVisible) {
    return null;
  }

  const currentSec = state.currentSection;

  return (
    <div
      id="voice-narration-player"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-3xl transition-all duration-300 pointer-events-auto"
    >
      <div className="relative bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-cyan-950/70 text-slate-100 ring-1 ring-cyan-500/20">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-2xl blur-sm -z-10 opacity-70" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            {/* Pulsing Voice Avatar Indicator */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              <Mic className={`w-4 h-4 ${state.isPlaying ? 'animate-pulse text-cyan-400' : ''}`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <span>Shaik Hussain Basha Voice Tour</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">
                    Male Voice
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Denoised Studio Audio</span>
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {currentSec.title} • ({state.currentSectionIndex + 1}/{state.totalSections})
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="narration-settings-toggle-btn"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                showSettings
                  ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Acoustic Voice & Noise Filter Settings"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={isMinimized ? 'Expand Audio Player' : 'Minimize Player'}
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => {
                narrationManager.stop();
                setIsVisible(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Acoustic & Voice Tuning Settings Drawer */}
        {showSettings && !isMinimized && (
          <div className="my-2.5 p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2.5 text-xs text-slate-300 animate-in fade-in slide-in-from-top-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Background Noise Removal & Equalization</span>
              </div>
              <button
                type="button"
                onClick={() => narrationManager.toggleNoiseReduction()}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                  state.noiseReductionActive
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {state.noiseReductionActive ? '✓ Low-Cut Rumble & 60Hz Filter Active' : 'Filter Disabled'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="font-medium text-slate-200">Vocal Depth / Tone</span>
                <p className="text-[10px] text-slate-400">Calibrated to Hussain's authentic male vocal frequency</p>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { label: 'Deep Male', pitch: 0.76 },
                  { label: 'Natural Voice (Default)', pitch: 0.82 },
                  { label: 'Crisp Tone', pitch: 0.90 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => narrationManager.setPitch(preset.pitch)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                      Math.abs(state.pitch - preset.pitch) < 0.03
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {state.availableVoices.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <span className="font-medium text-slate-300">Device Voice Engine:</span>
                <select
                  value={state.activeVoiceName}
                  onChange={(e) => narrationManager.setVoiceByName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-cyan-300 focus:outline-none focus:border-cyan-500"
                >
                  {state.availableVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.displayName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Collapsible Main Controls */}
        {!isMinimized && (
          <div className="pt-2.5 space-y-2.5">
            {/* Live Spoken Transcript Preview */}
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs leading-relaxed text-slate-200">
              <span className="font-semibold text-cyan-400 mr-2">Speaking:</span>
              <span className="italic text-slate-300 font-sans">
                "{currentSec.text}"
              </span>
            </div>

            {/* Equalizer & Subtitle */}
            <div className="flex items-center justify-between gap-4 px-1">
              <div className="flex items-center gap-1 h-4">
                {[45, 80, 100, 65, 95, 50, 85, 55, 75, 35].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: state.isPlaying ? `${h}%` : '25%' }}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      state.isPlaying ? 'bg-cyan-400' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-cyan-300 font-medium truncate max-w-[340px]">
                {currentSec.subtitle}
              </span>
            </div>

            {/* Section Quick Jump Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {NARRATION_SECTIONS.map((sec, idx) => {
                const isActive = state.currentSectionIndex === idx;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => narrationManager.playSection(idx)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all font-mono text-[11px] ${
                      isActive
                        ? 'bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 font-semibold shadow-sm'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {idx + 1}. {sec.title.replace('Key Production ', '').replace(' & Accreditations', '').replace(' & Stack', '')}
                  </button>
                );
              })}
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 hidden sm:inline font-mono">
                {state.isPlaying ? 'Active Voice Stream...' : state.isPaused ? 'Paused' : 'Ready'}
              </span>

              <div className="flex items-center gap-2 mx-auto sm:mx-0">
                {/* Prev */}
                <button
                  type="button"
                  id="narration-prev-btn"
                  onClick={() => narrationManager.prevSection()}
                  disabled={state.currentSectionIndex === 0}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition-colors"
                  title="Previous Section"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  id="narration-play-pause-btn"
                  onClick={() => narrationManager.toggle()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-500/20"
                >
                  {state.isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{state.isPaused ? 'Resume' : 'Play'}</span>
                    </>
                  )}
                </button>

                {/* Stop */}
                <button
                  type="button"
                  id="narration-stop-btn"
                  onClick={() => narrationManager.stop()}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 transition-colors"
                  title="Stop Narration"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>

                {/* Next */}
                <button
                  type="button"
                  id="narration-next-btn"
                  onClick={() => narrationManager.nextSection()}
                  disabled={state.currentSectionIndex === NARRATION_SECTIONS.length - 1}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition-colors"
                  title="Next Section"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono text-slate-300">Clean Studio Voice</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
