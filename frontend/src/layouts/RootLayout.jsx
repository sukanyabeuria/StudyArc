import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import AuthModal from '../components/auth/AuthModal';
import Toast from '../components/common/Toast';

import PageTransition from '../components/common/PageTransition';

export default function RootLayout() {
  const location = useLocation();
  const [toast, setToast] = useState(null);

  const isLandingPage = location.pathname === '/';

  const handleSessionComplete = (result) => {
    const gamification = result?.gamification;
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
    <div className={`w-full bg-black text-zinc-100 flex flex-col select-none ${isLandingPage ? 'min-h-screen overflow-x-hidden' : 'h-screen overflow-hidden'}`}>
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Auth Modal */}
      <AuthModal />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className={`w-full flex bg-black ${isLandingPage ? 'flex-1 overflow-visible' : 'h-[calc(100vh-3.5rem)] overflow-hidden'}`}>
        {/* Show Sidebar on inner application pages */}
        {!isLandingPage && (
          <Sidebar />
        )}

        {/* View Content (Outlet) with PageTransition */}
        <main className={`flex-1 bg-black flex flex-col ${isLandingPage ? 'min-h-full overflow-visible' : 'h-full overflow-hidden'}`}>
          <PageTransition>
            <Outlet context={{ onSessionComplete: handleSessionComplete }} />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
