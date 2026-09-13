import React, { useEffect, useRef } from 'react';

/**
 * AmbientSanctuaryParticles
 * A lightweight, high-performance 2D Canvas ambient particle effect
 * producing subtle floating warm sanctuary motes and embers in the background.
 */
export default function AmbientSanctuaryParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm sanctuary palette
    const colors = [
      'rgba(249, 115, 22, ', // orange-500
      'rgba(245, 158, 11, ', // amber-500
      'rgba(251, 191, 36, ', // amber-400
      'rgba(234, 88, 12, ',  // orange-600
    ];

    const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.28 + 0.08,
        alpha: 0.1,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.12), // gentle upward float
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let tick = 0;
    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        tick += 1;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx + Math.sin(tick * 0.015 + p.pulseOffset) * 0.15;
          p.y += p.vy;

          // Wrap edges
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Gentle alpha pulsing
          const pulse = (Math.sin(tick * p.pulseSpeed + p.pulseOffset) + 1) / 2;
          p.alpha = p.baseAlpha * (0.6 + pulse * 0.4);

          // Draw soft glowing particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorPrefix}${p.alpha})`;
          ctx.fill();

          // Extra soft outer halo for larger particles
          if (p.radius > 1.4) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `${p.colorPrefix}${p.alpha * 0.25})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
