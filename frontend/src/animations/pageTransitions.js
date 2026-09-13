import { useEffect } from 'react';
import gsap, { isReducedMotion } from './gsapConfig';

/**
 * Animate page entrance with cinematic GSAP timeline hierarchy:
 * container -> heading -> subheading -> cards -> buttons/controls
 * @param {HTMLElement} container - Root element of the page to animate
 * @param {Function} [onComplete] - Callback executed when animation finishes
 * @returns {gsap.core.Timeline|null}
 */
export function animatePageEnter(container, onComplete) {
  if (!container) return null;

  if (isReducedMotion()) {
    return gsap.fromTo(
      container,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, clearProps: 'opacity', onComplete }
    );
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      // Clear inline transform/opacity props to ensure natural responsiveness
      gsap.set(container, { clearProps: 'transformPerspective' });
      if (onComplete) onComplete();
    }
  });

  // 1. Background / main container reveal
  tl.fromTo(
    container,
    {
      opacity: 0,
      scale: 0.988,
      y: 8,
      transformPerspective: 1000
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.32,
      ease: 'power2.out'
    }
  );

  // 2. Heading
  const headings = container.querySelectorAll('h1, .page-heading, .room-header h1, .landing-title');
  if (headings.length > 0) {
    tl.fromTo(
      headings,
      { opacity: 0, y: 18, rotateX: 6 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform' },
      '-=0.22'
    );
  }

  // 3. Subheading
  const subheadings = container.querySelectorAll('.page-subheading, .room-header p, .landing-subtitle');
  if (subheadings.length > 0) {
    tl.fromTo(
      subheadings,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'transform' },
      '-=0.24'
    );
  }

  // 4. Cards / Widgets
  const cards = container.querySelectorAll('.workspace-widget, .room-card, .landing-card, .about-card, .tilt-card, .leaderboard-row, .room-quote > div');
  if (cards.length > 0) {
    tl.fromTo(
      cards,
      { opacity: 0, y: 16, scale: 0.985, rotateX: 4 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.38,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      },
      '-=0.2'
    );
  }

  // 5. Controls / Buttons
  const controls = container.querySelectorAll('.page-controls, .landing-cta, .room-quote');
  if (controls.length > 0) {
    tl.fromTo(
      controls,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out', clearProps: 'transform' },
      '-=0.18'
    );
  }

  return tl;
}

/**
 * Animate page exit with fast scale-down and fade
 * @param {HTMLElement} element
 * @param {Function} [onComplete]
 * @returns {gsap.core.Tween|null}
 */
export function animatePageExit(element, onComplete) {
  if (!element || isReducedMotion()) {
    if (onComplete) onComplete();
    return null;
  }

  return gsap.to(element, {
    opacity: 0,
    scale: 0.985,
    y: -6,
    duration: 0.18,
    ease: 'power2.in',
    onComplete
  });
}

/**
 * React hook for seamless route transitions
 * @param {React.RefObject} containerRef
 * @param {any} dependencyKey - Typically location.pathname
 */
export function usePageTransition(containerRef, dependencyKey) {
  useEffect(() => {
    if (!containerRef.current) return;

    const anim = animatePageEnter(containerRef.current);
    return () => {
      if (anim) anim.kill();
    };
  }, [containerRef, dependencyKey]);
}
