import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Trophy,
  ArrowRight,
  Flame,
  Sparkles,
  Star,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingView() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/room');
    } else {
      openAuthModal('signup');
    }
  };

  const handleSignIn = () => {
    if (isAuthenticated) {
      navigate('/room');
    } else {
      openAuthModal('login');
    }
  };

  // Helper to split text into animated spans for character stagger
  const splitChars = (text) =>
    text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 2. Entrance Animation Timeline (Dmitri Naumov demo)
      const gTl = gsap.timeline();

      // Title character entrance stagger
      gTl.from('.title .char', {
        opacity: 0,
        yPercent: 130,
        stagger: 0.04,
        duration: 1,
        ease: 'back.out(1.7)'
      });

      // Hero image polygon clip path reveal
      gTl.to(
        '.header__img',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 1.8,
          ease: 'expo.out'
        },
        '-=0.8'
      );

      // Header marquee bar entrance
      gTl.from(
        '.header__marq',
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.5,
          ease: 'expo.out'
        },
        '-=1.2'
      );

      // Header actions entrance
      gTl.from(
        '.header__actions',
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power2.out'
        },
        '-=0.8'
      );

      // 3. Rotating Section Squares (Dmitri Naumov signature)
      const gsapSq = gsap.utils.toArray('.section-title__square');
      gsapSq.forEach((gSq) => {
        const rotat = gsap.from(gSq, { rotation: 720, ease: 'none' });
        ScrollTrigger.create({
          trigger: gSq,
          animation: rotat,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.9
        });
      });

      // 4. Header Scroll Parallax
      gsap.to('.title_paralax', {
        scrollTrigger: {
          trigger: '.header',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.9
        },
        yPercent: -140
      });

      gsap.to('.header .stroke-header', {
        scrollTrigger: {
          trigger: '.header',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.9
        },
        xPercent: 45
      });

      gsap.to('.header__img', {
        scrollTrigger: {
          trigger: '.header',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.9
        },
        xPercent: -50
      });

      gsap.to('.header__img img', {
        scrollTrigger: {
          trigger: '.header',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.9
        },
        scale: 1.35
      });

      gsap.to('.header__marq-wrapp', {
        scrollTrigger: {
          trigger: '.header',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.9
        },
        xPercent: -45
      });

      gsap.to('.header__marq-star svg', {
        scrollTrigger: {
          trigger: '.header',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.9
        },
        rotate: -720
      });

      // 5. About Section Parallax
      gsap.from('.about__img', {
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.9
        },
        yPercent: 40
      });

      gsap.from('.about__img img', {
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.9
        },
        scale: 1.5
      });

      gsap.to('.about__txt', {
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.9
        },
        yPercent: 25
      });

      // 6. Benefits Number Parallax (Dmitri Naumov data-speed)
      const benefitNums = gsap.utils.toArray('.benefits__num');
      benefitNums.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 1;
        gsap.from(el, {
          x: (1 - speed) * 70,
          scrollTrigger: {
            trigger: '.benefits__list',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.9
          }
        });
      });

      // 7. Work / Ecosystem Cards Parallax
      const workItems = gsap.utils.toArray('.work__item');
      workItems.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 1;
        gsap.from(el, {
          y: (1 - speed) * 90,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.9
          }
        });
      });

      const workImgs = gsap.utils.toArray('.work__item-img img');
      workImgs.forEach((img) => {
        gsap.from(img, {
          scale: 1.4,
          scrollTrigger: {
            trigger: img.closest('.work__item'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.9
          }
        });
      });

      // 8. Services / Feature Arrows Parallax
      const servArrows = gsap.utils.toArray('.serv__item-arrow');
      servArrows.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 1;
        gsap.from(el, {
          x: (1 - speed) * 90,
          scrollTrigger: {
            trigger: '.serv__list',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.9
          }
        });
      });

      // 9. Parallax Footer Letters Lift
      gsap.from('.footer__div span', {
        y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed') || 1)) * 120,
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.footer',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.9
        }
      });
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const benefits = [
    {
      num: '/01',
      speed: '0.6',
      title: 'POMODORO FLOW ENGINE',
      desc: 'Scientific 25-minute deep focus cycles designed to eliminate cognitive fatigue and maintain relentless momentum.'
    },
    {
      num: '/02',
      speed: '1.4',
      title: 'CALENDAR DAILY STREAKS',
      desc: 'Real UTC midnight-synchronized streak tracking that protects your discipline day in and day out.'
    },
    {
      num: '/03',
      speed: '0.8',
      title: 'DYNAMIC LEVEL PROGRESSION',
      desc: 'Earn 1 XP for every active study minute. Climb through rank tiers and unlock prestigious community milestones.'
    },
    {
      num: '/04',
      speed: '1.3',
      title: 'GEMINI 2.5 AI TUTOR',
      desc: 'Instant academic and coding explanations, analogies, and practice quizzes powered directly by Google Gemini.'
    },
    {
      num: '/05',
      speed: '0.7',
      title: 'IMMERSIVE LO-FI RADIO',
      desc: '24/7 curated beats and soundscapes that induce alpha-wave focus and drown out environmental distractions.'
    },
    {
      num: '/06',
      speed: '1.2',
      title: 'GLOBAL STUDY LEADERBOARD',
      desc: 'Study shoulder-to-shoulder with ambitious students and developers worldwide on the real-time XP podium.'
    }
  ];

  const workItems = [
    {
      id: 'cozy-room',
      title: 'VIRTUAL SANCTUARY',
      subtitle: 'Atmospheric Study Chamber',
      speed: '0.85',
      badge: 'Interactive Room',
      tag: '01',
      desc: 'A calming sunset retreat with live study mates, ambient lo-fi player, and personalized motivation quotes.',
      image: '/virtual-sanctuary.jpg'
    },
    {
      id: 'workspace',
      title: 'MISSION WORKSPACE',
      subtitle: '3-Column Productivity Matrix',
      speed: '1.25',
      badge: 'Zero Clutter',
      tag: '02',
      desc: 'Pomodoro timer, To-Do manager, LoFi audio console, Gemini AI assistant, and Leaderboard all in one screen.',
      image: '/mission-workspace.png'
    },
    {
      id: 'gemini',
      title: 'GEMINI AI COPILOT',
      subtitle: 'Intelligent Study Companion',
      speed: '0.9',
      badge: 'AI Powered',
      tag: '03',
      desc: 'Break down complex algorithms, debug tricky code snippets, or get intuitive concept analogies in seconds.',
      image: '/lofi-bg.jpg'
    },
    {
      id: 'leaderboard',
      title: 'PRESTIGE GUILD',
      subtitle: 'Gamified XP Rankings',
      speed: '1.15',
      badge: 'Live Rankings',
      tag: '04',
      desc: 'Celebrate consistency with tier badges, weekly standings, and leveling celebrations with confetti fanfare.',
      image: '/prestige-guild.png'
    }
  ];

  const services = [
    {
      title: 'POMODORO FOCUS PROTOCOL',
      speed: '0.6',
      tag: '25 / 5 MIN INTERVALS'
    },
    {
      title: 'SMART TO-DO MATRIX',
      speed: '1.4',
      tag: 'TASK COMPLETION'
    },
    {
      title: 'LO-FI AMBIENT RADIO',
      speed: '0.8',
      tag: '24/7 CHILL STREAMS'
    },
    {
      title: 'GOOGLE GEMINI ASSISTANT',
      speed: '1.3',
      tag: 'INSTANT HOMEWORK HELP'
    },
    {
      title: 'COMPETITIVE XP GUILD',
      speed: '0.7',
      tag: 'COMMUNITY PODIUM'
    }
  ];

  return (
    <div ref={rootRef} className="w-full bg-black text-white font-syne select-none overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Dmitri Naumov .header) */}
      {/* ========================================================================= */}
      <header className="header relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-12 lg:px-20 pt-16 pb-24 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-orange-600/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Dmitri Naumov Masked Hero Image with polygon clip-path */}
        <div
          className="header__img absolute top-12 right-6 sm:right-16 lg:right-24 w-[75%] sm:w-[50%] lg:w-[42%] h-[65vh] sm:h-[75vh] z-0 overflow-hidden rounded-2xl border border-zinc-800/80 shadow-2xl shadow-orange-950/40 pointer-events-none"
          style={{
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            transform: 'scale(1.15)'
          }}
        >
          <img
            src="/hero-brain.jpg"
            alt="StudyArc Neural Focus Brain"
            className="w-full h-full object-cover object-center brightness-95 filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center sm:items-start text-center sm:text-left my-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs font-bold text-orange-400 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="tracking-wider uppercase">The Parallax Study Sanctuary</span>
          </div>

          {/* Dmitri Naumov Split Character Title */}
          <h1 className="title text-5xl sm:text-7xl lg:text-9xl font-black uppercase leading-[0.88] tracking-tight text-white mb-6 select-none">
            <span className="title_paralax block">
              {splitChars('STUDY TOGETHER')}
            </span>
            <span className="stroke-header stroke stroke-orange block mt-2">
              {splitChars('ON STUDYARC')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg lg:text-xl font-sans text-zinc-300 max-w-xl mb-8 leading-relaxed">
            Level up your focus with Pomodoro intervals, daily calendar streaks, soothing lo-fi beats, and AI tutoring by Google Gemini.
          </p>

          {/* Action CTAs */}
          <div className="header__actions flex flex-wrap items-center gap-4">
            <button
              onClick={handleStart}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {!isAuthenticated ? (
              <button
                onClick={handleSignIn}
                className="px-7 py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-bold text-sm sm:text-base rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => navigate('/workspace')}
                className="px-7 py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-orange-400 font-bold text-sm sm:text-base rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                Open Workspace Grid
              </button>
            )}
          </div>
        </div>

        {/* Dmitri Naumov Signature Marquee Ribbon with Rotating Star Badges */}
        <div className="header__marq absolute bottom-0 left-0">
          <div className="header__marq-wrapp">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="header__marq-txt">
                <span>DISCUSS YOUR IDEAS</span>
                <span className="header__marq-star">
                  <Star className="w-6 h-6 fill-orange-500 text-orange-500" />
                </span>
                <span>DEEP WORK HABITS</span>
                <span className="header__marq-star">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </span>
                <span>DAILY STREAKS</span>
                <span className="header__marq-star">
                  <Flame className="w-6 h-6 text-orange-500" />
                </span>
                <span>LEVEL UP YOUR MIND</span>
                <span className="header__marq-star">
                  <Trophy className="w-6 h-6 text-amber-500" />
                </span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. ABOUT SECTION (Dmitri Naumov .about) */}
      {/* ========================================================================= */}
      <section className="about relative w-full py-28 sm:py-36 px-4 sm:px-12 lg:px-20 bg-[#060709] border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Title with Rotating Square Badge */}
          <div className="relative mb-20 text-center sm:text-left">
            <span className="section-title__square" />
            <h2 className="section-title text-4xl sm:text-6xl lg:text-8xl font-black uppercase text-white tracking-tight relative z-10">
              <span>THE SANCTUARY</span> <br />
              <span className="stroke stroke-orange">EXPERIENCE</span>
            </h2>
          </div>

          {/* Dual-Column Parallax Layout */}
          <div className="about__wrapp flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left Parallax Image */}
            <div className="about__img w-full lg:w-1/2 h-[450px] sm:h-[600px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-orange-950/20 relative">
              <img
                src="/sanctuary-experience.jpg"
                alt="Tranquil Sunset Study Loft"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-zinc-800">
                <span className="text-xs uppercase tracking-widest text-orange-400 font-bold block mb-1">
                  Virtual Atmosphere
                </span>
                <p className="text-sm font-sans text-zinc-300">
                  Designed like a tranquil sunset loft where focus comes naturally and discipline feels rewarding.
                </p>
              </div>
            </div>

            {/* Right Parallax Text */}
            <div className="about__txt w-full lg:w-1/2 space-y-8">
              <p className="about__p text-xl sm:text-2xl font-bold uppercase tracking-wide text-zinc-200 leading-snug">
                Solitary studying is lonely and draining. StudyArc unites ambitious minds inside an encouraging, gamified sanctuary.
              </p>

              <p className="text-sm sm:text-base font-sans text-zinc-400 leading-relaxed">
                By synthesizing the proven Pomodoro protocol with calendar-synced streak rewards, dynamic XP leveling tiers, and Google Gemini AI tutoring, StudyArc transforms grueling study sessions into an addictive, momentum-fueled journey.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850">
                  <div className="text-2xl sm:text-3xl font-black text-orange-400 font-syne">
                    25:00
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                    Deep Work Intervals
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-syne">
                    1 MIN = 1 XP
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                    Level Up Progression
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-black text-orange-500 font-syne">
                    GEMINI
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                    AI Study Copilot
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStart}
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider group"
                >
                  <span>Explore The Room Sanctuary</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BENEFITS SECTION (Dmitri Naumov .benefits) */}
      {/* ========================================================================= */}
      <section className="benefits relative w-full py-28 sm:py-36 px-4 sm:px-12 lg:px-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Title with Rotating Square Badge */}
          <div className="relative mb-24 text-center">
            <span className="section-title__square" />
            <h2 className="section-title text-4xl sm:text-6xl lg:text-8xl font-black uppercase text-white tracking-tight relative z-10">
              <span>THE CORE</span> <br />
              <span className="stroke stroke-white">BENEFITS</span>
            </h2>
          </div>

          {/* Dmitri Naumov 3-Column List with Parallax data-speed Numbers */}
          <div className="benefits__list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="benefits__item group p-6 rounded-3xl bg-[#0b0c10] border border-zinc-850 hover:border-orange-500/50 hover:bg-[#101218] transition-all"
              >
                {/* Outlined Parallax Number */}
                <span
                  className="benefits__num text-6xl sm:text-7xl font-black block mb-4 select-none"
                  data-speed={item.speed}
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px #f97316'
                  }}
                >
                  {item.num}
                </span>

                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="benefits__p text-sm font-sans text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WORK / ECOSYSTEM SECTION (Dmitri Naumov .work) */}
      {/* ========================================================================= */}
      <section className="work relative w-full py-28 sm:py-36 px-4 sm:px-12 lg:px-20 bg-[#060709] border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Title with Rotating Square Badge */}
          <div className="relative mb-24 text-center sm:text-right">
            <span className="section-title__square" />
            <h2 className="section-title text-4xl sm:text-6xl lg:text-8xl font-black uppercase text-white tracking-tight relative z-10">
              <span>PRODUCTIVITY</span> <br />
              <span className="stroke stroke-orange">ECOSYSTEM</span>
            </h2>
          </div>

          {/* Asymmetrical Parallax Cards (Dmitri Naumov layout) */}
          <div className="work__wrapp grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {workItems.map((item, idx) => (
              <div
                key={item.id}
                className={`work__item group relative rounded-3xl bg-[#090a0d] border border-zinc-800 overflow-hidden shadow-2xl transition-all ${
                  idx % 2 === 1 ? 'lg:translate-y-16' : ''
                }`}
                data-speed={item.speed}
              >
                {/* Large Parallax Numeric Tag */}
                <span className="work__item-num absolute top-6 left-6 text-6xl font-black text-white/90 z-20 font-syne select-none drop-shadow-md">
                  {item.tag}
                </span>

                {/* Inner Image Container with Parallax Zoom */}
                <div className="work__item-img w-full h-[360px] sm:h-[440px] overflow-hidden relative">
                  <img
                    src={item.image || '/lofi-bg.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-80"
                    style={{
                      objectPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="p-7 sm:p-9 space-y-2 relative z-20 bg-[#090a0d]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-orange-400 font-bold px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                      {item.badge}
                    </span>
                    <span className="text-xs text-zinc-500 font-sans">{item.subtitle}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm font-sans text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-3">
                    <button
                      onClick={handleStart}
                      className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider hover:text-orange-400 transition-colors"
                    >
                      <span>Launch In Sanctuary</span>
                      <ArrowUpRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICES / FEATURES SECTION (Dmitri Naumov .serv) */}
      {/* ========================================================================= */}
      <section className="serv relative w-full py-28 sm:py-36 px-4 sm:px-12 lg:px-20 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="relative mb-20 text-center">
            <span className="section-title__square" />
            <h2 className="section-title text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight relative z-10">
              <span>CORE ARCHITECTURE</span>
            </h2>
          </div>

          {/* Dmitri Naumov Bordered Rows with Scrubbed Moving Arrows */}
          <div className="serv__list border-t border-zinc-800">
            {services.map((serv, idx) => (
              <div
                key={idx}
                className="serv__item relative py-8 sm:py-10 border-b border-zinc-800 flex items-center justify-between group hover:bg-zinc-950/60 px-4 sm:px-6 transition-colors"
              >
                <div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-1">
                    {serv.tag}
                  </span>
                  <h3 className="serv__item-txt text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-zinc-300 group-hover:text-white transition-colors font-syne">
                    {serv.title}
                  </h3>
                </div>

                <div
                  className="serv__item-arrow ml-4 shrink-0"
                  data-speed={serv.speed}
                >
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PARALLAX FOOTER (Dmitri Naumov .footer) */}
      {/* ========================================================================= */}
      <footer className="footer relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-12 bg-[#050608] border-t border-zinc-900 overflow-hidden text-center">
        {/* Background Glow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Dmitri Naumov Lifting Spans Typography */}
        <div className="footer__div text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-[0.2em] text-white select-none mb-10">
          {'STUDYARC'.split('').map((letter, idx) => (
            <span
              key={idx}
              className="inline-block transition-transform hover:text-orange-500"
              data-speed={0.5 + (idx % 4) * 0.25}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Final CTA Card */}
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <p className="text-base sm:text-xl font-sans text-zinc-400">
            Ready to experience the ultimate gamified study sanctuary?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="px-9 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              Enter Study Sanctuary
            </button>

            {!isAuthenticated && (
              <button
                onClick={handleSignIn}
                className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-sm sm:text-base uppercase tracking-wider rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          <p className="text-xs text-zinc-600 tracking-widest uppercase font-mono pt-4">
            © 2026 StudyArc · Built with GSAP, ScrollTrigger & LoFi Sanctuary
          </p>
        </div>
      </footer>
    </div>
  );
}
