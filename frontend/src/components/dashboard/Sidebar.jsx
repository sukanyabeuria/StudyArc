import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  LayoutGrid,
  Trophy,
  Info,
  Settings,
  LogOut,
  User,
  BookOpen
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/room', label: 'Home', icon: Home },
    { to: '/workspace', label: 'Workspace', icon: LayoutGrid },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/about', label: 'About', icon: Info },
  ];

  const currentXp = user?.xp || 0;
  const currentLevel = user?.level || 1;
  const xpInCurrentLevel = currentXp % 250;
  const xpPercent = Math.min(Math.round((xpInCurrentLevel / 250) * 100), 100);

  return (
    <aside className="w-56 shrink-0 h-full flex flex-col justify-between p-3.5 bg-[#090a0d] border-r border-zinc-800/80 select-none z-20 overflow-hidden">
      {/* Top Section */}
      <div>
        <NavLink
          to="/room"
          className="flex items-center gap-2 mb-6 px-1.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md shadow-orange-600/30 group-hover:shadow-orange-500/50 transition-all">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-white flex items-center gap-1">
            Focus<span className="text-orange-500">Nest</span>
          </span>
        </NavLink>

        {/* Navigation Items with NavLink */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Card */}
      <div className="pt-3 border-t border-zinc-850 space-y-3">
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 shadow-md">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-orange-600/20">
                {user?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-zinc-900" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-zinc-100 truncate">{user?.name || 'Debasis'}</h4>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="text-orange-400 font-semibold">Lv. {currentLevel}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400">{currentXp} XP</span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] text-zinc-400 font-medium">
              <span>Next Level</span>
              <span>{xpPercent}%</span>
            </div>
            <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between px-1.5 text-[11px] text-zinc-400">
          <NavLink
            to="/workspace"
            className="flex items-center gap-1 hover:text-zinc-100 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Workspace</span>
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-1 text-zinc-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
