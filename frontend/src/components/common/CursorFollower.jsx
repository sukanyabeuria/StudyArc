import React, { useEffect, useRef } from 'react';
import gsap, { isReducedMotion, isTouchDevice } from '../../animations/gsapConfig';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || isReducedMotion() || isTouchDevice()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for 60+ FPS zero-lag interpolation
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList?.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      );

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1.65,
          borderColor: 'rgba(249, 115, 22, 0.65)',
          backgroundColor: 'rgba(249, 115, 22, 0.08)',
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(249, 115, 22, 0.25)',
          backgroundColor: 'rgba(249, 115, 22, 0)',
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.12, ease: 'power2.out' });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (typeof window !== 'undefined' && (isReducedMotion() || isTouchDevice())) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Outer subtle follower ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border border-orange-500/25 opacity-0 transition-[border-color,background-color] duration-150 will-change-transform"
        style={{ transform: 'translate(-100px, -100px)' }}
      />

      {/* Center glowing micro dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.8)] opacity-0 will-change-transform"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </div>
  );
}
