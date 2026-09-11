import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectHologramProps {
  type: 'agent' | 'pipeline' | 'neural' | 'cube';
  className?: string;
  size?: number;
  interactive?: boolean;
}

export const ProjectHologram: React.FC<ProjectHologramProps> = ({
  type,
  className = '',
  size = 140,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Create 3D geometry based on project category
    if (type === 'agent') {
      // Multi-Agent Core: Icosahedron + 3 orbiting satellites
      const mainGeo = new THREE.IcosahedronGeometry(1.3, 0);
      const mainMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const mainMesh = new THREE.Mesh(mainGeo, mainMat);
      group.add(mainMesh);

      // Inner pulsating node
      const innerGeo = new THREE.OctahedronGeometry(0.6);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      // Orbiting agent satellites
      const satelliteGroup = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const satGeo = new THREE.DodecahedronGeometry(0.22);
        const satMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
        const satMesh = new THREE.Mesh(satGeo, satMat);
        satMesh.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 0.8, Math.sin(angle) * 1.8);
        satelliteGroup.add(satMesh);
      }
      group.add(satelliteGroup);
    } else if (type === 'pipeline') {
      // Big Data Pipeline: Torus knot + cascading data rings
      const knotGeo = new THREE.TorusKnotGeometry(1.0, 0.28, 48, 8, 2, 3);
      const knotMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      group.add(knotMesh);

      // Outer ring
      const ringGeo = new THREE.RingGeometry(1.7, 1.85, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      group.add(ringMesh);
    } else if (type === 'neural') {
      // Neural & Analytical: Dual nested spheres with point vertices
      const sphereGeo = new THREE.SphereGeometry(1.3, 12, 12);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphereMesh);

      // Point lattice
      const pointsMat = new THREE.PointsMaterial({
        color: 0xd8b4fe,
        size: 0.08,
      });
      const points = new THREE.Points(sphereGeo, pointsMat);
      group.add(points);
    } else {
      // Software / Systems: Nested wireframe cube with internal core
      const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const boxMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      group.add(boxMesh);

      const innerBoxGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const innerBoxMat = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
      });
      const innerBox = new THREE.Mesh(innerBoxGeo, innerBoxMat);
      group.add(innerBox);
    }

    // Interaction handling (drag rotation)
    if (interactive) {
      const handleMouseDown = (e: MouseEvent) => {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current) return;
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        group.rotation.y += deltaX * 0.02;
        group.rotation.x += deltaY * 0.02;

        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
      };

      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDraggingRef.current) {
        group.rotation.y += delta * 0.7;
        group.rotation.x += delta * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [type, size, interactive]);

  return (
    <div
      ref={mountRef}
      className={`inline-flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ width: size, height: size }}
      title="3D WebGL Hologram — Click & drag to rotate in 3D space"
    />
  );
};
