import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import gsap from 'gsap';
import TodoWidget from '../widgets/TodoWidget';
import PomodoroWidget from '../widgets/PomodoroWidget';
import MusicRoomWidget from '../widgets/MusicRoomWidget';
import AiAssistantWidget from '../widgets/AiAssistantWidget';
import LeaderboardWidget from '../widgets/LeaderboardWidget';
import { animateCardsEntrance, init3DTilt, useDashboardParallax } from '../../animations/cardAnimations';

export default function WorkspaceGrid({ onSessionComplete }) {
  const outletCtx = useOutletContext();
  const handleComplete = onSessionComplete || outletCtx?.onSessionComplete;
  const gridRef = useRef(null);

  // Hook layered 3D mouse parallax across dashboard
  useDashboardParallax(gridRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateCardsEntrance('.workspace-widget', gridRef, {
        stagger: 0.06,
        duration: 0.42,
        y: 16,
        scale: 0.985
      });
    }, gridRef);

    // Attach subtle 3D tilt to each workspace widget
    const cleanups = [];
    if (gridRef.current) {
      const widgets = gridRef.current.querySelectorAll('.workspace-widget');
      widgets.forEach((widget) => {
        const cleanup = init3DTilt(widget, { maxTilt: 3, perspective: 1200, scale: 1.008 });
        cleanups.push(cleanup);
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full p-2.5 sm:p-3 bg-[#07080b] relative overflow-hidden flex flex-col perspective-1200">
      {/* Ambient Studio Lighting */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/5 blur-[100px] pointer-events-none rounded-full" />

      {/* 3-Column Dashboard Grid: 100% fits on one screen with ZERO overflow */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-2.5 h-full min-h-0 overflow-hidden preserve-3d">
        {/* Column 1: Pomodoro Timer & Music Room */}
        <div className="md:col-span-4 flex flex-col gap-2.5 h-full min-h-0 overflow-hidden preserve-3d">
          <div className="workspace-widget flex-[1.15] min-h-0 overflow-hidden will-change-transform">
            <PomodoroWidget onSessionComplete={handleComplete} />
          </div>
          <div className="workspace-widget flex-[0.85] min-h-0 overflow-hidden will-change-transform">
            <MusicRoomWidget />
          </div>
        </div>

        {/* Column 2: To-Do List & Gemini AI Assistant */}
        <div className="md:col-span-4 flex flex-col gap-2.5 h-full min-h-0 overflow-hidden preserve-3d">
          <div className="workspace-widget flex-1 min-h-0 overflow-hidden will-change-transform">
            <TodoWidget />
          </div>
          <div className="workspace-widget flex-1 min-h-0 overflow-hidden will-change-transform">
            <AiAssistantWidget />
          </div>
        </div>

        {/* Column 3: Leaderboard (Full Height) */}
        <div className="workspace-widget md:col-span-4 h-full min-h-0 overflow-hidden preserve-3d will-change-transform">
          <LeaderboardWidget />
        </div>
      </div>
    </div>
  );
}

