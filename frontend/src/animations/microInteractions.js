import { useEffect } from 'react';
import gsap, { isReducedMotion, isTouchDevice } from './gsapConfig';

/**
 * Attaches magnetic cursor attraction and 3D press effect to a button
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @returns {Function} Cleanup function
 */
export function initMagneticButton(element, options = {}) {
  if (!element || isReducedMotion() || isTouchDevice()) return () => {};

  const {
    strength = 0.28,
    maxDistance = 14,
    speed = 0.25,
    returnSpeed = 0.55
  } = options;

  let bounds = null;

  const onMouseEnter = () => {
    bounds = element.getBoundingClientRect();
  };

  const onMouseMove = (e) => {
    if (!bounds) bounds = element.getBoundingClientRect();

    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

    gsap.to(element, {
      x: clampedX,
      y: clampedY,
      duration: speed,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  };

  const onMouseDown = () => {
    gsap.to(element, {
      scale: 0.94,
      duration: 0.12,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const onMouseUp = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.25,
      ease: 'elastic.out(1, 0.3)',
      overwrite: 'auto'
    });
  };

  const onMouseLeave = () => {
    bounds = null;
    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: returnSpeed,
      ease: 'elastic.out(1, 0.4)',
      clearProps: 'transform',
      overwrite: 'auto'
    });
  };

  element.addEventListener('mouseenter', onMouseEnter);
  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mouseup', onMouseUp);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', onMouseEnter);
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('mouseup', onMouseUp);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
}

/**
 * Hook for magnetic button interaction
 * @param {React.RefObject} ref
 * @param {Object} [options]
 * @param {boolean} [enabled=true]
 */
export function useMagneticButton(ref, options = {}, enabled = true) {
  const { strength, maxDistance } = options;
  useEffect(() => {
    if (!enabled || !ref.current) return;
    return initMagneticButton(ref.current, { strength, maxDistance });
  }, [ref, enabled, strength, maxDistance]);
}

/**
 * Attaches subtle 3D hover and click press animation to a button
 * @param {HTMLElement} element
 * @returns {Function} Cleanup function
 */
export function initButtonMicroInteraction(element) {
  if (!element || isReducedMotion()) return () => {};

  const onMouseEnter = () => {
    gsap.to(element, {
      y: -1,
      scale: 1.02,
      duration: 0.2,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  };

  const onMouseDown = () => {
    gsap.to(element, {
      y: 1,
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const onMouseUp = () => {
    gsap.to(element, {
      y: -1,
      scale: 1.02,
      duration: 0.15,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      clearProps: 'transform',
      overwrite: 'auto'
    });
  };

  element.addEventListener('mouseenter', onMouseEnter);
  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mouseup', onMouseUp);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', onMouseEnter);
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseup', onMouseUp);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
}

/**
 * Hook for button press and hover micro-interaction
 * @param {React.RefObject} ref
 * @param {boolean} [enabled=true]
 */
export function useButtonMicro(ref, enabled = true) {
  useEffect(() => {
    if (!enabled || !ref.current) return;
    return initButtonMicroInteraction(ref.current);
  }, [ref, enabled]);
}

/**
 * Animate tab switch pop
 * @param {HTMLElement} tabElement
 */
export function animateTabSwitch(tabElement) {
  if (!tabElement || isReducedMotion()) return;

  gsap.fromTo(
    tabElement,
    { scale: 0.94, opacity: 0.9 },
    { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(2)', clearProps: 'transform' }
  );
}

/**
 * Premium 3D Modal Open Entrance
 * @param {HTMLElement} modalCard
 * @param {HTMLElement} [backdrop]
 */
export function animateModalOpen(modalCard, backdrop) {
  if (!modalCard) return;

  if (isReducedMotion()) {
    gsap.fromTo(modalCard, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    if (backdrop) gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    return;
  }

  if (backdrop) {
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
  }

  gsap.fromTo(
    modalCard,
    {
      scale: 0.92,
      opacity: 0,
      y: 14,
      rotateX: 6,
      transformPerspective: 800
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.35,
      ease: 'back.out(1.5)',
      clearProps: 'transformPerspective'
    }
  );
}

/**
 * Premium 3D Modal Close Exit
 * @param {HTMLElement} modalCard
 * @param {HTMLElement} [backdrop]
 * @param {Function} [onComplete]
 */
export function animateModalClose(modalCard, backdrop, onComplete) {
  if (!modalCard) {
    if (onComplete) onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  if (backdrop) {
    tl.to(backdrop, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0);
  }

  tl.to(
    modalCard,
    {
      scale: 0.94,
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: 'power2.in'
    },
    0
  );
}
