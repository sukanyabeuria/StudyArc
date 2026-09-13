import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition({ children }) {
  const location = useLocation();
  const curtainRef = useRef(null);
  const curtainLineRef = useRef(null);
  const contentRef = useRef(null);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Only animate on actual path change
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Wipe curtain in from left
      tl.set(curtainRef.current, { xPercent: -100, display: 'block' })
        .set(curtainLineRef.current, { scaleY: 0, opacity: 1 })
        .to(curtainRef.current, {
          xPercent: 0,
          duration: 0.35,
          ease: 'power3.inOut'
        })
        .to(
          curtainLineRef.current,
          {
            scaleY: 1,
            duration: 0.2,
            ease: 'expo.out'
          },
          '-=0.1'
        )
        // Wipe curtain out to the right
        .to(curtainRef.current, {
          xPercent: 100,
          duration: 0.35,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(curtainRef.current, { display: 'none' });
          }
        })
        // Reveal content with smooth entrance
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div className="relative h-full w-full overflow-hidden" data-barba="wrapper">
      {/* Barba-style Transition Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-50 pointer-events-none hidden bg-[#0a0c10] border-r-2 border-orange-500 shadow-2xl shadow-orange-500/30 flex items-center justify-center"
      >
        <div
          ref={curtainLineRef}
          className="w-1 h-20 bg-gradient-to-b from-orange-500 via-amber-400 to-transparent rounded-full"
        />
      </div>

      {/* Page Content Container */}
      <div
        ref={contentRef}
        className="h-full w-full"
        data-barba="container"
        data-barba-namespace={location.pathname.replace('/', '') || 'home'}
      >
        {children}
      </div>
    </div>
  );
}
