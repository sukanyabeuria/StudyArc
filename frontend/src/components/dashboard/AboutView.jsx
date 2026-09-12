import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Flame, Trophy, Bot, Music } from 'lucide-react';

export default function AboutView() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full p-6 sm:p-8 bg-black overflow-y-auto custom-scrollbar text-zinc-200 select-none">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md shadow-orange-600/30 text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              About Focus<span className="text-orange-500">Nest</span>
            </h1>
            <p className="text-xs text-zinc-400">
              A gamified virtual study sanctuary built for lifelong learners.
            </p>
          </div>
        </div>

        {/* Philosophy Card */}
        <div className="p-5 rounded-2xl bg-[#0c0d11] border border-zinc-850 space-y-2.5">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>✨ The Vision</span>
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            FocusNest turns daily studying into an encouraging, aesthetic habit. By combining the proven **Pomodoro Technique**, soothing **LoFi beats**, **XP leveling tiers**, and AI assistance from **Google Gemini**, FocusNest helps you turn small daily sessions into massive personal growth.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 space-y-1.5">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs">
              <Flame className="w-3.5 h-3.5" />
              <span>Calendar-Based Streaks</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Streaks compare calendar days in UTC midnight so your morning and evening sessions count accurately towards your momentum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Trophy className="w-3.5 h-3.5" />
              <span>XP & Level Progression</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              1 study minute = 1 XP. Progress through level thresholds and compare your consistency on the global FocusNest leaderboard.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 space-y-1.5">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs">
              <Bot className="w-3.5 h-3.5" />
              <span>Google Gemini AI Tutor</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Ask coding or academic questions anytime in your workspace. Gemini provides concise explanations and analogies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0d11] border border-zinc-850 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
              <Music className="w-3.5 h-3.5" />
              <span>LoFi Soundscapes</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Enjoy curated 24/7 relaxing chill streams or paste any YouTube study stream directly inside your workspace.
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center pt-2">
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
