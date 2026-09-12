import React from 'react';
import TodoWidget from '../widgets/TodoWidget';
import PomodoroWidget from '../widgets/PomodoroWidget';
import MusicRoomWidget from '../widgets/MusicRoomWidget';
import AiAssistantWidget from '../widgets/AiAssistantWidget';
import LeaderboardWidget from '../widgets/LeaderboardWidget';

export default function WorkspaceGrid({ onSessionComplete }) {
  return (
    <div className="h-full w-full p-3 bg-black overflow-hidden flex flex-col">
      {/* 3-Column Dashboard Grid: 100% fits in one screen! */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-full min-h-0 overflow-hidden">
        {/* Column 1: Pomodoro Timer & Music Room */}
        <div className="md:col-span-4 flex flex-col gap-3 h-full min-h-0 overflow-hidden">
          <div className="h-[52%] min-h-0 overflow-hidden">
            <PomodoroWidget onSessionComplete={onSessionComplete} />
          </div>
          <div className="h-[48%] min-h-0 overflow-hidden">
            <MusicRoomWidget />
          </div>
        </div>

        {/* Column 2: To-Do List & Gemini AI Assistant */}
        <div className="md:col-span-4 flex flex-col gap-3 h-full min-h-0 overflow-hidden">
          <div className="h-[50%] min-h-0 overflow-hidden">
            <TodoWidget />
          </div>
          <div className="h-[50%] min-h-0 overflow-hidden">
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
