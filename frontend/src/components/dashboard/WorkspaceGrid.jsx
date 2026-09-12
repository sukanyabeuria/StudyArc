import React from 'react';
import TodoWidget from '../widgets/TodoWidget';
import PomodoroWidget from '../widgets/PomodoroWidget';
import MusicRoomWidget from '../widgets/MusicRoomWidget';
import AiAssistantWidget from '../widgets/AiAssistantWidget';
import LeaderboardWidget from '../widgets/LeaderboardWidget';

export default function WorkspaceGrid({ onSessionComplete }) {
  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-focus-950">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Workspace Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Study Workspace
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              All your study companions, music, tasks, and timers in one unified view.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Focus Mode Active</span>
          </div>
        </div>

        {/* 2-Column Responsive Workspace Grid (Matching Bottom-Right Mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Column 1: Pomodoro & To-Do */}
          <div className="space-y-5 flex flex-col">
            <div className="h-[380px]">
              <PomodoroWidget onSessionComplete={onSessionComplete} />
            </div>
            <div className="h-[380px]">
              <MusicRoomWidget />
            </div>
          </div>

          {/* Column 2: To-Do List & Gemini AI */}
          <div className="space-y-5 flex flex-col">
            <div className="h-[380px]">
              <TodoWidget />
            </div>
            <div className="h-[380px]">
              <AiAssistantWidget />
            </div>
          </div>

          {/* Column 3: Leaderboard (Full Height) */}
          <div className="md:col-span-2 lg:col-span-1 h-[780px]">
            <LeaderboardWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
