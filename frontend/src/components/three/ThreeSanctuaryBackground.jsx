import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isReducedMotion } from '../../animations/gsapConfig';

/**
 * ThreeSanctuaryBackground
 * A high-performance, GPU-accelerated Three.js 3D ambient particle
 * and constellation field that responds subtly to mouse parallax.
 */
export default function ThreeSanctuaryBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (isReducedMotion()) return;

    let renderer, scene, camera, particleGeometry, particleMaterial, lineGeometry, lineMaterial;
    let animationFrameId;
    let handleMouseMove, handleResize, handleVisibilityChange;

    try {
      // Scene, Camera, Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 40;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // fully transparent background
      mount.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('Three.js WebGL not available for sanctuary background:', err);
      return;
    }

    // Create 3D Particle Cloud
    const particleCount = 85;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];

    // StudyArc warm palette
    const colorPalette = [
      new THREE.Color(0xf97316), // Orange-500
      new THREE.Color(0xf59e0b), // Amber-500
      new THREE.Color(0xfbbf24), // Amber-400
      new THREE.Color(0xea580c), // Orange-600
    ];

    for (let i = 0; i < particleCount; i++) {
      // Spread across a 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: Math.random() * 0.025 + 0.015, // gentle upward drift
        z: (Math.random() - 0.5) * 0.02,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture (soft circular glow)
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(249, 115, 22, 0.8)');
        gradient.addColorStop(0.7, 'rgba(245, 158, 11, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Subtle 3D Constellation Lines Geometry
    lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });

    const maxLines = 120;
    const linePositions = new Float32Array(maxLines * 6);
    lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse Parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 6;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * -6;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle Window Resize
    handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Pause when tab is inactive to save battery and GPU cycles
    let isTabVisible = true;
    handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Damped camera sway
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;
      camera.position.x = currentMouseX;
      camera.position.y = currentMouseY;
      camera.lookAt(0, 0, 0);

      // Update particles
      const pos = particleGeometry.attributes.position.array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const vel = velocities[i];
        pos[i * 3] += vel.x + Math.sin(elapsedTime * 0.5 + vel.pulseOffset) * 0.015;
        pos[i * 3 + 1] += vel.y;
        pos[i * 3 + 2] += vel.z;

        // Wrap around boundaries
        if (pos[i * 3 + 1] > 30) pos[i * 3 + 1] = -30;
        if (pos[i * 3] > 40) pos[i * 3] = -40;
        if (pos[i * 3] < -40) pos[i * 3] = 40;

        // Connect nearby particles with constellation lines
        for (let j = i + 1; j < particleCount && lineIndex < maxLines; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 130) {
            linePositions[lineIndex * 6] = pos[i * 3];
            linePositions[lineIndex * 6 + 1] = pos[i * 3 + 1];
            linePositions[lineIndex * 6 + 2] = pos[i * 3 + 2];
            linePositions[lineIndex * 6 + 3] = pos[j * 3];
            linePositions[lineIndex * 6 + 4] = pos[j * 3 + 1];
            linePositions[lineIndex * 6 + 5] = pos[j * 3 + 2];
            lineIndex++;
          }
        }
      }

      // Zero out unused line segments
      for (let k = lineIndex * 6; k < maxLines * 6; k++) {
        linePositions[k] = 0;
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;

      // Slow global constellation rotation
      particles.rotation.y = elapsedTime * 0.015;
      lines.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (handleVisibilityChange) document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (mount && renderer?.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      particleGeometry?.dispose();
      particleMaterial?.dispose();
      lineGeometry?.dispose();
      lineMaterial?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 overflow-hidden"
      aria-hidden="true"
    />
  );
}
