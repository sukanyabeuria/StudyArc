import React from 'react';
import TodoWidget from '../widgets/TodoWidget';
import PomodoroWidget from '../widgets/PomodoroWidget';
import MusicRoomWidget from '../widgets/MusicRoomWidget';
import AiAssistantWidget from '../widgets/AiAssistantWidget';
import LeaderboardWidget from '../widgets/LeaderboardWidget';

export default function WorkspaceGrid({ onSessionComplete }) {
  return (
    <div className="h-full w-full p-2.5 sm:p-3 bg-[#07080b] relative overflow-hidden flex flex-col">
      {/* Ambient Studio Lighting */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/5 blur-[100px] pointer-events-none rounded-full" />

      {/* 3-Column Dashboard Grid: 100% fits on one screen with ZERO overflow */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-2.5 h-full min-h-0 overflow-hidden">
        {/* Column 1: Pomodoro Timer & Music Room */}
        <div className="md:col-span-4 flex flex-col gap-2.5 h-full min-h-0 overflow-hidden">
          <div className="flex-[1.15] min-h-0 overflow-hidden">
            <PomodoroWidget onSessionComplete={onSessionComplete} />
          </div>
          <div className="flex-[0.85] min-h-0 overflow-hidden">
            <MusicRoomWidget />
          </div>
        </div>

        {/* Column 2: To-Do List & Gemini AI Assistant */}
        <div className="md:col-span-4 flex flex-col gap-2.5 h-full min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0 overflow-hidden">
            <TodoWidget />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <AiAssistantWidget />
          </div>
        </div>

        {/* Column 3: Leaderboard (Full Height) */}
        <div className="md:col-span-4 h-full min-h-0 overflow-hidden">
          <LeaderboardWidget />
        </div>
      </div>
    </div>
  );
}
