import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Clock,
  CheckSquare,
  Users,
  Trophy,
  Bot,
  ArrowRight,
  Flame,
  Sparkles,
  Music,
  Target
} from 'lucide-react';

export default function LandingView({ onStartJourney }) {
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleStart = () => {
    if (isAuthenticated) {
      onStartJourney();
    } else {
      openAuthModal('signup');
    }
  };

  const featurePills = [
    { icon: Clock, label: 'Pomodoro' },
    { icon: CheckSquare, label: 'To-Do' },
    { icon: Users, label: 'Study Rooms' },
    { icon: Trophy, label: 'Leaderboard' },
    { icon: Bot, label: 'AI Assistant' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-73px)] flex flex-col justify-between overflow-hidden bg-focus-950">
      {/* Background Ambience & Mockup Artwork Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lofi-bg.jpg"
          alt="Cozy LoFi Study Room"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen scale-105 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-focus-950 via-focus-950/85 to-focus-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent" />
      </div>

      {/* Hero Content (Matching Top-Left Screen in Mockup) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-12 flex flex-col items-start justify-center flex-1">
        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs font-semibold text-orange-400 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>Gamified Study Together & LoFi Experience</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
          Study Together <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
            Grow Together
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-xl mb-8 leading-relaxed">
          A cozy, gamified study app to keep you focused, consistent and motivated with Pomodoro sessions, XP leveling, daily streaks, LoFi tunes, and Gemini AI.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10">
          {featurePills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-sm hover:border-orange-500/40 hover:text-orange-300 transition-all backdrop-blur-md"
              >
                <Icon className="w-3.5 h-3.5 text-orange-400" />
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>

        {/* Primary CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleStart}
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {!isAuthenticated && (
            <button
              onClick={() => openAuthModal('login')}
              className="px-6 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/70 text-zinc-200 text-sm font-semibold rounded-full transition-all"
            >
              Sign In Existing
            </button>
          )}
        </div>
      </div>

      {/* Floating Inspirational Quotes from Mockup Artwork */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-orange-400 font-semibold mb-1">
            <Flame className="w-4 h-4" />
            <span>Streak System</span>
          </div>
          <p className="text-zinc-400">Build daily momentum. Calendar-calculated streaks keep you accountable every day.</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
            <Trophy className="w-4 h-4" />
            <span>XP & Level Up</span>
          </div>
          <p className="text-zinc-400">1 study minute = 1 XP. Progress through leveling tiers and compete on the leaderboard.</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-orange-400 font-semibold mb-1">
            <Bot className="w-4 h-4" />
            <span>Gemini AI Tutor</span>
          </div>
          <p className="text-zinc-400">Instant answers, analogies, and study tips whenever you get stuck on difficult problems.</p>
        </div>
      </div>
    </div>
  );
}
