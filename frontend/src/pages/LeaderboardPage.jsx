import React from 'react';
import LeaderboardWidget from '../components/widgets/LeaderboardWidget';

export default function LeaderboardPage() {
  return (
    <div className="h-full w-full p-4 sm:p-6 bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full h-[85%] max-h-[700px]">
        <LeaderboardWidget />
      </div>
    </div>
  );
}
