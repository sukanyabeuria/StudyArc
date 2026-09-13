import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import AuthModal from '../components/auth/AuthModal';
import Toast from '../components/common/Toast';
import ThreeSanctuaryBackground from '../components/three/ThreeSanctuaryBackground';
import LevelUpRewardModal from '../components/common/LevelUpRewardModal';
import CursorFollower from '../components/common/CursorFollower';
import { animatePageEnter } from '../animations/pageTransitions';

export default function RootLayout() {
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const [levelUpData, setLevelUpData] = useState(null);
  const mainViewRef = useRef(null);

  const isLandingPage = location.pathname === '/';

  // GSAP Smooth Route Transition
  useEffect(() => {
    if (mainViewRef.current) {
      const tween = animatePageEnter(mainViewRef.current);
      return () => {
        if (tween) tween.kill();
      };
    }
  }, [location.pathname]);

  const handleSessionComplete = (result) => {
    const gamification = result?.gamification;

    if (gamification?.leveledUp) {
      setLevelUpData({
        level: gamification?.newLevel || (result?.user?.level || 2),
        xpGained: gamification?.xpGained || 25
      });
    }

    setToast({
      title: gamification?.leveledUp ? 'Level Up!' : 'Study Session Completed!',
      message: `+${gamification?.xpGained || 25} XP earned! Current streak: ${gamification?.currentStreak || 1} day(s) 🔥`,
      leveledUp: gamification?.leveledUp
    });

    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-zinc-100 flex flex-col select-none relative">
      {/* Three.js 3D Ambient Sanctuary Constellation & Ember Field */}
      <ThreeSanctuaryBackground />

      {/* Subtle Custom Cursor Follower */}
      <CursorFollower />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Level Up Celebration Modal */}
      <LevelUpRewardModal
        open={!!levelUpData}
        level={levelUpData?.level}
        xpGained={levelUpData?.xpGained}
        onClose={() => setLevelUpData(null)}
      />

      {/* Auth Modal */}
      <AuthModal />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Single-Screen Content Area */}
      <div className="h-[calc(100vh-3.5rem)] w-full flex overflow-hidden bg-black relative z-10">
        {/* Show Sidebar on inner application pages */}
        {!isLandingPage && (
          <Sidebar />
        )}

        {/* View Content (Outlet) */}
        <main ref={mainViewRef} className="flex-1 h-full overflow-hidden bg-black flex flex-col">
          <Outlet context={{ onSessionComplete: handleSessionComplete }} />
        </main>
      </div>
    </div>
  );
}

