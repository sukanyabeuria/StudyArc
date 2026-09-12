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
  const strokeProgress = (timeLeft / totalDuration) * 283;

  return (
    <div className="bg-[#0b0c0f] border border-zinc-850 rounded-2xl p-3.5 shadow-xl flex flex-col justify-between h-full overflow-hidden text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange-500/15 text-orange-400 flex items-center justify-center">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-none">Pomodoro</h3>
            <span className="text-[10px] text-zinc-500 font-medium">Focus Interval</span>
          </div>
        </div>

        <button 
          onClick={resetTimer}
          className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-850 transition-colors"
          title="Reset timer"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-xl mb-2 border border-zinc-850 text-[11px]">
        {['pomodoro', 'short_break', 'long_break'].map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 py-1 rounded-lg font-medium capitalize transition-all ${
              mode === m
                ? 'bg-orange-500 text-white font-bold shadow-sm shadow-orange-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {m.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Circular Progress Timer (Compact to fit one screen) */}
      <div className="relative flex flex-col items-center justify-center my-auto select-none py-1">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1a1c23"
              strokeWidth="5"
            />
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
              className="transition-all duration-1000 ease-linear drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            />
          </svg>

          {/* Time text inside ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black tracking-tight text-white font-mono">
              {timeFormatted}
            </span>
            <span className="text-[9px] font-semibold text-orange-400 uppercase tracking-wider mt-0.5">
              {isRunning ? 'Focusing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center justify-center gap-2.5 my-1.5">
        <button
          onClick={toggleTimer}
          className="flex-1 max-w-[130px] py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-850 text-[11px] text-zinc-400">
        <div className="flex items-center gap-1">
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
