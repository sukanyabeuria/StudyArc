import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Flame, User, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  return (
    <nav className="relative z-30 w-full px-6 py-4 flex items-center justify-between border-b border-zinc-800/60 bg-focus-950/80 backdrop-blur-md">
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('landing')}
        className="flex items-center gap-2.5 cursor-pointer group select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md shadow-orange-600/30 group-hover:shadow-orange-500/50 transition-all">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
          Focus<span className="text-orange-500">Nest</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
        <button
          onClick={() => setActiveTab('landing')}
          className={`hover:text-orange-400 transition-colors ${
            activeTab === 'landing' ? 'text-orange-400 font-semibold' : ''
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab(isAuthenticated ? 'room' : 'landing')}
          className={`hover:text-orange-400 transition-colors ${
            activeTab === 'room' ? 'text-orange-400 font-semibold' : ''
          }`}
        >
          Study Room
        </button>
        <button
          onClick={() => setActiveTab(isAuthenticated ? 'workspace' : 'landing')}
          className={`hover:text-orange-400 transition-colors ${
            activeTab === 'workspace' ? 'text-orange-400 font-semibold' : ''
          }`}
        >
          Workspace
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`hover:text-orange-400 transition-colors ${
            activeTab === 'leaderboard' ? 'text-orange-400 font-semibold' : ''
          }`}
        >
          Leaderboard
        </button>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>{user?.currentStreak || 0}d streak</span>
            </div>

            {/* Profile Pill */}
            <button
              onClick={() => setActiveTab('room')}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-full transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs font-medium text-zinc-200">{user?.name || 'Debasis'}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-300 font-bold">
                Lv.{user?.level || 1}
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800/60 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuthModal('login')}
              className="text-xs font-semibold text-zinc-300 hover:text-white px-3 py-1.5 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full shadow-md shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
