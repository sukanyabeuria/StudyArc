import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  LayoutGrid,
  Trophy,
  Info,
  Settings,
  LogOut,
  User
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    <aside className="w-56 shrink-0 h-full flex flex-col justify-between p-3 bg-[#08090c] border-r border-zinc-800/80 select-none z-20 overflow-hidden">
      {/* Navigation Items */}
      <div className="pt-2">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/20 via-orange-500/5 to-transparent border-l-2 border-orange-500 text-orange-400 font-bold shadow-sm shadow-orange-500/5'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border-l-2 border-transparent font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-zinc-500'}`} />
                    <span className="tracking-wide">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Card */}
      <div className="pt-3 border-t border-zinc-850/80 space-y-2.5">
        <div className="p-3 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/80 shadow-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-orange-600/30">
                {user?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-zinc-950" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-zinc-100 truncate">{user?.name || 'Debasis'}</h4>
              <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
                <span className="px-1.5 py-0.2 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 font-bold">
                  Lv. {currentLevel}
                </span>
                <span className="text-zinc-400 font-medium">{currentXp} XP</span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] text-zinc-400 font-medium">
              <span>Next Level</span>
              <span className="text-orange-400 font-bold">{xpPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between px-2 text-[11px] text-zinc-400">
          <NavLink
            to="/workspace"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-zinc-500" />
            <span>Workspace</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
