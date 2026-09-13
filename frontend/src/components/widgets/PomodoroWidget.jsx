import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { logSession } from '../../api/client';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Flame, Settings, Trophy } from 'lucide-react';

export default function PomodoroWidget({ onSessionComplete }) {
  const { user, refreshUser } = useAuth();

  const [mode, setMode] = useState('pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionsCompletedToday, setSessionsCompletedToday] = useState(3);

  const timerRef = useRef(null);

  const MODE_DURATIONS = {
    pomodoro: 25 * 60,
    short_break: 5 * 60,
    long_break: 15 * 60
  };

  const totalDuration = MODE_DURATIONS[mode];

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODE_DURATIONS[newMode]);
  };

  const handleComplete = async () => {
    setIsRunning(false);

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.warn('Audio Context not initialized:', e);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fb923c', '#f59e0b']
    });

    if (mode === 'pomodoro') {
      try {
        const res = await logSession({
          duration: 25,
          type: 'pomodoro'
        });
        if (res.success) {
          setSessionsCompletedToday((prev) => prev + 1);
          await refreshUser();
          if (onSessionComplete) onSessionComplete(res.data);
        }
      } catch (err) {
        console.error('Failed to log study session:', err);
      }
    }

    setTimeLeft(MODE_DURATIONS[mode]);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODE_DURATIONS[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="bg-gradient-to-b from-[#0c0e15] to-[#08090d] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-4 shadow-2xl flex flex-col justify-between h-full overflow-hidden text-zinc-100 relative">
      {/* Subtle Inner Highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shadow-sm shadow-orange-500/10">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-syne leading-none">Pomodoro Flow</h3>
            <span className="text-[10px] text-zinc-400 font-medium">Deep Focus Interval</span>
          </div>
        </div>

        <button 
          onClick={resetTimer}
          className="p-1.5 rounded-xl text-zinc-400 hover:text-orange-400 hover:bg-zinc-850/80 transition-colors"
          title="Reset timer"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-950/90 rounded-xl mb-2 border border-zinc-850 text-[11px]">
        {['pomodoro', 'short_break', 'long_break'].map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 py-1 rounded-lg font-medium capitalize transition-all ${
              mode === m
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-md shadow-orange-500/25'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            {m.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Circular Progress Timer */}
      <div className="relative flex flex-col items-center justify-center my-auto select-none py-1">
        {/* Ambient Radial Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-orange-500/10 blur-xl pointer-events-none" />

        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#181a22"
              strokeWidth="5"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#f97316"
              strokeWidth="5"
              strokeDasharray="276"
              strokeDashoffset={276 - (timeLeft / totalDuration) * 276}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear drop-shadow-[0_0_12px_rgba(249,115,22,0.45)]"
            />
          </svg>

          {/* Time text inside ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black tracking-tight text-white font-syne">
              {timeFormatted}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[9px] font-bold tracking-wider uppercase mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-orange-500'}`} />
              <span className={isRunning ? 'text-emerald-400' : 'text-zinc-400'}>
                {isRunning ? 'Focusing' : 'Paused'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center justify-center gap-2.5 my-1.5">
        <button
          onClick={toggleTimer}
          className="flex-1 max-w-[140px] py-2 px-5 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800/90 transition-all active:scale-95"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-850/80 text-[11px] text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400">Completed Today:</span>
          <span className="font-bold text-zinc-100 px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800">
            {sessionsCompletedToday}
          </span>
        </div>

        <div className="flex items-center gap-1 text-orange-400 font-bold">
          <span>Keep going</span>
          <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
        </div>
      </div>
    </div>
  );
}
