import React from 'react';
import { BookOpen, Flame, Trophy, Bot, Music, CheckSquare, Heart } from 'lucide-react';

export default function AboutView({ onBackToRoom }) {
  return (
    <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-focus-950 text-zinc-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-600/30 text-white">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              About Focus<span className="text-orange-500">Nest</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              A cozy, gamified virtual study sanctuary built for lifelong learners.
            </p>
          </div>
        </div>

        {/* Philosophy Card */}
        <div className="p-6 rounded-2xl bg-focus-900 border border-zinc-800/80 shadow-xl space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>✨ The Vision</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Studying alone can often feel isolating and exhausting. FocusNest transforms everyday learning into an encouraging, aesthetic, and gamified routine. By combining the proven **Pomodoro Technique**, soothing **LoFi music**, **XP leveling**, and intelligent tutoring with **Google Gemini**, FocusNest helps you turn small daily efforts into lifelong mastery.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-focus-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <Flame className="w-4 h-4" />
              <span>Calendar-Based Streaks</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Maintain momentum by logging at least one Pomodoro session every day. Your streak tracks consecutive calendar days and celebrates your consistency.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-focus-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Trophy className="w-4 h-4" />
              <span>Gamified XP & Level Progression</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every study minute earns 1 XP. Progress through progressively challenging level thresholds and climb the global FocusNest leaderboard.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-focus-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <Bot className="w-4 h-4" />
              <span>Google Gemini AI Study Tutor</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Stuck on a tricky algorithm, historical date, or formula? Ask Gemini directly inside your workspace for analogies and step-by-step guidance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-focus-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
              <Music className="w-4 h-4" />
              <span>Ambient LoFi Soundscapes</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enjoy 24/7 relaxing chill beats or embed your favorite YouTube study stream directly alongside your personal tasks.
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="pt-4 text-center">
          <button
            onClick={onBackToRoom}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-orange-500/25 active:scale-95"
          >
            Back to Study Room
          </button>
        </div>
      </div>
    </div>
  );
}
