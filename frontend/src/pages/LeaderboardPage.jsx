import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LeaderboardWidget from '../components/widgets/LeaderboardWidget';
import { init3DTilt } from '../animations/cardAnimations';

export default function LeaderboardPage() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const cleanups = [];
    if (cardRef.current) {
      cleanups.push(init3DTilt(cardRef.current, { maxTilt: 3, perspective: 1200, scale: 1.01 }));
    }

    if (containerRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24, scale: 0.97, rotateX: 6 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' }
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full p-4 sm:p-6 bg-black overflow-hidden flex flex-col items-center justify-center perspective-1200 relative select-none"
    >
      {/* Subtle warm halo backdrop */}
      <div className="absolute w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none -z-10" />

      <div ref={cardRef} className="max-w-2xl w-full h-[85%] max-h-[700px] preserve-3d will-change-transform">
        <LeaderboardWidget />
      </div>
    </div>
  );
}
