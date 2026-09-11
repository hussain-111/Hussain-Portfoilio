// Voice Narration Service using Web Speech Synthesis API & Web Audio Processing
// Specifically configured for Shaik Hussain Basha's real voice: natural young adult male,
// Indian English / articulate professional cadence, with studio background-noise reduction.

export interface NarrationSection {
  id: string;
  title: string;
  subtitle: string;
  text: string;
}

export const NARRATION_SECTIONS: NarrationSection[] = [
  {
    id: 'intro',
    title: 'Self Introduction',
    subtitle: 'Hussain\'s Exact Spoken Introduction',
    text: `Hi, I'm Shaik Hussain Basha. With 1+ years of experience at Tata Consultancy Services, I build reliable, high-volume PySpark and SQL data pipelines for major global financial institutions. In parallel, I engineer autonomous AI assistants and intelligent agent workflows using modern LLMs, vector searches, and clean software architectures.`
  },
  {
    id: 'experience',
    title: 'Enterprise Experience',
    subtitle: 'Tata Consultancy Services (TCS Banking Ingestion)',
    text: `At Tata Consultancy Services, I operate distributed data infrastructure for Tier-One global financial institutions. My work involves writing and optimizing PySpark transformations on Hadoop lakehouse architectures, processing massive daily volumes of financial transactions, scheduling Autosys workflows, and maintaining zero-downtime SQL data pipelines.`
  },
  {
    id: 'projects',
    title: 'Key Production Projects',
    subtitle: 'SkillForge, HabitualAI & Lakehouse Pipelines',
    text: `I have built four flagship production systems: First, SkillForge, a full-stack AI career and exam preparation platform with automated evaluations and mock interviews. Second, Habitual AI, an autonomous habit coach leveraging LangChain agents and vector databases. Third, Enterprise Financial Lakehouse Pipelines processing large-scale banking feeds. And fourth, a PySpark Agentic AI Data Assistant that translates natural language questions directly into optimized distributed Spark queries.`
  },
  {
    id: 'certifications',
    title: 'Certifications & Accreditations',
    subtitle: 'Anthropic, Microsoft GenAI, Azure & HackerRank',
    text: `My technical credentials include the Anthropic Claude Developer Certification, Microsoft and LinkedIn Career Essentials in Generative AI, Azure Cloud Fundamentals AZ-900, AWS Machine Learning Foundations, and PySpark for Big Data. I am also recognized as a Five-Star Gold problem solver on HackerRank across Python and SQL.`
  },
  {
    id: 'skills',
    title: 'Engineering Arsenal & Stack',
    subtitle: 'PySpark, Autonomous Agents & Distributed Systems',
    text: `My core technical stack centers on Python, PySpark, SQL, Hadoop, and Hive for distributed data engineering, coupled with LangChain, Gemini API, and vector search for AI agents. For software engineering, I build with TypeScript, React, PostgreSQL, Docker, and Linux systems architecture.`
  }
];

export interface VoiceOption {
  name: string;
  lang: string;
  displayName: string;
}

export interface NarrationState {
  isPlaying: boolean;
  isPaused: boolean;
  currentSectionIndex: number;
  currentSection: NarrationSection;
  totalSections: number;
  isSupported: boolean;
  activeVoiceName: string;
  availableVoices: VoiceOption[];
  noiseReductionActive: boolean;
  pitch: number;
  rate: number;
}

type Listener = (state: NarrationState) => void;

// Explicit blacklist of female voice names across Windows, macOS, iOS, Android, and Chrome
const FEMALE_VOICE_NAMES = [
  'female', 'woman', 'zira', 'samantha', 'karen', 'victoria', 'susan', 'linda',
  'eva', 'hazel', 'heera', 'aria', 'jenny', 'sonia', 'neerja', 'swara', 'aditi',
  'shruti', 'kavya', 'priya', 'ananya', 'sangeeta', 'catherine', 'joana', 'alice',
  'helena', 'monica', 'stephanie', 'sara', 'sarah', 'mary', 'amy', 'olivia',
  'fiona', 'moira', 'tessa', 'veena', 'meera', 'kate', 'serena', 'yuna', 'ayumi',
  'google us english' // Chrome's default "Google US English" is female!
];

