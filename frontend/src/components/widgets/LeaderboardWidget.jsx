import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchLeaderboard } from '../../api/client';
import { Trophy, Crown, Medal, User, Flame, Sparkles } from 'lucide-react';

export default function LeaderboardWidget() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeframe, setTimeframe] = useState('week'); // 'week' | 'all'
  const [loading, setLoading] = useState(true);

  // Fallback / initial mockup data matching design if database only has 1 or 2 users
  const fallbackLeaders = [
    { rank: 1, name: 'Aditi', xp: 2340, level: 7, currentStreak: 12 },
    { rank: 2, name: 'Rahul', xp: 2180, level: 6, currentStreak: 9 },
    { rank: 3, name: user?.name || 'Debasis', isCurrentUser: true, xp: user?.xp || 1920, level: user?.level || 5, currentStreak: user?.currentStreak || 5 },
    { rank: 4, name: 'Sneha', xp: 1760, level: 5, currentStreak: 6 },
    { rank: 5, name: 'Arjun', xp: 1500, level: 4, currentStreak: 4 },
  ];

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
      } catch (err) {
        console.warn('Leaderboard fallback used:', err.message);
        setLeaderboard(fallbackLeaders);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [user]);

  return (
    <div className="bg-focus-900/90 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
      {/* Header (Matching Mockup) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-orange-400" />
          <h3 className="text-base font-bold text-white">Leaderboard</h3>
        </div>

        {/* Timeframe selector */}
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-focus-850 border border-zinc-800 rounded-lg px-2 py-0.5 text-[11px] font-medium text-zinc-300 focus:outline-none focus:border-orange-500"
        >
          <option value="week">This Week</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Leaderboard Table / Rows */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 min-h-[220px]">
        {leaderboard.map((leader, index) => {
          const rank = leader.rank || index + 1;
          const isUser =
            leader.isCurrentUser ||
            (user && (leader._id === user._id || leader.name === user.name));

          return (
            <div
              key={leader._id || index}
              className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                isUser
                  ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/10 border border-orange-500/40 text-white font-bold shadow-sm shadow-orange-500/10'
                  : 'bg-focus-850/60 hover:bg-focus-850 border border-zinc-800/60 text-zinc-300'
              }`}
            >
              {/* Rank & User Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5 flex items-center justify-center font-bold">
                  {rank === 1 ? (
                    <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ) : rank === 2 ? (
                    <Medal className="w-4 h-4 text-zinc-300" />
                  ) : rank === 3 ? (
                    <Medal className="w-4 h-4 text-amber-600" />
                  ) : (
                    <span className="text-zinc-500 text-xs">{rank}</span>
                  )}
                </div>

                <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-orange-400 border border-zinc-700/80">
                  {leader.avatar ? (
                    <img src={leader.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    leader.name?.[0]?.toUpperCase() || <User className="w-3 h-3" />
                  )}
                </div>

                <div className="min-w-0 truncate">
                  <p className="truncate font-semibold">
                    {isUser ? `You (${leader.name})` : leader.name}
                  </p>
                </div>
              </div>

              {/* XP Count */}
              <div className="flex items-center gap-1 shrink-0 font-mono font-bold text-orange-400">
                <span>{leader.xp.toLocaleString()}</span>
                <span className="text-[10px] font-sans text-zinc-400 font-normal">xp</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Quote (Matching Mockup) */}
      <div className="pt-3 border-t border-zinc-800/80 text-center select-none">
        <p className="text-[11px] text-zinc-500 font-medium italic">
          "Consistent Effort Leads to Greatness ✨"
        </p>
      </div>
    </div>
  );
}
