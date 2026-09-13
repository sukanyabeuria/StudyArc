import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthContext';
import {
  Clock,
  CheckSquare,
  Users,
  Trophy,
  Bot,
  ArrowRight,
  Flame,
  Music,
  Star,
  Sparkles,
  Zap
} from 'lucide-react';
import { init3DTilt, useDashboardParallax } from '../../animations/cardAnimations';
import { useMagneticButton } from '../../animations/microInteractions';
import { useDmitriParallax } from '../../animations/scrollAnimations';
import ThreeHeroCrystal from '../three/ThreeHeroCrystal';

export default function LandingView({ autoAuth }) {
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const signInRef = useRef(null);

  useMagneticButton(primaryCtaRef, { strength: 0.3, maxDistance: 12 });
  useMagneticButton(signInRef, { strength: 0.25, maxDistance: 10 });
  useDashboardParallax(containerRef);
  useDmitriParallax(containerRef, { scrub: 1.9 });

  useEffect(() => {
    if (autoAuth === 'login' || autoAuth === 'signup') {
      openAuthModal(autoAuth);
    }
  }, [autoAuth, openAuthModal]);

  useEffect(() => {
    const cleanups = [];
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.landing-badge', { opacity: 0, y: -16, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45 })
        .fromTo('.landing-title-block', { opacity: 0, y: 28, scale: 0.97, rotateX: 6, transformPerspective: 900 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.65, clearProps: 'transformPerspective' }, '-=0.25')
        .fromTo('.landing-subtitle', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
        .fromTo('.landing-pill', { opacity: 0, scale: 0.88, y: 8 }, { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.4 }, '-=0.25')
        .fromTo('.landing-cta', { opacity: 0, y: 16, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45 }, '-=0.2')
        .fromTo('.landing-card', { opacity: 0, y: 22, scale: 0.96, rotateX: 6 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.08, duration: 0.5, clearProps: 'transform' }, '-=0.2');
    }, containerRef);

    // Attach 3D tilt with specular glare to feature and pillar cards
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.landing-card, .tilt-card');
      cards.forEach((card) => {
        cleanups.push(init3DTilt(card, { maxTilt: 5, perspective: 850, scale: 1.02 }));
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const handleStart = () => {
    navigate('/room');
  };

  const featurePills = [
    { icon: Clock, label: 'Pomodoro Timer', path: '/pomodoro' },
    { icon: CheckSquare, label: 'Personal To-Do', path: '/todo' },
    { icon: Users, label: 'Live Study Room', path: '/study-room' },
    { icon: Trophy, label: 'XP Leaderboard', path: '/leaderboard' },
    { icon: Bot, label: 'Gemini AI Tutor', path: '/ai' },
  ];

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-black overflow-y-auto custom-scrollbar select-none text-zinc-100 px-6 sm:px-12 py-8 space-y-24 perspective-1000"
    >
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH DMITRINAUMOV PARALLAX TITLE & ROTATING SQUARE        */}
      {/* ========================================================================= */}
      <section className="parallax-section relative min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto pt-6 pb-12">
        {/* Interactive 3D Focus Crystal (Three.js WebGL) */}
        <div className="hidden lg:block absolute -top-4 right-0 w-80 h-80 pointer-events-none z-0 opacity-85">
          <ThreeHeroCrystal />
        </div>

        {/* Ambient floating speed badges (differential velocities) */}
        <div
          data-speed="-140"
          className="hidden md:flex absolute top-10 right-8 items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold shadow-lg shadow-orange-500/5 preserve-3d pointer-events-none"
        >
          <Flame className="w-4 h-4 animate-bounce" />
          <span>7-Day Study Streak</span>
        </div>

        <div
          data-speed="-220"
          className="hidden md:flex absolute top-44 right-0 items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-500/5 preserve-3d pointer-events-none"
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>+25 XP per Session</span>
        </div>

        <div
          data-speed="-90"
          className="hidden md:flex absolute bottom-20 right-16 items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs font-semibold shadow-lg preserve-3d pointer-events-none"
        >
          <Bot className="w-4 h-4 text-orange-400" />
          <span>Gemini AI Study Tutor</span>
        </div>

        {/* Live Pill */}
        <div className="landing-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400 mb-6 w-fit">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Gamified Study Together Experience</span>
        </div>

        {/* Title with Parallax & Rotating Geometric Square */}
        <div className="landing-title-block relative inline-block mb-6">
          {/* DmitriNaumov Geometric Square rotating 720 deg on scrub */}
          <div
            className="parallax-square w-32 h-32 sm:w-52 sm:h-52 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-orange-500/20 pointer-events-none rounded-2xl"
            data-rotation="720"
          />

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
            <span
              className="parallax-title block text-white will-change-transform"
              data-y-percent="-50"
            >
              Study Together,
            </span>
            <span
              className="parallax-stroke block stroke-text font-black will-change-transform mt-2"
              data-x-percent="35"
            >
              Grow Together
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="landing-subtitle text-sm sm:text-lg text-zinc-400 max-w-xl mb-8 leading-relaxed">
          A gamified study app to keep you focused, consistent and motivated with Pomodoro intervals, daily streaks, leveling tiers, and Google Gemini.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 relative z-20">
          {featurePills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(pill.path)}
                className="landing-pill flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-sm hover:border-orange-500/50 hover:text-orange-300 hover:bg-zinc-900 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title={`Open ${pill.label}`}
              >
                <Icon className="w-3.5 h-3.5 text-orange-400" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="landing-cta flex items-center gap-3 relative z-20">
          <button
            ref={primaryCtaRef}
            type="button"
            onClick={handleStart}
            className="group flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {!isAuthenticated && (
            <button
              ref={signInRef}
              type="button"
              onClick={() => openAuthModal('login')}
              className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-semibold rounded-xl transition-all active:scale-95 hover:border-zinc-700 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DMITRINAUMOV DRIFTING MARQUEE RIBBON WITH ROTATING STAR ACCENTS         */}
      {/* ========================================================================= */}
      <section className="parallax-section -mx-6 sm:-mx-12 py-3.5 bg-zinc-950/90 border-y border-zinc-850 overflow-hidden select-none">
        <div
          className="parallax-marquee flex items-center gap-8 whitespace-nowrap will-change-transform"
          data-marquee-speed="-35"
        >
          {[1, 2, 3].map((rep) => (
            <React.Fragment key={rep}>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-400">Deep Focus Pomodoro</span>
              <span className="parallax-star inline-block text-orange-500"><Star className="w-4 h-4 fill-orange-500" /></span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400">Level Up with XP</span>
              <span className="parallax-star inline-block text-amber-500"><Star className="w-4 h-4 fill-amber-500" /></span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-400">Google Gemini AI Tutor</span>
              <span className="parallax-star inline-block text-orange-500"><Star className="w-4 h-4 fill-orange-500" /></span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400">24/7 LoFi Beats</span>
              <span className="parallax-star inline-block text-amber-500"><Star className="w-4 h-4 fill-amber-500" /></span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-400">Calendar Streaks</span>
              <span className="parallax-star inline-block text-orange-500"><Star className="w-4 h-4 fill-orange-500" /></span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT THE SANCTUARY (SPLIT PARALLAX IMAGE COUNTER-SCALE & COPY)        */}
      {/* ========================================================================= */}
      <section className="parallax-section max-w-5xl mx-auto py-12">
        <div className="relative inline-block mb-10">
          <div
            className="parallax-square w-24 h-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-orange-500/25 pointer-events-none rounded-xl"
            data-rotation="720"
          />
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white relative z-10">
            THE <span className="stroke-text">SANCTUARY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Parallax Image Wrap with Counter-Scaling Inner Visual */}
          <div
            className="parallax-image-wrap overflow-hidden rounded-2xl border border-zinc-800 bg-[#0c0d11] p-6 shadow-2xl relative"
            data-wrap-y="30"
          >
            <div className="parallax-image will-change-transform space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Virtual Focus Chamber</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-semibold">LIVE</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-2">
                <p className="text-xs text-zinc-300 font-semibold">Pomodoro Technique & AI Co-Pilot</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  25-minute intervals engineered for maximum neuroplasticity. Ask questions to Gemini and track your daily streak automatically.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center">
                  <span className="block text-sm font-bold text-white">100%</span>
                  <span className="text-[10px] text-zinc-500">Distraction Free</span>
                </div>
                <div className="flex-1 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center">
                  <span className="block text-sm font-bold text-orange-400">1 Min</span>
                  <span className="text-[10px] text-zinc-500">= 1 XP Earned</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Block with Counter Scrub Translation */}
          <div data-speed="-50" className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Built for Lifelong Learners & Peak Flow
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              StudyArc replaces monotonous solo study sessions with a responsive, interactive sanctuary. Every minute you spend studying translates into authentic progression on your personal dashboard.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Synchronized Pomodoro timer with celebration milestones</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Ambient LoFi beats for uninterrupted focus</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span>Google Gemini AI Study Tutor on standby</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE PILLARS WITH DMITRINAUMOV OVERSIZED STROKE NUMERALS (/01 - /04)    */}
      {/* ========================================================================= */}
      <section className="parallax-section max-w-5xl mx-auto py-12">
        <div className="relative inline-block mb-10">
          <div
            className="parallax-square w-24 h-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-amber-500/25 pointer-events-none rounded-xl"
            data-rotation="-720"
          />
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white relative z-10">
            CORE <span className="stroke-text">PILLARS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar /01 */}
          <div
            onClick={() => navigate('/room')}
            className="tilt-card p-5 rounded-2xl bg-[#0c0d11] border border-zinc-850 hover:border-orange-500/40 transition-all flex flex-col justify-between group preserve-3d cursor-pointer active:scale-[0.98]"
            title="Open Study Room"
          >
            <span
              className="text-5xl sm:text-6xl font-black stroke-text block will-change-transform mb-4 group-hover:text-orange-500/30 transition-colors"
              data-speed="-140"
            >
              /01
            </span>
            <div>
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Calendar Streaks</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Compare calendar days accurately in UTC midnight to maintain your daily focus habit.
              </p>
            </div>
          </div>

          {/* Pillar /02 */}
          <div
            onClick={() => navigate('/leaderboard')}
            className="tilt-card p-5 rounded-2xl bg-[#0c0d11] border border-zinc-850 hover:border-amber-500/40 transition-all flex flex-col justify-between group preserve-3d cursor-pointer active:scale-[0.98]"
            title="Open Leaderboard"
          >
            <span
              className="text-5xl sm:text-6xl font-black stroke-text block will-change-transform mb-4 group-hover:text-amber-500/30 transition-colors"
              data-speed="-220"
            >
              /02
            </span>
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>XP Progression</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                1 study minute = 1 XP. Progress through level thresholds and unlock ranks.
              </p>
            </div>
          </div>

          {/* Pillar /03 */}
          <div
            onClick={() => navigate('/ai')}
            className="tilt-card p-5 rounded-2xl bg-[#0c0d11] border border-zinc-850 hover:border-orange-500/40 transition-all flex flex-col justify-between group preserve-3d cursor-pointer active:scale-[0.98]"
            title="Open Gemini AI Tutor"
          >
            <span
              className="text-5xl sm:text-6xl font-black stroke-text block will-change-transform mb-4 group-hover:text-orange-500/30 transition-colors"
              data-speed="-160"
            >
              /03
            </span>
            <div>
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
                <Bot className="w-3.5 h-3.5" />
                <span>Gemini AI Tutor</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Ask questions and get instant intuitive explanations and summaries.
              </p>
            </div>
          </div>

          {/* Pillar /04 */}
          <div
            onClick={() => navigate('/music')}
            className="tilt-card p-5 rounded-2xl bg-[#0c0d11] border border-zinc-850 hover:border-amber-500/40 transition-all flex flex-col justify-between group preserve-3d cursor-pointer active:scale-[0.98]"
            title="Open Music Room"
          >
            <span
              className="text-5xl sm:text-6xl font-black stroke-text block will-change-transform mb-4 group-hover:text-amber-500/30 transition-colors"
              data-speed="-240"
            >
              /04
            </span>
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mb-1">
                <Music className="w-3.5 h-3.5" />
                <span>LoFi Soundscapes</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Enjoy 24/7 relaxing chill streams or customize your study playlist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE 3D FEATURE CARDS                                           */}
      {/* ========================================================================= */}
      <section className="parallax-section max-w-5xl mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full perspective-1000">
          <div
            data-speed="-80"
            onClick={() => navigate('/room')}
            className="landing-card preserve-3d will-change-transform p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5 transition-all cursor-pointer active:scale-[0.98]"
            title="View Calendar Streaks"
          >
            <div className="tilt-depth-lg flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Calendar-Based Streaks</span>
            </div>
            <p className="tilt-depth-md text-[11px] text-zinc-500 leading-snug">
              Never lose momentum. Earn streaks each calendar day you complete study sessions.
            </p>
          </div>

          <div
            data-speed="-140"
            onClick={() => navigate('/leaderboard')}
            className="landing-card preserve-3d will-change-transform p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 hover:border-amber-500/30 hover:shadow-md hover:shadow-amber-500/5 transition-all cursor-pointer active:scale-[0.98]"
            title="View XP & Leaderboard"
          >
            <div className="tilt-depth-lg flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>XP & Level Progression</span>
            </div>
            <p className="tilt-depth-md text-[11px] text-zinc-500 leading-snug">
              1 study minute = 1 XP. Level up dynamically and climb the community leaderboard.
            </p>
          </div>

          <div
            data-speed="-90"
            onClick={() => navigate('/ai')}
            className="landing-card preserve-3d will-change-transform p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5 transition-all cursor-pointer active:scale-[0.98]"
            title="Chat with Gemini AI Tutor"
          >
            <div className="tilt-depth-lg flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
              <Bot className="w-3.5 h-3.5" />
              <span>Gemini AI Study Tutor</span>
            </div>
            <p className="tilt-depth-md text-[11px] text-zinc-500 leading-snug">
              Ask homework or programming questions and get intuitive explanations with analogies.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DMITRINAUMOV LETTER DISPERSION FOOTER & CTA                            */}
      {/* ========================================================================= */}
      <footer className="parallax-section max-w-5xl mx-auto py-16 flex flex-col items-center justify-center text-center overflow-hidden border-t border-zinc-850/60">
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-4xl sm:text-7xl font-black uppercase tracking-widest mb-6">
          <span className="will-change-transform" data-speed="-160">S</span>
          <span className="will-change-transform text-orange-500" data-speed="100">T</span>
          <span className="will-change-transform" data-speed="-220">U</span>
          <span className="will-change-transform" data-speed="140">D</span>
          <span className="will-change-transform" data-speed="-120">Y</span>
          <span className="will-change-transform stroke-text" data-speed="180">A</span>
          <span className="will-change-transform" data-speed="-190">R</span>
          <span className="will-change-transform text-amber-500" data-speed="130">C</span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
          Step into your virtual sanctuary. Turn every study minute into lifelong momentum.
        </p>

        <button
          type="button"
          onClick={handleStart}
          className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer relative z-20"
        >
          <span>Enter Study Sanctuary</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
