import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Trophy, Sparkles, ArrowRight, X } from 'lucide-react';
import { triggerCelebrationConfetti, triggerMicroSparkles } from '../../animations/rewardAnimations';
import { useMagneticButton } from '../../animations/microInteractions';

export default function LevelUpRewardModal({ open, level, xpGained = 25, onClose }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const shockwaveRef = useRef(null);
  const cardRef = useRef(null);
  const trophyRef = useRef(null);
  const xpCounterRef = useRef(null);
  const levelBadgeRef = useRef(null);
  const continueBtnRef = useRef(null);

  useMagneticButton(continueBtnRef, { strength: 0.28, maxDistance: 10 });

  useEffect(() => {
    if (!open) return;

    // Trigger celebration confetti and sparkles
    triggerCelebrationConfetti({ x: 0.5, y: 0.45 });
    triggerMicroSparkles({ x: 0.5, y: 0.35 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Screen-wide backdrop and shockwave expansion
      tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .fromTo(
          shockwaveRef.current,
          { scale: 0.3, opacity: 0.9 },
          { scale: 2.2, opacity: 0, duration: 0.8, ease: 'power2.out' },
          0
        )
        // 3D Card flip entrance with perspective
        .fromTo(
          cardRef.current,
          {
            scale: 0.4,
            rotateY: 100,
            rotateX: 12,
            opacity: 0,
            transformPerspective: 1000
          },
          {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'back.out(1.8)'
          },
          '-=0.15'
        )
        // 3D Floating Trophy bounce
        .fromTo(
          trophyRef.current,
          { scale: 0, rotate: -40, z: -50 },
          { scale: 1, rotate: 0, z: 25, duration: 0.55, ease: 'elastic.out(1, 0.4)' },
          '-=0.3'
        )
        // Level indicator focus scale & 3D rotation
        .fromTo(
          levelBadgeRef.current,
          { scale: 0.7, rotateY: 180 },
          { scale: 1, rotateY: 0, duration: 0.45, ease: 'back.out(2)' },
          '-=0.25'
        );

      // Animate XP counter text
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: xpGained,
        duration: 0.85,
        ease: 'power2.out',
        onUpdate: () => {
          if (xpCounterRef.current) {
            xpCounterRef.current.textContent = `+${Math.round(counterObj.val)} XP`;
          }
        }
      });
    }, modalRef);

    return () => ctx.revert();
  }, [open, level, xpGained]);

  if (!open) return null;

  const handleClose = () => {
    if (cardRef.current && backdropRef.current) {
      const tl = gsap.timeline({ onComplete: onClose });
      tl.to(cardRef.current, { scale: 0.9, opacity: 0, y: 15, duration: 0.22, ease: 'power2.in' }, 0);
      tl.to(backdropRef.current, { opacity: 0, duration: 0.22 }, 0);
    } else {
      onClose();
    }
  };

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Screen-wide shockwave glow ring */}
      <div
        ref={shockwaveRef}
        className="pointer-events-none absolute w-96 h-96 rounded-full bg-gradient-to-tr from-orange-500/30 to-amber-400/20 blur-2xl"
      />

      {/* 3D Reward Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm bg-[#0e1017] border border-orange-500/50 rounded-3xl p-6 text-center text-zinc-100 shadow-2xl preserve-3d"
        style={{
          boxShadow: '0 0 60px rgba(249, 115, 22, 0.4), 0 25px 50px -10px rgba(0,0,0,0.95)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 3D Floating Trophy */}
        <div className="flex justify-center mb-3">
          <div
            ref={trophyRef}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/40 text-white"
          >
            <Trophy className="w-8 h-8 drop-shadow-md" />
          </div>
        </div>

        {/* Badge & Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Level Up Achieved!</span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">
          Congratulations! 🎉
        </h2>

        <p className="text-xs text-zinc-300 mt-1 mb-4">
          Your hard work paid off. You advanced to tier:
        </p>

        {/* Level Highlight Box */}
        <div className="p-3 rounded-2xl bg-zinc-950 border border-orange-500/30 mb-5 flex items-center justify-around">
          <div ref={levelBadgeRef}>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">New Tier</span>
            <span className="text-xl font-black text-orange-400">Level {level || 2}</span>
          </div>

          <div className="h-7 w-px bg-zinc-800" />

          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Session Reward</span>
            <span ref={xpCounterRef} className="text-xl font-black text-amber-300">
              +{xpGained} XP
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          ref={continueBtnRef}
          onClick={handleClose}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Continue Studying</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
