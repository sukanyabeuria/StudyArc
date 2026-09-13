import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Flame, User, LogOut } from 'lucide-react';
import { useMagneticButton } from '../../animations/microInteractions';

export default function Navbar() {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const getStartedRef = useRef(null);

  useMagneticButton(getStartedRef, { strength: 0.25, maxDistance: 8 });

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
          Study<span className="text-orange-500">Arc</span>
        </span>
      </NavLink>

      {/* Navigation Links using NavLink */}
      <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
        {[
          { to: '/', label: 'Home' },
          { to: '/room', label: 'Study Room' },
          { to: '/workspace', label: 'Workspace' },
          { to: '/leaderboard', label: 'Leaderboard' },
          { to: '/about', label: 'About' }
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'text-orange-400 bg-orange-500/15 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Right User Controls */}
      <div className="flex items-center gap-2.5">
        {isAuthenticated ? (
          <div className="flex items-center gap-2.5">
            {/* Streak Indicator with Warm Flame Flicker */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-semibold text-orange-400 hover:border-orange-500/30 transition-all">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
              <span>{user?.currentStreak || 0}d streak</span>
            </div>

            {/* User Profile Pill */}
            <NavLink
              to="/room"
              className="group flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-orange-500/50 rounded-full transition-all hover:shadow-sm hover:shadow-orange-500/20 active:scale-95"
            >
              <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold transition-transform group-hover:scale-110">
                {user?.name?.[0]?.toUpperCase() || <User className="w-3 h-3" />}
              </div>
              <span className="text-xs font-medium text-zinc-200">{user?.name || 'Debasis'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
                Lv.{user?.level || 1}
              </span>
            </NavLink>

            {/* Log Out */}
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-all active:scale-90"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openAuthModal('login')}
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 transition-all active:scale-95"
            >
              Log In
            </button>
            <button
              ref={getStartedRef}
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
