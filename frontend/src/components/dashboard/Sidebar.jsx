import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  Home,
  LayoutGrid,
  Trophy,
  Info,
  Settings,
  LogOut,
  User,
  Flame,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'room', label: 'Home', icon: Home },
    { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'about', label: 'About', icon: Info },
  ];

  // Calculate XP progress bar percentage
  const currentXp = user?.xp || 0;
  const currentLevel = user?.level || 1;
  // Calculate relative progress in level (approx 150-250 XP per level)
  const xpInCurrentLevel = currentXp % 250;
  const xpPercent = Math.min(Math.round((xpInCurrentLevel / 250) * 100), 100);

  return (
    <aside className="w-64 shrink-0 h-full flex flex-col justify-between p-5 bg-focus-900 border-r border-zinc-800/80 select-none z-20">
      {/* Top: Brand Logo */}
      <div>
        <div 
          onClick={() => setActiveTab('room')}
          className="flex items-center gap-2.5 mb-8 px-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:shadow-orange-500/50 transition-all">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
            Focus<span className="text-orange-500">Nest</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/30 text-orange-400 shadow-sm shadow-orange-500/10'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Profile & Level Card (Matching Mockup) */}
      <div className="pt-4 border-t border-zinc-800/80 space-y-4">
        {/* User Card */}
        <div className="p-3.5 rounded-2xl bg-focus-850 border border-zinc-800/80 shadow-md">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-orange-600/20">
                {user?.name?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
              </div>
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-focus-850">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-zinc-100 truncate">{user?.name || 'Debasis'}</h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-orange-400 font-semibold">Level {currentLevel}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400">{currentXp} XP</span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span>Progress</span>
              <span>{xpPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between px-2 text-xs text-zinc-400">
          <button
            onClick={() => setActiveTab('workspace')}
            className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
