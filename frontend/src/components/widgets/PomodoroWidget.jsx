import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { logSession } from '../../api/client';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Flame, Settings, Trophy } from 'lucide-react';

export default function PomodoroWidget({ onSessionComplete }) {
  const { user, refreshUser } = useAuth();

  const [mode, setMode] = useState('pomodoro'); // 'pomodoro' | 'short_break' | 'long_break'
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

  // Handle countdown
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

    // Audio chime synthesize
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.warn('Audio Context not allowed without interaction');
    }

    // Confetti celebration
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fb923c', '#f59e0b']
    });

    // Log session to backend
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

    // Reset timer
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

  // Calculate SVG circle stroke dash
  const strokeProgress = (timeLeft / totalDuration) * 283;

  return (
    <div className="bg-focus-900/90 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-orange-400" />
          <h3 className="text-base font-bold text-white">Pomodoro</h3>
        </div>

        <button 
          onClick={resetTimer}
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors"
          title="Reset timer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1 p-1 bg-focus-850 rounded-xl mb-4 border border-zinc-800/60 text-xs">
        <button
          onClick={() => switchMode('pomodoro')}
          className={`flex-1 py-1 rounded-lg font-medium transition-all ${
            mode === 'pomodoro'
              ? 'bg-orange-500 text-white font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => switchMode('short_break')}
          className={`flex-1 py-1 rounded-lg font-medium transition-all ${
            mode === 'short_break'
              ? 'bg-orange-500 text-white font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => switchMode('long_break')}
          className={`flex-1 py-1 rounded-lg font-medium transition-all ${
            mode === 'long_break'
              ? 'bg-orange-500 text-white font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Circular Progress Timer (Matching Mockup) */}
      <div className="relative flex flex-col items-center justify-center my-2 select-none">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1b202a"
              strokeWidth="5"
            />
            {/* Animated Glowing Orange Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f97316"
              strokeWidth="5"
              strokeDasharray="283"
              strokeDashoffset={283 - strokeProgress}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
            />
          </svg>

          {/* Time Text Inside Ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black tracking-tight text-white font-mono drop-shadow">
              {timeFormatted}
            </span>
            <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider mt-1">
              {isRunning ? 'Focusing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center justify-center gap-3 my-2">
        <button
          onClick={toggleTimer}
          className="flex-1 max-w-[150px] py-2.5 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="p-2.5 rounded-xl bg-focus-850 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Footer Stats (Matching Mockup) */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span>Sessions Today:</span>
          <span className="font-bold text-zinc-200">{sessionsCompletedToday}</span>
        </div>

        <div className="flex items-center gap-1 text-orange-400 font-semibold">
          <span>Keep going!</span>
          <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
        </div>
      </div>
    </div>
  );
}
