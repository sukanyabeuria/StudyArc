import { useEffect } from 'react';
import gsap, { isReducedMotion, isTouchDevice } from './gsapConfig';

/**
 * Attaches interactive 3D perspective tilt to a DOM element with inner element depth
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @returns {Function} Cleanup function
 */
export function init3DTilt(element, options = {}) {
  if (!element || isReducedMotion() || isTouchDevice()) return () => {};

  const {
    maxTilt = 6,
    perspective = 1000,
    scale = 1.015,
    speed = 0.2,
    returnSpeed = 0.5,
    glare = true
  } = options;

  let bounds = null;

  // Ensure 3D context
  element.style.transformStyle = 'preserve-3d';

  // Optional subtle specular glare element
  let glareEl = null;
  if (glare) {
    glareEl = element.querySelector('.tilt-glare');
    if (!glareEl) {
      glareEl = document.createElement('div');
      glareEl.className = 'tilt-glare pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300';
      glareEl.style.zIndex = '10';
      element.appendChild(glareEl);
    }
  }

  // Find inner depth elements
  const depthElements = element.querySelectorAll('[data-depth], .tilt-depth-lg, .tilt-depth-md, .tilt-depth-sm');

  const onMouseEnter = () => {
    bounds = element.getBoundingClientRect();
    if (glareEl) {
      gsap.to(glareEl, { opacity: 1, duration: 0.2, ease: 'power1.out', overwrite: 'auto' });
    }
  };

  const onMouseMove = (e) => {
    if (!bounds) bounds = element.getBoundingClientRect();

    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width) - 0.5;
    const yPct = (mouseY / bounds.height) - 0.5;

    const rotateY = Number((xPct * (maxTilt * 2)).toFixed(2));
    const rotateX = Number((-yPct * (maxTilt * 2)).toFixed(2));

    gsap.to(element, {
      rotateX,
      rotateY,
      scale,
      transformPerspective: perspective,
      transformOrigin: 'center center',
      duration: speed,
      ease: 'power1.out',
      overwrite: 'auto'
    });

    // Move internal depth elements in 3D (translateZ)
    if (depthElements.length > 0) {
      depthElements.forEach((child) => {
        const depth = parseFloat(child.getAttribute('data-depth')) || 
          (child.classList.contains('tilt-depth-lg') ? 24 :
           child.classList.contains('tilt-depth-md') ? 14 : 8);

        gsap.to(child, {
          z: depth,
          x: xPct * (depth * 0.4),
          y: yPct * (depth * 0.4),
          duration: speed,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      });
    }

    // Dynamic specular glare follow
    if (glareEl) {
      const glareX = (mouseX / bounds.width) * 100;
      const glareY = (mouseY / bounds.height) * 100;
      glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 65%)`;
    }
  };

  const onMouseLeave = () => {
    bounds = null;
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: returnSpeed,
      ease: 'power2.out',
      clearProps: 'transformPerspective',
      overwrite: 'auto'
    });

    if (depthElements.length > 0) {
      depthElements.forEach((child) => {
        gsap.to(child, {
          z: 0,
          x: 0,
          y: 0,
          duration: returnSpeed,
          ease: 'power2.out',
          clearProps: 'transform',
          overwrite: 'auto'
        });
      });
    }

    if (glareEl) {
      gsap.to(glareEl, { opacity: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    }
  };

  element.addEventListener('mouseenter', onMouseEnter);
  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', onMouseEnter);
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
}

/**
 * Hook to easily add 3D tilt to any card or widget ref
 * @param {React.RefObject} ref
 * @param {Object} [options]
 * @param {boolean} [enabled=true]
 */
export function use3DCardTilt(ref, options = {}, enabled = true) {
  const { maxTilt, perspective, scale, speed, returnSpeed, glare } = options;
  useEffect(() => {
    if (!enabled || !ref.current) return;
    return init3DTilt(ref.current, { maxTilt, perspective, scale, speed, returnSpeed, glare });
  }, [ref, enabled, maxTilt, perspective, scale, speed, returnSpeed, glare]);
}

/**
 * Hook to add multi-layer 3D mouse parallax across a dashboard container
 * @param {React.RefObject} containerRef
 * @param {Object} [options]
 */
export function useDashboardParallax(containerRef, _options = {}) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isReducedMotion() || isTouchDevice()) return;

    let bounds = null;

    const onMouseEnter = () => {
      bounds = container.getBoundingClientRect();
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = container.getBoundingClientRect();

      const mouseX = e.clientX - (bounds.left + bounds.width / 2);
      const mouseY = e.clientY - (bounds.top + bounds.height / 2);

      // Layer 1: Background subtle float (depth: 0.012)
      const bgElements = container.querySelectorAll('[data-parallax="bg"], .parallax-bg');
      if (bgElements.length > 0) {
        gsap.to(bgElements, {
          x: mouseX * 0.012,
          y: mouseY * 0.012,
          duration: 0.4,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }

      // Layer 2: Midground cards / widgets (depth: 0.024)
      const midElements = container.querySelectorAll('[data-parallax="mid"], .workspace-widget');
      if (midElements.length > 0) {
        gsap.to(midElements, {
          x: mouseX * 0.024,
          y: mouseY * 0.024,
          duration: 0.35,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }

      // Layer 3: Foreground badges / floating controls (depth: 0.045)
      const fgElements = container.querySelectorAll('[data-parallax="fg"], .parallax-fg');
      if (fgElements.length > 0) {
        gsap.to(fgElements, {
          x: mouseX * 0.045,
          y: mouseY * 0.045,
          duration: 0.3,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    };

    const onMouseLeave = () => {
      bounds = null;
      const allLayers = container.querySelectorAll(
        '[data-parallax="bg"], .parallax-bg, [data-parallax="mid"], .workspace-widget, [data-parallax="fg"], .parallax-fg'
      );
      if (allLayers.length > 0) {
        gsap.to(allLayers, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [containerRef]);
}

/**
 * Animate card grids with subtle stagger and depth entrance
 * @param {string|HTMLElement[]} targets
 * @param {React.RefObject|HTMLElement} [scope]
 * @param {Object} [options]
 * @returns {gsap.core.Tween|null}
 */
export function animateCardsEntrance(targets, scope, options = {}) {
  const {
    stagger = 0.06,
    duration = 0.45,
    y = 18,
    scale = 0.985,
    ease = 'power2.out'
  } = options;

  if (isReducedMotion()) {
    return gsap.fromTo(
      targets,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, stagger: 0.03, clearProps: 'opacity' }
    );
  }

  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y,
      scale,
      rotateX: 4,
      transformPerspective: 900
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration,
      stagger,
      ease,
      clearProps: 'opacity,transform,transformPerspective'
    }
  );
}
