import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchLeaderboard } from '../../api/client';
import { Trophy, Crown, Medal, User } from 'lucide-react';

export default function LeaderboardWidget() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeframe, setTimeframe] = useState('week');
  const [loading, setLoading] = useState(true);

  const fallbackLeaders = [
    { rank: 1, name: 'Aditi', xp: 2340, level: 7, currentStreak: 12 },
    { rank: 2, name: 'Rahul', xp: 2180, level: 6, currentStreak: 9 },
    { rank: 3, name: user?.name || 'Debasis', isCurrentUser: true, xp: user?.xp || 1920, level: user?.level || 5, currentStreak: user?.currentStreak || 5 },
    { rank: 4, name: 'Sneha', xp: 1760, level: 5, currentStreak: 6 },
    { rank: 5, name: 'Arjun', xp: 1500, level: 4, currentStreak: 4 },
    { rank: 6, name: 'Priya', xp: 1320, level: 4, currentStreak: 3 },
    { rank: 7, name: 'Vikram', xp: 1100, level: 3, currentStreak: 2 },
    { rank: 8, name: 'Ananya', xp: 950, level: 3, currentStreak: 2 }
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
        setLeaderboard(fallbackLeaders);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [user]);

  return (
    <div className="bg-gradient-to-b from-[#0c0e15] to-[#08090d] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-4 shadow-2xl flex flex-col justify-between h-full overflow-hidden text-zinc-100 relative">
      {/* Subtle Inner Highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shadow-sm shadow-orange-500/10">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-syne leading-none">Scholar Rankings</h3>
            <span className="text-[10px] text-zinc-400 font-medium">Global XP Standings</span>
          </div>
        </div>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-zinc-950 border border-zinc-800/90 rounded-xl px-2.5 py-1 text-[10px] font-medium text-zinc-300 focus:outline-none focus:border-orange-500 transition-colors"
        >
          <option value="week">This Week</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Leaderboard Table with Custom Scrollbar */}
      <div className="custom-scrollbar flex-1 overflow-y-auto space-y-1.5 pr-1 min-h-0">
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
                  ? 'bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-transparent border border-orange-500/50 shadow-md shadow-orange-500/10 text-white font-bold ring-1 ring-orange-500/20'
                  : rank === 1
                  ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 text-amber-200'
                  : rank === 2
                  ? 'bg-zinc-900/80 border border-zinc-750 text-zinc-200'
                  : rank === 3
                  ? 'bg-orange-950/20 border border-orange-800/30 text-orange-300'
                  : 'bg-zinc-950/60 hover:bg-zinc-900/60 border border-zinc-850/80 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-4 flex items-center justify-center font-bold">
                  {rank === 1 ? (
                    <Crown className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  ) : rank === 2 ? (
                    <Medal className="w-4 h-4 text-zinc-300" />
                  ) : rank === 3 ? (
                    <Medal className="w-4 h-4 text-amber-600" />
                  ) : (
                    <span className="text-zinc-500 text-[11px] font-mono">{rank}</span>
                  )}
                </div>

                <div className="relative">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isUser
                      ? 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-sm shadow-orange-500/30'
                      : rank === 1
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                  }`}>
                    {leader.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="min-w-0 flex items-center gap-1.5 truncate">
                  <p className="truncate text-xs font-semibold">
                    {leader.name}
                  </p>
                  {isUser && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-orange-500 text-white uppercase shadow-sm shadow-orange-500/30">
                      You
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs font-bold text-orange-400">
                <span>{leader.xp.toLocaleString()}</span>
                <span className="text-[10px] font-sans text-zinc-500 font-normal uppercase">XP</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Quote */}
      <div className="pt-2.5 border-t border-zinc-850/80 text-center select-none">
        <p className="text-[10px] text-zinc-400 font-medium italic">
          "Consistent Effort Leads to Greatness ✨"
        </p>
      </div>
    </div>
  );
}
