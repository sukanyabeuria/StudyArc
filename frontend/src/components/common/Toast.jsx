import React from 'react';
import { Sparkles, Trophy, Flame, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-300">
      <div 
        className="p-4 rounded-2xl bg-focus-900 border border-orange-500/40 shadow-2xl text-zinc-100 flex items-start gap-3 backdrop-blur-md"
        style={{ boxShadow: '0 0 30px rgba(249, 115, 22, 0.25)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shrink-0 shadow-md shadow-orange-500/30 text-white">
          {toast.leveledUp ? <Trophy className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>{toast.title}</span>
            {toast.leveledUp && (
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-orange-500 text-white font-black animate-bounce">
                NEW LEVEL!
              </span>
            )}
          </h4>
          <p className="text-xs text-zinc-300 mt-0.5">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-200 p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
