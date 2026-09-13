import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthContext';
import {
  CheckSquare,
  Clock,
  Music,
  Bot,
  ArrowRight
} from 'lucide-react';
import { init3DTilt, useDashboardParallax } from '../../animations/cardAnimations';
import ThreeCozyOrb from '../three/ThreeCozyOrb';

export default function CozyRoomView() {
  const { user } = useAuth();
  const containerRef = useRef(null);

  useDashboardParallax(containerRef);

  const hour = new Date().getHours();
  const greetingTime = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    const cleanups = [];
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.room-header', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo('.room-quote', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5 }, '-=0.2')
        .fromTo('.room-card', { opacity: 0, y: 16, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.45 }, '-=0.25');

      // Subtle ambient floating depth on quote
      gsap.to('.room-quote > div', {
        y: -3,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }, containerRef);

    // Attach 3D tilt to action cards
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.room-card');
      cards.forEach((card) => {
        cleanups.push(init3DTilt(card, { maxTilt: 5, perspective: 850, scale: 1.02 }));
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const actionCards = [
    {
      id: 'todos',
      title: 'To-Do List',
      description: 'Plan and check off tasks',
      icon: CheckSquare,
      color: 'text-orange-400',
      badge: 'Tasks',
      path: '/workspace'
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro Timer',
      description: '25m intervals for deep focus',
      icon: Clock,
      color: 'text-amber-400',
      badge: 'Timer',
      path: '/workspace'
    },
    {
      id: 'music',
      title: 'Music Room',
      description: 'LoFi radio & soundscapes',
      icon: Music,
      color: 'text-orange-500',
      badge: 'Audio',
      path: '/workspace'
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      description: 'Instant help with Gemini',
      icon: Bot,
      color: 'text-amber-300',
      badge: 'AI Tutor',
      path: '/workspace'
    },
  ];

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col justify-between p-6 sm:p-8 bg-black overflow-hidden select-none">
      {/* Top Greeting Header */}
      <div className="room-header flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-medium">Virtual Study Sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-syne text-white tracking-tight">
            {greetingTime}, {user?.name || 'Debasis'} <span className="inline-block">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Focus today for a brighter tomorrow.
          </p>
        </div>

        {/* Live Study Together Badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 shadow-sm">
          <div className="flex -space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-orange-600 border border-black flex items-center justify-center text-[9px] font-bold text-white">
              A
            </span>
            <span className="w-5 h-5 rounded-full bg-amber-500 border border-black flex items-center justify-center text-[9px] font-bold text-white">
              R
            </span>
            <span className="w-5 h-5 rounded-full bg-orange-500 border border-black flex items-center justify-center text-[9px] font-bold text-white">
              S
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-200">
            <span>12 online</span>
            <span className="text-zinc-600">·</span>
            <span className="text-orange-400">Study Together</span>
          </div>
        </div>
      </div>

      {/* Center Motivational Quote with 3D Ambient Focus Orb */}
      <div className="room-quote my-auto text-center py-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none -z-10 opacity-60">
          <ThreeCozyOrb />
        </div>
        <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#0b0c0f] border border-zinc-850 shadow-lg hover:border-orange-500/30 transition-all relative z-10">
          <p className="text-lg sm:text-2xl font-serif italic text-amber-200/60 tracking-wider">
            "Discipline Creates Freedom"
          </p>
          <span className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1 block">
            Consistent Effort Leads to Greatness
          </span>
        </div>
      </div>

      {/* 4 Interactive Action Cards at the Bottom */}
      <div className="w-full perspective-1000">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 preserve-3d">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <NavLink
                key={card.id}
                to="/workspace"
                className="room-card block preserve-3d will-change-transform group p-4 rounded-2xl bg-[#0c0d11] hover:bg-[#12141a] border border-zinc-850 hover:border-orange-500/40 text-left transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/15 active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="tilt-depth-lg w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all text-orange-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    {card.badge}
                  </span>
                </div>

                <div className="tilt-depth-md">
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors mb-0.5">
                    {card.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="truncate">{card.description}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Motivational Tagline */}
        <p className="text-center text-[10px] tracking-widest uppercase text-zinc-600 font-medium mt-3">
          ~ A Focused Mind, A Happier You ~
        </p>
      </div>
    </div>
  );
}
