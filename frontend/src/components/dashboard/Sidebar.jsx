import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
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
import { animateLevelBadgePop, animateXpProgressBar, animateNumberCounter } from '../../animations/rewardAnimations';
import { init3DTilt } from '../../animations/cardAnimations';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const progressBarRef = useRef(null);
  const levelBadgeRef = useRef(null);
  const xpTextRef = useRef(null);
  const prevXpRef = useRef(user?.xp || 0);
  const profileCardRef = useRef(null);
  const navContainerRef = useRef(null);

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

  // GSAP XP Bar Fill & Number Counter Animation
  useEffect(() => {
    if (progressBarRef.current) {
      animateXpProgressBar(progressBarRef.current, xpPercent);
    }
    if (xpTextRef.current) {
      animateNumberCounter(xpTextRef.current, prevXpRef.current, currentXp, { suffix: ' XP' });
      prevXpRef.current = currentXp;
    }
  }, [xpPercent, currentXp]);

  // Level Badge 3D Pop on change
  useEffect(() => {
    if (levelBadgeRef.current) {
      animateLevelBadgePop(levelBadgeRef.current);
    }
  }, [currentLevel]);

  // 3D tilt on bottom profile card and nav entrance
  useEffect(() => {
    const cleanups = [];
    if (profileCardRef.current) {
      cleanups.push(init3DTilt(profileCardRef.current, { maxTilt: 4, perspective: 700, scale: 1.01 }));
    }

    if (navContainerRef.current) {
      const items = navContainerRef.current.querySelectorAll('.sidebar-nav-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', clearProps: 'opacity,transform' }
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <aside className="w-56 shrink-0 h-full flex flex-col justify-between p-3 bg-[#08090c] border-r border-zinc-800/80 select-none z-20 overflow-hidden">
      {/* Navigation Items */}
      <div className="pt-1.5">
        <nav ref={navContainerRef} className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-nav-item relative w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/20 via-orange-500/5 to-transparent border-l-2 border-orange-500 text-orange-400 font-bold shadow-sm shadow-orange-500/5'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border-l-2 border-transparent font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-orange-500 to-amber-400 rounded-r shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                    )}
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 duration-200 ${isActive ? 'text-orange-400' : 'text-zinc-400'}`} />
                    <span className="transition-transform group-hover:translate-x-0.5 duration-200">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Card */}
      <div className="pt-2.5 border-t border-zinc-850 space-y-2.5 perspective-800">
        <div ref={profileCardRef} className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-850 shadow-md hover:border-orange-500/30 transition-all preserve-3d will-change-transform">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="tilt-depth-lg relative">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-orange-600/20">
                {user?.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-zinc-950" />
            </div>

            <div className="tilt-depth-md flex-1 min-w-0">
              <h4 className="text-xs font-bold text-zinc-100 truncate">{user?.name || 'Debasis'}</h4>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span ref={levelBadgeRef} className="text-orange-400 font-semibold inline-block">Lv. {currentLevel}</span>
                <span className="text-zinc-500">·</span>
                <span ref={xpTextRef} className="text-zinc-400">{currentXp} XP</span>
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
                ref={progressBarRef}
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.6)]"
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
            className="flex items-center gap-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
