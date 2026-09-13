import { useEffect } from 'react';
import gsap, { ScrollTrigger, isReducedMotion } from './gsapConfig';

/**
 * Hook to reveal items on scroll using GSAP ScrollTrigger
 * @param {React.RefObject} containerRef - Scroller element ref
 * @param {string} itemSelector - CSS selector for items to reveal
 * @param {Object} [options]
 */
export function useScrollReveal(containerRef, itemSelector, options = {}) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isReducedMotion()) {
      const items = container.querySelectorAll(itemSelector);
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(itemSelector);
      if (!items || items.length === 0) return;

      ScrollTrigger.batch(items, {
        scroller: container,
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              opacity: 0,
              y: options.y || 18,
              scale: options.scale || 0.985
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: options.duration || 0.45,
              stagger: options.stagger || 0.07,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
              overwrite: 'auto'
            }
          );
        },
        once: true
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, itemSelector, options.y, options.duration, options.stagger, options.scale]);
}

/**
 * DmitriNaumov-style GSAP ScrollTrigger Parallax Hook
 * Directly inspired by https://github.com/DmitriNaumov/Paralax-effect-with-gsap-scrolltrigger
 * 
 * Supports:
 * - scrub: 1.9 inertia
 * - Rotating geometric wireframe squares (.parallax-square with 720 deg rotation)
 * - Differential velocity multipliers ([data-speed] for Y and [data-speed-x] for X)
 * - Multi-directional title separation (.parallax-title yPercent, .parallax-stroke xPercent)
 * - Marquee ribbons drifting horizontally (.parallax-marquee) with rotating stars (.parallax-star)
 * - Card/image mask scaling and counter-motion (.parallax-image-wrap and .parallax-image)
 * - Letter dispersion ([data-speed] on characters)
 * 
 * @param {React.RefObject} containerRef - Scroll container ref
 * @param {Object} [options]
 */
export function useDmitriParallax(containerRef, options = {}) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const scroller = container;
      const scrub = options.scrub ?? 1.9;

      // 1. Rotating geometric wireframe squares (720 deg on scrub)
      const squares = container.querySelectorAll('.parallax-square');
      squares.forEach((sq) => {
        const deg = parseFloat(sq.getAttribute('data-rotation')) || 720;
        gsap.to(sq, {
          rotation: deg,
          ease: 'none',
          scrollTrigger: {
            trigger: sq.closest('.parallax-section') || sq,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub
          }
        });
      });

      // 2. Differential Speed Elements [data-speed] (y-axis offset on scrub)
      const speedElements = container.querySelectorAll('[data-speed]');
      speedElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0;
        if (speed === 0) return;
        const trigger = el.closest('.parallax-section') || el;
        gsap.to(el, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub
          }
        });
      });

      // 3. Differential Speed Elements [data-speed-x] (x-axis offset on scrub)
      const speedXElements = container.querySelectorAll('[data-speed-x]');
      speedXElements.forEach((el) => {
        const speedX = parseFloat(el.getAttribute('data-speed-x')) || 0;
        if (speedX === 0) return;
        const trigger = el.closest('.parallax-section') || el;
        gsap.to(el, {
          x: speedX,
          ease: 'none',
          scrollTrigger: {
            trigger,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub
          }
        });
      });

      // 4. Hero / Header Title Parallax Separation (yPercent & xPercent)
      const titleParallax = container.querySelectorAll('.parallax-title');
      titleParallax.forEach((t) => {
        const trigger = t.closest('.parallax-section') || t;
        const yPct = parseFloat(t.getAttribute('data-y-percent')) || -80;
        gsap.to(t, {
          yPercent: yPct,
          ease: 'none',
          scrollTrigger: {
            trigger,
            scroller,
            start: 'top top',
            end: 'bottom top',
            scrub
          }
        });
      });

      const strokeParallax = container.querySelectorAll('.parallax-stroke');
      strokeParallax.forEach((s) => {
        const trigger = s.closest('.parallax-section') || s;
        const xPct = parseFloat(s.getAttribute('data-x-percent')) || 45;
        gsap.to(s, {
          xPercent: xPct,
          ease: 'none',
          scrollTrigger: {
            trigger,
            scroller,
            start: 'top top',
            end: 'bottom top',
            scrub
          }
        });
      });

      // 5. Marquee Ticker Drift & Spinning Star Accents
      const marquees = container.querySelectorAll('.parallax-marquee');
      marquees.forEach((m) => {
        const trigger = m.closest('.parallax-section') || m;
        const xPct = parseFloat(m.getAttribute('data-marquee-speed')) || -40;
        gsap.to(m, {
          xPercent: xPct,
          ease: 'none',
          scrollTrigger: {
            trigger,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub
          }
        });
      });

      const stars = container.querySelectorAll('.parallax-star');
      stars.forEach((st) => {
        const trigger = st.closest('.parallax-section') || st;
        gsap.to(st, {
          rotate: -720,
          ease: 'none',
          scrollTrigger: {
            trigger,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub
          }
        });
      });

      // 6. Image Mask & Counter-Scale Parallax
      const imageWraps = container.querySelectorAll('.parallax-image-wrap');
      imageWraps.forEach((wrap) => {
        const trigger = wrap.closest('.parallax-section') || wrap;
        const yPct = parseFloat(wrap.getAttribute('data-wrap-y')) || 30;
        gsap.to(wrap, {
          yPercent: yPct,
          ease: 'none',
          scrollTrigger: {
            trigger,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub
          }
        });

        const img = wrap.querySelector('.parallax-image');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.35 },
            {
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger,
                scroller,
                start: 'top bottom',
                end: 'bottom top',
                scrub
              }
            }
          );
        }
      });

      // Refresh ScrollTrigger after DOM measurement
      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [containerRef, options.scrub]);
}
