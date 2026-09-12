import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  CheckSquare,
  Clock,
  Music,
  Bot,
  ArrowRight,
  Flame,
  Trophy,
  Sparkles,
  Users
} from 'lucide-react';

export default function CozyRoomView() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greetingTime = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const actionCards = [
    {
      id: 'todos',
      title: 'To-Do List',
      description: 'Plan and check off tasks',
      icon: CheckSquare,
      color: 'text-orange-400',
      badge: 'Tasks'
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro Timer',
      description: '25m intervals for deep focus',
      icon: Clock,
      color: 'text-amber-400',
      badge: 'Timer'
    },
    {
      id: 'music',
      title: 'Music Room',
      description: 'LoFi radio & soundscapes',
      icon: Music,
      color: 'text-orange-500',
      badge: 'Audio'
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      description: 'Instant help with Gemini',
      icon: Bot,
      color: 'text-amber-300',
      badge: 'AI Tutor'
    },
  ];

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 sm:p-8 bg-black overflow-hidden select-none">
      {/* Top Greeting Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-medium">Virtual Study Sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
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

      {/* Center Motivational Quote */}
      <div className="my-auto text-center py-6">
        <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#0b0c0f] border border-zinc-850 shadow-lg">
          <p className="text-lg sm:text-2xl font-serif italic text-amber-200/60 tracking-wider">
            "Discipline Creates Freedom"
          </p>
          <span className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1 block">
            Consistent Effort Leads to Greatness
          </span>
        </div>
      </div>

      {/* 4 Interactive Action Cards at the Bottom */}
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => navigate('/workspace')}
                className="group p-4 rounded-2xl bg-[#0c0d11] hover:bg-[#12141a] border border-zinc-850 hover:border-orange-500/40 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.99]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white transition-all text-orange-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors mb-0.5">
                  {card.title}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="truncate">{card.description}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
              </button>
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
