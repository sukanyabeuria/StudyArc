import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Clock,
  CheckSquare,
  Users,
  Trophy,
  Bot,
  ArrowRight,
  Flame,
  Sparkles
} from 'lucide-react';

export default function LandingView() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/room');
    } else {
      openAuthModal('signup');
    }
  };

  const featurePills = [
    { icon: Clock, label: 'Pomodoro Timer' },
    { icon: CheckSquare, label: 'Personal To-Do' },
    { icon: Users, label: 'Live Study Room' },
    { icon: Trophy, label: 'XP Leaderboard' },
    { icon: Bot, label: 'Gemini AI Tutor' },
  ];

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 sm:p-12 bg-black overflow-hidden select-none">
      {/* Hero Section */}
      <div className="max-w-4xl my-auto">
        {/* Live Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400 mb-4">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Gamified Study Together Experience</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-none">
          Study Together, <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Grow Together
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-zinc-400 max-w-xl mb-6 leading-relaxed">
          A gamified study app to keep you focused, consistent and motivated with Pomodoro intervals, daily streaks, leveling tiers, and Google Gemini.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {featurePills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-sm hover:border-orange-500/40 hover:text-orange-300 transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-orange-400" />
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStart}
            className="group flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 transition-all"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {!isAuthenticated && (
            <button
              onClick={() => openAuthModal('login')}
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-semibold rounded-xl transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Feature Cards at Bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <div className="p-3.5 rounded-xl bg-[#0c0d11] border border-zinc-850">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Calendar-Based Streaks</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-snug">
            Never lose momentum. Earn streaks each calendar day you complete study sessions.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0c0d11] border border-zinc-850">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>XP & Level Progression</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-snug">
            1 study minute = 1 XP. Level up dynamically and climb the community leaderboard.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0c0d11] border border-zinc-850">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
            <Bot className="w-3.5 h-3.5" />
            <span>Gemini AI Study Tutor</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-snug">
            Ask homework or programming questions and get intuitive explanations with analogies.
          </p>
        </div>
      </div>
    </div>
  );
}