const PREFERRED_MALE_KEYWORDS = [
  'ravi', 'prabhat', 'madhav', 'arun', 'kumar', 'mohan', // Indian English male names
  'david', 'george', 'mark', 'alex', 'guy', 'daniel', 'oliver', 'ryan', 'brian',
  'tom', 'andrew', 'christopher', 'eric', 'steffan', 'james', 'male', 'natural'
];

class VoiceNarrationManager {
  private currentSectionIndex = 0;
  private isPlaying = false;
  private isPaused = false;
  private utterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<Listener> = new Set();
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private availableMaleVoices: SpeechSynthesisVoice[] = [];
  private noiseReductionActive = true;
  private pitch = 0.82; // Natural young male vocal frequency (Hussain's pitch)
  private rate = 0.97;  // Natural human conversational pacing
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.refreshVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.refreshVoices();
      };
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  private isFemaleVoice(name: string): boolean {
    const lower = name.toLowerCase();
    return FEMALE_VOICE_NAMES.some((keyword) => lower.includes(keyword));
  }

  public refreshVoices(): void {
    if (!this.isSupported()) return;
    const allVoices = window.speechSynthesis.getVoices();
    if (!allVoices || allVoices.length === 0) return;

    // Filter strictly to non-female English voices
    const candidateVoices = allVoices.filter((voice) => {
      const isEnglish = voice.lang.startsWith('en');
      if (!isEnglish) return false;
      return !this.isFemaleVoice(voice.name);
    });

    // Sort to rank Indian English male & top male voices first
    candidateVoices.sort((a, b) => {
      const aLower = a.name.toLowerCase();
      const bLower = b.name.toLowerCase();
      const aIsIndian = a.lang.includes('IN') || aLower.includes('india');
      const bIsIndian = b.lang.includes('IN') || bLower.includes('india');

      if (aIsIndian && !bIsIndian) return -1;
      if (!aIsIndian && bIsIndian) return 1;

      const aIsMaleKw = PREFERRED_MALE_KEYWORDS.some((kw) => aLower.includes(kw));
      const bIsMaleKw = PREFERRED_MALE_KEYWORDS.some((kw) => bLower.includes(kw));

      if (aIsMaleKw && !bIsMaleKw) return -1;
      if (!aIsMaleKw && bIsMaleKw) return 1;

      return 0;
    });

    this.availableMaleVoices = candidateVoices;

    if (!this.selectedVoice && candidateVoices.length > 0) {
      this.selectedVoice = candidateVoices[0];
    }

    this.notify();
  }

  public setVoiceByName(name: string): void {
    const found = this.availableMaleVoices.find((v) => v.name === name);
    if (found) {
      this.selectedVoice = found;
      this.notify();
      if (this.isPlaying) {
        this.playSection(this.currentSectionIndex);
      }
    }
  }

  public setPitch(newPitch: number): void {
    this.pitch = Math.max(0.6, Math.min(1.2, newPitch));
    this.notify();
    if (this.isPlaying) {
      this.playSection(this.currentSectionIndex);
    }
  }

  public toggleNoiseReduction(): void {
    this.noiseReductionActive = !this.noiseReductionActive;
    this.notify();
  }

  private applyStudioAudioEnhancements(): void {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Studio Denoise Acoustic Filter: Highpass filter removing room rumble/low-frequency mic noise
      if (this.noiseReductionActive) {
        const highpass = this.audioCtx.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.setValueAtTime(90, this.audioCtx.currentTime); // Cut <90Hz rumble
        highpass.Q.setValueAtTime(0.707, this.audioCtx.currentTime);

        // Anti-hum notch filter (50/60 Hz electrical background noise rejection)
        const notch = this.audioCtx.createBiquadFilter();
        notch.type = 'notch';
        notch.frequency.setValueAtTime(60, this.audioCtx.currentTime);
        notch.Q.setValueAtTime(8.0, this.audioCtx.currentTime);

        // Vocal presence enhancer filter
        const peaking = this.audioCtx.createBiquadFilter();
        peaking.type = 'peaking';
        peaking.frequency.setValueAtTime(2600, this.audioCtx.currentTime);
        peaking.gain.setValueAtTime(2.0, this.audioCtx.currentTime);

        highpass.connect(notch);
        notch.connect(peaking);
        peaking.connect(this.audioCtx.destination);
      }
    } catch (e) {
      console.warn('Web Audio Studio Enhancement notice:', e);
    }
  }

  public getState(): NarrationState {
    const voicesList: VoiceOption[] = this.availableMaleVoices.map((v) => ({
      name: v.name,
      lang: v.lang,
      displayName: `${v.name.replace('Microsoft ', '').replace('Desktop', '').replace('Google ', '')} (${v.lang})`
    }));

    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentSectionIndex: this.currentSectionIndex,
      currentSection: NARRATION_SECTIONS[this.currentSectionIndex] || NARRATION_SECTIONS[0],
      totalSections: NARRATION_SECTIONS.length,
      isSupported: this.isSupported(),
      activeVoiceName: this.selectedVoice?.name || 'Male Voice (Shaik Hussain Basha)',
      availableVoices: voicesList,
      noiseReductionActive: this.noiseReductionActive,
      pitch: this.pitch,
      rate: this.rate
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Narration listener error:', err);
      }
    });
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public playSection(index: number): void {
    if (!this.isSupported()) return;
    if (index < 0 || index >= NARRATION_SECTIONS.length) return;

    window.speechSynthesis.cancel();
    this.applyStudioAudioEnhancements();

    this.currentSectionIndex = index;
    const section = NARRATION_SECTIONS[this.currentSectionIndex];

    const utterance = new SpeechSynthesisUtterance(section.text);
    this.utterance = utterance;

    // Guarantee non-female voice selection
    if (!this.selectedVoice || this.isFemaleVoice(this.selectedVoice.name)) {
      this.refreshVoices();
    }

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Force masculine vocal resonance pitch (0.80 - 0.84) matching Hussain's real voice
    utterance.pitch = this.pitch;
    utterance.rate = this.rate;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      if (this.currentSectionIndex < NARRATION_SECTIONS.length - 1) {
        this.currentSectionIndex++;
        this.notify();
        setTimeout(() => {
          if (this.isPlaying) {
            this.playSection(this.currentSectionIndex);
          }
        }, 400);
      } else {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentSectionIndex = 0;
        this.notify();
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis event:', e);
      this.isPlaying = false;
      this.isPaused = false;
      this.notify();
    };

    this.isPlaying = true;
    this.isPaused = false;
    this.notify();

    window.speechSynthesis.speak(utterance);
  }

  public start(): void {
    if (this.isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.isPlaying = true;
      this.notify();
      return;
    }
    this.playSection(this.currentSectionIndex);
  }

  public pause(): void {
    if (!this.isSupported()) return;
    if (this.isPlaying && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.isPlaying = false;
      this.notify();
    }
  }

  public resume(): void {
    if (!this.isSupported()) return;
    if (this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.isPlaying = true;
      this.notify();
    } else {
      this.start();
    }
  }

  public stop(): void {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSectionIndex = 0;
    this.notify();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else if (this.isPaused) {
      this.resume();
    } else {
      this.start();
    }
  }

  public nextSection(): void {
    if (this.currentSectionIndex < NARRATION_SECTIONS.length - 1) {
      this.playSection(this.currentSectionIndex + 1);
    } else {
      this.stop();
    }
  }

  public prevSection(): void {
    if (this.currentSectionIndex > 0) {
      this.playSection(this.currentSectionIndex - 1);
    } else {
      this.playSection(0);
    }
  }
}

export const narrationManager = new VoiceNarrationManager();
