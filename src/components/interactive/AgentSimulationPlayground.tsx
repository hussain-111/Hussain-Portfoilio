import React, { useState } from 'react';
import { Bot, Play, RotateCcw, CheckCircle2, ArrowRight, Sparkles, Terminal, Activity, Zap, Cpu } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  model: string;
  status: 'idle' | 'processing' | 'completed';
  outputSnippet: string;
}

const INITIAL_AGENTS: AgentNode[] = [
  {
    id: 'planner',
    name: 'Syllabus Planner Agent',
    role: 'Deconstructs target job descriptions into prioritized learning paths',
    model: 'Gemini 2.5 Flash',
    status: 'idle',
    outputSnippet: 'Extracted 8 core competencies: PySpark broadcast joins, RAG hybrid search, FAISS indexing.',
  },
  {
    id: 'tutor',
    name: 'Interactive Tutor Agent',
    role: 'Synthesizes bite-sized theoretical modules with Socratic checks',
    model: 'Gemini 2.5 Flash',
    status: 'idle',
    outputSnippet: 'Generated 5 challenge scenarios on Spark Catalyst optimizer partition skew.',
  },
  {
    id: 'interviewer',
    name: 'Technical Assessor Agent',
    role: 'Evaluates candidate code, time complexity, and distributed trade-offs',
    model: 'Gemini 2.5 Pro',
    status: 'idle',
    outputSnippet: 'Candidate resolved partition skew via salted keys. Score: 96/100 (Verified).',
  },
  {
    id: 'resume',
    name: 'Grounded Resume Synthesizer',
    role: 'Rewrites profile bullet points strictly from verified test telemetry',
    model: 'Gemini 2.5 Pro',
    status: 'idle',
    outputSnippet: 'Synthesized 3 bullet points with 0% hallucination rate, backed by quiz telemetry.',
  },
  {
    id: 'dispatcher',
    name: 'Opportunity Dispatcher',
    role: 'Matches verified candidate skills with relevant enterprise AI openings',
    model: 'Gemini 2.5 Flash',
    status: 'idle',
    outputSnippet: 'Matched 4 AI Engineer roles at high-growth engineering teams in Hyderabad & Remote.',
  },
];

export const AgentSimulationPlayground: React.FC = () => {
  const [agents, setAgents] = useState<AgentNode[]>(INITIAL_AGENTS);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logMessages, setLogMessages] = useState<string[]>([
    'SkillForge Agent Mesh initialized.',
    'Click "Run Multi-Agent Simulation" to watch real-time state transitions and telemetry.',
  ]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    sound.playScan();
    setAgents(INITIAL_AGENTS.map(a => ({ ...a, status: 'idle' })));
    setActiveStep(0);
    setLogMessages(['[SYSTEM] Initiating SkillForge Autonomous Multi-Agent Mesh...']);

    let current = 0;
    const interval = setInterval(() => {
      if (current < INITIAL_AGENTS.length) {
        const stepIdx = current;
        setActiveStep(stepIdx);
        sound.playClick();

        setAgents(prev =>
          prev.map((a, i) => {
            if (i === stepIdx) return { ...a, status: 'processing' };
            if (i < stepIdx) return { ...a, status: 'completed' };
            return { ...a, status: 'idle' };
          })
        );

        setLogMessages(prev => [
          ...prev,
          `[AGENT ACTIVE] ${INITIAL_AGENTS[stepIdx].name}: ${INITIAL_AGENTS[stepIdx].outputSnippet}`,
        ]);

        current++;
      } else {
        clearInterval(interval);
        setAgents(prev => prev.map(a => ({ ...a, status: 'completed' })));
        setIsRunning(false);
        setActiveStep(-1);
        sound.playSuccess();
        setLogMessages(prev => [
          ...prev,
          '[SUCCESS] Multi-Agent Mesh Execution Completed. Verified credentials stored in Firestore.',
        ]);
      }
    }, 1200);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setActiveStep(-1);
    sound.playClick();
    setAgents(INITIAL_AGENTS);
    setLogMessages([
      'SkillForge Agent Mesh reset.',
      'Click "Run Multi-Agent Simulation" to initiate autonomous flow.',
    ]);
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900/80 border border-cyan-500/25 p-5 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>Interactive Multi-Agent Architecture Sandbox</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            SkillForge 5-Agent Autonomous Orchestration
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Experience Hussain's production multi-agent system in action. 5 specialized Gemini agents coordinate sequentially to turn raw inputs into grounded, verified career milestones.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all ${
              isRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Simulation Running...' : 'Run Agent Mesh'}</span>
          </button>

          <button
            type="button"
            onClick={resetSimulation}
            disabled={isRunning}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agent Workflow Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {agents.map((agent, idx) => {
          const isCurrent = activeStep === idx;
          const isDone = agent.status === 'completed';

          return (
            <div
              key={agent.id}
              className={`p-3.5 rounded-2xl border transition-all duration-300 relative space-y-2.5 ${
                isCurrent
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.03]'
                  : isDone
                  ? 'bg-slate-950/70 border-emerald-500/40 text-slate-200'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">
                  AGENT 0{idx + 1}
                </span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isCurrent && <Activity className="w-4 h-4 text-cyan-400 animate-spin" />}
              </div>

              {/* Agent Title & Model */}
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-100 leading-snug">
                  {agent.name}
                </h4>
                <span className="text-[10px] font-mono text-cyan-400/80 block">
                  {agent.model}
                </span>
              </div>

              {/* Role summary */}
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {agent.role}
              </p>

              {/* Status banner */}
              <div className="pt-1 border-t border-slate-800/60">
                <span
                  className={`text-[10px] font-mono block truncate ${
                    isDone
                      ? 'text-emerald-400'
                      : isCurrent
                      ? 'text-cyan-300 animate-pulse font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  {isCurrent ? '⚡ Processing Tokens...' : isDone ? '✓ Stage Output Emitted' : '○ Standby'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Telemetry Terminal Logs */}
      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-xs space-y-1.5 overflow-hidden">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Agent Telemetry Stream // Live Execution Trace</span>
          </div>
          <span className="text-slate-500">Latency: ~240ms</span>
        </div>
        <div className="space-y-1 max-h-28 overflow-y-auto pt-1 text-slate-300">
          {logMessages.map((msg, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                msg.startsWith('[SUCCESS]')
                  ? 'text-emerald-400 font-bold'
                  : msg.startsWith('[AGENT ACTIVE]')
                  ? 'text-cyan-300'
                  : 'text-slate-400'
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
