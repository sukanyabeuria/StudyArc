import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthContext';
import { fetchLeaderboard } from '../../api/client';
import { Trophy, Crown, Medal, User } from 'lucide-react';
import { init3DTilt } from '../../animations/cardAnimations';

export default function LeaderboardWidget() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeframe, setTimeframe] = useState('week');
  const [loading, setLoading] = useState(true);
  const rowsContainerRef = useRef(null);

  const fallbackLeaders = React.useMemo(() => [
    { rank: 1, name: 'Aditi', xp: 2340, level: 7, currentStreak: 12 },
    { rank: 2, name: 'Rahul', xp: 2180, level: 6, currentStreak: 9 },
    { rank: 3, name: user?.name || 'Debasis', isCurrentUser: true, xp: user?.xp || 1920, level: user?.level || 5, currentStreak: user?.currentStreak || 5 },
    { rank: 4, name: 'Sneha', xp: 1760, level: 5, currentStreak: 6 },
    { rank: 5, name: 'Arjun', xp: 1500, level: 4, currentStreak: 4 },
    { rank: 6, name: 'Priya', xp: 1320, level: 4, currentStreak: 3 },
    { rank: 7, name: 'Vikram', xp: 1100, level: 3, currentStreak: 2 },
    { rank: 8, name: 'Ananya', xp: 950, level: 3, currentStreak: 2 }
  ], [user]);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const res = await fetchLeaderboard(10);
        if (res.success && res.data && res.data.length > 0) {
          setLeaderboard(res.data);
        } else {
          setLeaderboard(fallbackLeaders);
        }
      } catch {
        setLeaderboard(fallbackLeaders);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [user, fallbackLeaders]);

  // GSAP Stagger Entrance for rows with 3D tilt on top cards
  useEffect(() => {
    const cleanups = [];
    if (!loading && rowsContainerRef.current) {
      const rows = rowsContainerRef.current.querySelectorAll('.leaderboard-row');
      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -16, scale: 0.98, rotateX: 6, transformPerspective: 800 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.38,
            stagger: 0.04,
            ease: 'power2.out',
            clearProps: 'opacity,transform,transformPerspective'
          }
        );

        // Attach subtle 3D tilt to top rows
        rows.forEach((row, i) => {
          if (i < 3) {
            cleanups.push(init3DTilt(row, { maxTilt: 3.5, perspective: 800, scale: 1.01 }));
          }
        });
      }
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [loading, leaderboard]);

  return (
    <div className="bg-[#0b0c0f] border border-zinc-850 rounded-2xl p-3.5 shadow-xl flex flex-col justify-between h-full overflow-hidden text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="tilt-depth-lg w-6 h-6 rounded-md bg-orange-500/15 text-orange-400 flex items-center justify-center">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <div className="tilt-depth-md">
            <h3 className="text-xs font-bold text-white leading-none">Leaderboard</h3>
            <span className="text-[10px] text-zinc-500 font-medium">Top Scholars</span>
          </div>
        </div>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-0.5 text-[10px] font-medium text-zinc-300 focus:outline-none focus:border-orange-500"
        >
          <option value="week">This Week</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Leaderboard Table with Custom Scrollbar */}
      <div ref={rowsContainerRef} className="custom-scrollbar flex-1 overflow-y-auto space-y-1.5 pr-1 min-h-0">
        {leaderboard.map((leader, index) => {
          const rank = leader.rank || index + 1;
          const isUser =
            leader.isCurrentUser ||
            (user && (leader._id === user._id || leader.name === user.name));

          return (
            <div
              key={leader._id || index}
              className={`leaderboard-row flex items-center justify-between p-2 rounded-xl text-xs transition-all hover:translate-x-1 duration-150 ${
                isUser
                  ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/10 border border-orange-500/40 text-white font-bold shadow-sm'
                  : 'bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-4 flex items-center justify-center font-bold">
                  {rank === 1 ? (
                    <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] animate-pulse" />
                  ) : rank === 2 ? (
                    <Medal className="w-3.5 h-3.5 text-zinc-300" />
                  ) : rank === 3 ? (
                    <Medal className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <span className="text-zinc-600 text-[11px]">{rank}</span>
                  )}
                </div>

                <div className="w-6 h-6 rounded-full bg-zinc-850 flex items-center justify-center text-[10px] font-bold text-orange-400 border border-zinc-800">
                  {leader.name?.[0]?.toUpperCase() || <User className="w-3 h-3" />}
                </div>

                <div className="min-w-0 truncate">
                  <p className="truncate text-xs font-semibold">
                    {isUser ? `You (${leader.name})` : leader.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 font-mono text-xs font-bold text-orange-400">
                <span>{leader.xp.toLocaleString()}</span>
                <span className="text-[10px] font-sans text-zinc-500 font-normal">xp</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Quote */}
      <div className="pt-2 border-t border-zinc-850 text-center select-none">
        <p className="text-[10px] text-zinc-500 font-medium italic">
          "Consistent Effort Leads to Greatness ✨"
        </p>
      </div>
    </div>
  );
}
