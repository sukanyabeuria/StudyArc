import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthContext';
import { logSession } from '../../api/client';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Flame, Settings, Trophy, Sparkles } from 'lucide-react';
import { useMagneticButton, animateTabSwitch } from '../../animations/microInteractions';

const MODE_DURATIONS = {
  pomodoro: 25 * 60,
  short_break: 5 * 60,
  long_break: 15 * 60
};

export default function PomodoroWidget({ onSessionComplete }) {
  const { refreshUser } = useAuth();

  const [mode, setMode] = useState('pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionsCompletedToday, setSessionsCompletedToday] = useState(3);
  const [showCelebration, setShowCelebration] = useState(false);

  const timerRef = useRef(null);
  const ringRef = useRef(null);
  const trophyRef = useRef(null);
  const pulseTweenRef = useRef(null);
  const startBtnRef = useRef(null);
  const resetBtnRef = useRef(null);

  useMagneticButton(startBtnRef, { strength: 0.25, maxDistance: 10 });
  useMagneticButton(resetBtnRef, { strength: 0.2, maxDistance: 8 });

  const totalDuration = MODE_DURATIONS[mode];

  // GSAP Breathing Pulse on timer ring while running
  useEffect(() => {
    if (isRunning && ringRef.current) {
      pulseTweenRef.current = gsap.to(ringRef.current, {
        scale: 1.025,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    } else {
      if (pulseTweenRef.current) {
        pulseTweenRef.current.kill();
        pulseTweenRef.current = null;
      }
      if (ringRef.current) {
        gsap.to(ringRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    }

    return () => {
      if (pulseTweenRef.current) pulseTweenRef.current.kill();
    };
  }, [isRunning]);

  const handleComplete = useCallback(async () => {
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

    // GSAP Celebration Animation
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);

    if (ringRef.current) {
      gsap.fromTo(
        ringRef.current,
        { scale: 0.95 },
        { scale: 1.08, duration: 0.35, yoyo: true, repeat: 1, ease: 'back.out(2)' }
      );
    }

    if (trophyRef.current) {
      gsap.fromTo(
        trophyRef.current,
        { scale: 0.7, rotate: -25 },
        { scale: 1.25, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }
      );
    }

    // Confetti waves
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fb923c', '#f59e0b']
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#ea580c', '#fbbf24', '#ffffff']
      });
    }, 350);

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
  }, [mode, refreshUser, onSessionComplete]);

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
  }, [isRunning, handleComplete]);

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODE_DURATIONS[newMode]);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODE_DURATIONS[mode]);
    if (resetBtnRef.current) {
      gsap.fromTo(resetBtnRef.current, { rotate: 0 }, { rotate: 360, duration: 0.45, ease: 'power2.out' });
    }
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
          <div ref={trophyRef} className="tilt-depth-lg w-6 h-6 rounded-md bg-orange-500/15 text-orange-400 flex items-center justify-center">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <div className="tilt-depth-md">
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
            onClick={(e) => {
              animateTabSwitch(e.currentTarget);
              switchMode(m);
            }}
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
        {/* Celebration Floating Badge */}
        {showCelebration && (
          <div className="absolute -top-3 z-30 pointer-events-none flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs shadow-xl shadow-orange-500/60 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>+25 XP! Session Done! 🔥</span>
          </div>
        )}

        <div ref={ringRef} className="relative w-36 h-36 flex items-center justify-center transition-transform">
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
          ref={startBtnRef}
          onClick={toggleTimer}
          className="flex-1 max-w-[130px] py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          ref={resetBtnRef}
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
