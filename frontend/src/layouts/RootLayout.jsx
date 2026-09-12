import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import AuthModal from '../components/auth/AuthModal';
import Toast from '../components/common/Toast';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
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
    <div className="h-screen w-screen overflow-hidden bg-black text-zinc-100 flex flex-col select-none">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Auth Modal */}
      <AuthModal />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Single-Screen Content Area */}
      <div className="h-[calc(100vh-3.5rem)] w-full flex overflow-hidden bg-black">
        {/* Show Sidebar on inner application pages */}
        {!isLandingPage && (
          <Sidebar />
        )}

        {/* View Content (Outlet) */}
        <main className="flex-1 h-full overflow-hidden bg-black flex flex-col">
          <Outlet context={{ onSessionComplete: handleSessionComplete }} />
        </main>
      </div>
    </div>
  );
}
