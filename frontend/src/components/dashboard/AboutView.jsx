import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Flame, Trophy, Bot, Music } from 'lucide-react';
import { useScrollReveal, useDmitriParallax } from '../../animations/scrollAnimations';
import { init3DTilt } from '../../animations/cardAnimations';

export default function AboutView() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // GSAP ScrollTrigger scroller reveal
  useScrollReveal(containerRef, '.about-card', {
    stagger: 0.07,
    y: 18,
    duration: 0.45
  });

  // DmitriNaumov ScrollTrigger Parallax
  useDmitriParallax(containerRef, { scrub: 1.9 });

  useEffect(() => {
    const cleanups = [];
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.about-card');
      cards.forEach((card) => {
        cleanups.push(init3DTilt(card, { maxTilt: 4, perspective: 900, scale: 1.01 }));
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="parallax-section h-full w-full p-6 sm:p-8 bg-black overflow-y-auto custom-scrollbar text-zinc-200 select-none perspective-1000"
    >
      <div className="max-w-3xl mx-auto space-y-6 relative">
        {/* DmitriNaumov Rotating Wireframe Square behind Header */}
        <div
          className="parallax-square w-28 h-28 top-4 left-6 -translate-x-1/2 -translate-y-1/2 border border-orange-500/20 pointer-events-none rounded-xl"
          data-rotation="720"
        />

        {/* Header */}
        <div className="about-card flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-600/30 text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-syne text-white">
              About Study<span className="text-orange-500">Arc</span>
            </h1>
            <p className="text-xs text-zinc-400">
              A gamified virtual study sanctuary built for lifelong learners.
            </p>
          </div>
        </div>

        {/* Philosophy Card */}
        <div className="about-card p-5 rounded-2xl bg-[#0c0d11] border border-zinc-850 space-y-2.5 hover:border-orange-500/30 transition-all relative z-10">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>✨ The Vision</span>
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            StudyArc turns daily studying into an encouraging, aesthetic habit. By combining the proven **Pomodoro Technique**, soothing **LoFi beats**, **XP leveling tiers**, and AI assistance from **Google Gemini**, StudyArc helps you turn small daily sessions into massive personal growth.
          </p>
        </div>

        {/* Core Pillars Grid with DmitriNaumov /01 - /04 differential scrub numerals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          <div className="about-card p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 hover:border-orange-500/40 hover:-translate-y-0.5 hover:shadow-md transition-all space-y-1.5 preserve-3d relative overflow-hidden">
            <span
              className="absolute right-3 bottom-2 text-4xl sm:text-5xl font-black stroke-text select-none opacity-40 pointer-events-none will-change-transform"
              data-speed="-35"
            >
              /01
            </span>
            <div className="tilt-depth-lg flex items-center gap-2 text-orange-400 font-bold text-xs">
              <Flame className="w-3.5 h-3.5" />
              <span>Calendar-Based Streaks</span>
            </div>
            <p className="tilt-depth-md text-[11px] text-zinc-500 leading-relaxed pr-10">
              Streaks compare calendar days in UTC midnight so your morning and evening sessions count accurately towards your momentum.
            </p>
          </div>

          <div className="about-card p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 hover:border-amber-500/40 hover:-translate-y-0.5 hover:shadow-md transition-all space-y-1.5 preserve-3d relative overflow-hidden">
            <span
              className="absolute right-3 bottom-2 text-4xl sm:text-5xl font-black stroke-text select-none opacity-40 pointer-events-none will-change-transform"
              data-speed="-55"
            >
              /02
            </span>
            <div className="tilt-depth-lg flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Trophy className="w-3.5 h-3.5" />
              <span>XP & Level Progression</span>
            </div>
            <p className="tilt-depth-md text-[11px] text-zinc-500 leading-relaxed pr-10">
              1 study minute = 1 XP. Progress through level thresholds and compare your consistency on the global StudyArc leaderboard.
            </p>
          </div>

          <div className="about-card p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 hover:border-orange-500/40 hover:-translate-y-0.5 hover:shadow-md transition-all space-y-1.5 preserve-3d relative overflow-hidden">
            <span
              className="absolute right-3 bottom-2 text-4xl sm:text-5xl font-black stroke-text select-none opacity-40 pointer-events-none will-change-transform"
              data-speed="-40"
            >
              /03
            </span>
            <div className="tilt-depth-lg flex items-center gap-2 text-orange-400 font-bold text-xs">
              <Bot className="w-3.5 h-3.5" />
              <span>Google Gemini AI Tutor</span>
            </div>
            <p className="tilt-depth-md text-[11px] text-zinc-500 leading-relaxed pr-10">
              Ask coding or academic questions anytime in your workspace. Gemini provides concise explanations and analogies.
            </p>
          </div>

          <div className="about-card p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 hover:border-amber-500/40 hover:-translate-y-0.5 hover:shadow-md transition-all space-y-1.5 preserve-3d relative overflow-hidden">
            <span
              className="absolute right-3 bottom-2 text-4xl sm:text-5xl font-black stroke-text select-none opacity-40 pointer-events-none will-change-transform"
              data-speed="-60"
            >
              /04
            </span>
            <div className="tilt-depth-lg flex items-center gap-2 text-amber-500 font-bold text-xs">
              <Music className="w-3.5 h-3.5" />
              <span>LoFi Soundscapes</span>
            </div>
            <p className="tilt-depth-md text-[11px] text-zinc-500 leading-relaxed pr-10">
              Enjoy curated 24/7 relaxing chill streams or paste any YouTube study stream directly inside your workspace.
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center pt-2 relative z-10">
          <button
            onClick={() => navigate('/room')}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-sm shadow-orange-500/25 active:scale-95 transition-all"
          >
            Back to Study Room
          </button>
        </div>
      </div>
    </div>
  );
}
