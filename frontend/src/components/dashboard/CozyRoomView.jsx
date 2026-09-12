import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  Clock,
  Music,
  Bot,
  ArrowRight,
  Flame,
  Users,
  Sparkles
} from 'lucide-react';

export default function CozyRoomView({ onSelectAction }) {
  const { user } = useAuth();

  // Determine greeting based on current time
  const hour = new Date().getHours();
  const greetingTime = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const actionCards = [
    {
      id: 'todos',
      title: 'To-Do List',
      description: 'Plan your tasks',
      icon: FileText,
      gradient: 'from-orange-500/20 to-amber-500/5',
      borderColor: 'hover:border-orange-500/50'
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro Timer',
      description: 'Stay focused',
      icon: Clock,
      gradient: 'from-amber-500/20 to-orange-500/5',
      borderColor: 'hover:border-amber-500/50'
    },
    {
      id: 'music',
      title: 'Music Room',
      description: 'LoFi vibes',
      icon: Music,
      gradient: 'from-orange-600/20 to-amber-600/5',
      borderColor: 'hover:border-orange-600/50'
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      description: 'Ask anything',
      icon: Bot,
      gradient: 'from-amber-600/20 to-orange-500/5',
      borderColor: 'hover:border-amber-400/50'
    },
  ];

  return (
    <div className="relative flex-1 h-full min-h-[calc(100vh-73px)] flex flex-col justify-between p-6 sm:p-10 overflow-hidden bg-focus-950">
      {/* Cozy LoFi Room Backdrop (Artwork from Mockup) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lofi-bg.jpg"
          alt="Cozy Study Room Ambient Atmosphere"
          className="w-full h-full object-cover object-center opacity-45 mix-blend-screen filter saturate-125"
        />
        {/* Warm Ambient Vignette & Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-focus-950 via-focus-950/60 to-focus-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      </div>

      {/* Top Bar: Greetings & Room Status */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {greetingTime}, {user?.name || 'Debasis'} <span className="animate-bounce inline-block">👋</span>
          </h2>
          <p className="text-sm text-zinc-300 mt-1 font-medium">
            Focus today for a brighter tomorrow.
          </p>
        </div>

        {/* Live Study Together Room Badge */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-lg">
          <div className="flex -space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-orange-500 border border-zinc-900 flex items-center justify-center text-[10px] font-bold text-white">
              A
            </span>
            <span className="w-5 h-5 rounded-full bg-amber-500 border border-zinc-900 flex items-center justify-center text-[10px] font-bold text-white">
              R
            </span>
            <span className="w-5 h-5 rounded-full bg-orange-600 border border-zinc-900 flex items-center justify-center text-[10px] font-bold text-white">
              S
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>12 online</span>
            <span className="text-zinc-500">·</span>
            <span className="text-orange-400">Study Together</span>
          </div>
        </div>
      </div>

      {/* Floating Inspirational Quote (Matching Mockup text in room) */}
      <div className="relative z-10 my-auto py-8 text-right pr-4 hidden md:block select-none pointer-events-none">
        <span className="inline-block text-xl lg:text-2xl font-serif italic text-amber-200/40 tracking-wider">
          "Discipline Creates Freedom"
        </span>
      </div>

      {/* Bottom: 4 Interactive Action Cards (Matching Mockup) */}
      <div className="relative z-10 w-full pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => onSelectAction(card.id)}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl bg-zinc-900/85 hover:bg-zinc-850/90 border border-zinc-800/80 ${card.borderColor} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 active:scale-[0.98]`}
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all text-orange-400">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>

                <h3 className="text-sm font-bold text-zinc-100 mb-0.5 group-hover:text-orange-400 transition-colors">
                  {card.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{card.description}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Motivational Subtitle Quote */}
        <div className="mt-4 text-center select-none">
          <p className="text-[11px] tracking-widest uppercase text-zinc-500 font-medium">
            ~ A Focused Mind, A Happier You ~
          </p>
        </div>
      </div>
    </div>
  );
}
