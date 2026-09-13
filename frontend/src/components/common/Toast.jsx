import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Trophy, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toast && toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { y: -30, opacity: 0, scale: 0.9, rotateX: 15, transformPerspective: 600 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.42, ease: 'back.out(1.8)' }
      );
    }
  }, [toast]);

  if (!toast) return null;

  const handleClose = () => {
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        y: -15,
        opacity: 0,
        scale: 0.94,
        rotateX: -10,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  return (
    <div ref={toastRef} className="fixed top-6 right-6 z-50 max-w-sm w-full">
      <div 
        className="p-4 rounded-2xl bg-[#0e1017] border border-orange-500/40 shadow-2xl text-zinc-100 flex items-start gap-3 backdrop-blur-md transition-all hover:border-orange-500/60"
        style={{ boxShadow: '0 0 35px rgba(249, 115, 22, 0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shrink-0 shadow-md shadow-orange-500/30 text-white animate-pulse">
          {toast.leveledUp ? <Trophy className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>{toast.title}</span>
            {toast.leveledUp && (
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-orange-500 text-white font-black animate-bounce shadow-sm shadow-orange-500/40">
                NEW LEVEL!
              </span>
            )}
          </h4>
          <p className="text-xs text-zinc-300 mt-0.5">{toast.message}</p>
        </div>

        <button
          onClick={handleClose}
          className="text-zinc-400 hover:text-zinc-200 p-1 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
