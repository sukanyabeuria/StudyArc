import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Flame, User, LogOut, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  return (
    <nav className="h-14 shrink-0 px-5 flex items-center justify-between border-b border-zinc-800/80 bg-black z-30 select-none">
      {/* Brand Logo */}
      <NavLink 
        to="/"
        className="flex items-center gap-2.5 group cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md shadow-orange-600/30 group-hover:shadow-orange-500/50 transition-all">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-bold tracking-tight text-white flex items-center gap-1">
          Focus<span className="text-orange-500">Nest</span>
        </span>
      </NavLink>

      {/* Navigation Links using NavLink */}
      <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/room"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`
          }
        >
          Study Room
        </NavLink>

        <NavLink
          to="/workspace"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`
          }
        >
          Workspace
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`
          }
        >
          Leaderboard
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? 'text-orange-400 bg-orange-500/10 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`
          }
        >
          About
        </NavLink>
      </div>

      {/* Right User Controls */}
      <div className="flex items-center gap-2.5">
        {isAuthenticated ? (
          <div className="flex items-center gap-2.5">
            {/* Streak Indicator */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-orange-400">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>{user?.currentStreak || 0}d streak</span>
            </div>

            {/* User Profile Pill */}
            <NavLink
              to="/room"
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500/40 rounded-full transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold">
                {user?.name?.[0]?.toUpperCase() || <User className="w-3 h-3" />}
              </div>
              <span className="text-xs font-medium text-zinc-200">{user?.name || 'Debasis'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-orange-500/20 text-orange-300 font-bold">
                Lv.{user?.level || 1}
              </span>
            </NavLink>

            {/* Log Out */}
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openAuthModal('login')}
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="px-3.5 py-1.5 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
