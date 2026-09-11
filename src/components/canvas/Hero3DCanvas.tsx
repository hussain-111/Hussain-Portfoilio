import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Play, Pause, Compass } from 'lucide-react';

interface Hero3DCanvasProps {
  themeMode?: 'executive' | 'data' | 'emerald';
  onThemeChange?: (mode: 'executive' | 'data' | 'emerald') => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  themeMode = 'executive',
  onThemeChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [fps, setFps] = useState(60);
  const [currentMode, setCurrentMode] = useState<'executive' | 'data' | 'emerald'>(themeMode);

  // References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const orbGroupRef = useRef<THREE.Group | null>(null);
  const mainOrbRef = useRef<THREE.Mesh | null>(null);
  const haloRingRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isPausedRef = useRef(false);
  const currentModeRef = useRef(currentMode);

  useEffect(() => {
    currentModeRef.current = currentMode;
  }, [currentMode]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 120 : 260;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 70;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 3. Smooth Ambient & Directional Lighting (Warm & Understandable)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 2.0);
    keyLight.position.set(30, 40, 50);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-40, -20, 20);
    scene.add(fillLight);

    // 4. Central Smooth Shaded Executive Floating Orb (No wireframes, no zig-zags)
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);
    orbGroupRef.current = orbGroup;

    // Main smooth sphere
    const sphereGeo = new THREE.SphereGeometry(12, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      emissive: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const mainOrb = new THREE.Mesh(sphereGeo, sphereMat);
    orbGroup.add(mainOrb);
    mainOrbRef.current = mainOrb;

    // Smooth elegant orbit ring
    const haloGeo = new THREE.TorusGeometry(18, 0.4, 16, 100);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.65,
    });
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.rotation.x = Math.PI / 2.5;
    orbGroup.add(haloRing);
    haloRingRef.current = haloRing;

    // Secondary tilted thin ring for elegance
    const haloGeo2 = new THREE.TorusGeometry(22, 0.25, 16, 100);
    const haloMat2 = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x4f46e5,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.45,
    });
    const haloRing2 = new THREE.Mesh(haloGeo2, haloMat2);
    haloRing2.rotation.x = -Math.PI / 4;
    haloRing2.rotation.y = Math.PI / 6;
    orbGroup.add(haloRing2);

    // 5. Calm, Floating Luminous Particles (NO connecting lines, NO zig-zag clutter)
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleData: {
      initialX: number;
      initialY: number;
      initialZ: number;
      speed: number;
      frequency: number;
      amplitude: number;
    }[] = [];

    // Particle sprite using canvas
    const createSoftDotTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(125, 211, 252, 0.8)');
        gradient.addColorStop(0.6, 'rgba(56, 189, 248, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const spreadX = isMobile ? 65 : 100;
    const spreadY = isMobile ? 55 : 75;
    const spreadZ = 45;

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * spreadX * 2;
      const y = (Math.random() - 0.5) * spreadY * 2;
      const z = (Math.random() - 0.5) * spreadZ * 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleData.push({
        initialX: x,
        initialY: y,
        initialZ: z,
        speed: 0.3 + Math.random() * 0.5,
        frequency: 0.5 + Math.random() * 1.5,
        amplitude: 2 + Math.random() * 4,
      });

      // Calming sky-blue / soft pearl tones
      particleColors[i * 3] = 0.55 + Math.random() * 0.3;
      particleColors[i * 3 + 1] = 0.75 + Math.random() * 0.2;
      particleColors[i * 3 + 2] = 0.95;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 2.5 : 3.8,
      map: createSoftDotTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Pointer interaction
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouseRef.current.targetX = x * 14;
      mouseRef.current.targetY = y * 10;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Peaceful, Organic Animation Loop
    let animationFrameId: number;
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      frameCount++;
      if (time - fpsTimer >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTimer)));
        frameCount = 0;
        fpsTimer = time;
      }

      if (isPausedRef.current) return;

      const t = time * 0.001;

      // Smooth cursor parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Gentle floating motion for the main executive 3D orb
      if (orbGroupRef.current) {
        orbGroupRef.current.rotation.y = t * 0.2 + mouseRef.current.x * 0.03;
        orbGroupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 - mouseRef.current.y * 0.03;
        orbGroupRef.current.position.y = Math.sin(t * 0.8) * 1.5;
        orbGroupRef.current.position.x = mouseRef.current.x * 0.25;
      }

      if (haloRingRef.current) {
        haloRingRef.current.rotation.z = t * 0.3;
      }
      if (haloRing2) {
        haloRing2.rotation.z = -t * 0.25;
      }

      // Calm particle drift (harmonic wave motion)
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        const i3 = i * 3;
        // Harmonic smooth floating (no zig zags, purely smooth undulating motion)
        positions[i3 + 1] = p.initialY + Math.sin(t * p.speed + p.initialX * 0.05) * p.amplitude;
        positions[i3] = p.initialX + Math.cos(t * p.speed * 0.7 + p.initialY * 0.05) * (p.amplitude * 0.5);
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Camera subtle angle
      camera.position.x = mouseRef.current.x * 0.15;
      camera.position.y = mouseRef.current.y * 0.15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      resizeObserver.disconnect();

      sphereGeo.dispose();
      sphereMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      haloGeo2.dispose();
      haloMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const handleModeSwitch = (mode: 'executive' | 'data' | 'emerald') => {
    setCurrentMode(mode);
    onThemeChange?.(mode);

    if (haloRingRef.current) {
      const mat = haloRingRef.current.material as THREE.MeshStandardMaterial;
      if (mode === 'executive') {
        mat.color.setHex(0x38bdf8);
        mat.emissive.setHex(0x0284c7);
      } else if (mode === 'data') {
        mat.color.setHex(0x60a5fa);
        mat.emissive.setHex(0x2563eb);
      } else {
        mat.color.setHex(0x34d399);
        mat.emissive.setHex(0x059669);
      }
    }
  };

  return (
    <div className="relative w-full h-full select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Experience — Move cursor to guide ambient lighting"
      />

      {/* Clean, Non-Distracting Control Strip */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300 shadow-xl">
        <div className="flex items-center gap-1.5 mr-2">
          <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <span className="font-mono text-[11px] text-slate-400">{isPaused ? 'PAUSED' : `${fps} FPS`}</span>
        </div>

        {/* Understandable theme presets for any persona */}
        <div className="flex items-center gap-1 bg-slate-950/70 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => handleModeSwitch('executive')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
              currentMode === 'executive'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Classic Blue
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('data')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
              currentMode === 'data'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Royal Navy
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('emerald')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
              currentMode === 'emerald'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Soft Emerald
          </button>
        </div>

        {/* Play / Pause toggle */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-100 transition-colors"
          title={isPaused ? 'Resume Animation' : 'Pause Animation'}
          aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Floating subtle hint */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-[11px] text-slate-300/80 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800">
        <Compass className="w-3.5 h-3.5 text-sky-400" />
        <span>Interactive 3D Ambience • Smooth cursor tilt</span>
      </div>
    </div>
  );
};
