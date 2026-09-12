import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import AuthModal from './components/auth/AuthModal';
import LandingView from './components/landing/LandingView';
import Sidebar from './components/dashboard/Sidebar';
import CozyRoomView from './components/dashboard/CozyRoomView';
import WorkspaceGrid from './components/dashboard/WorkspaceGrid';
import LeaderboardWidget from './components/widgets/LeaderboardWidget';
import AboutView from './components/dashboard/AboutView';
import Toast from './components/common/Toast';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('landing');
  const [toast, setToast] = useState(null);

  // If user just authenticated, navigate them straight to the Cozy Room!
  React.useEffect(() => {
    if (isAuthenticated && activeTab === 'landing') {
      setActiveTab('room');
    }
  }, [isAuthenticated]);

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

  const handleSelectRoomAction = (actionId) => {
    // When clicking any of the 4 room cards, jump straight into the full workspace
    setActiveTab('workspace');
  };

  return (
    <div className="min-h-screen bg-focus-950 text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Auth Modal (Login / Signup) */}
      <AuthModal />

      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* If authenticated and in app views, show the cozy sidebar */}
        {isAuthenticated && activeTab !== 'landing' && (
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* View Switcher */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {activeTab === 'landing' && (
            <LandingView onStartJourney={() => setActiveTab('room')} />
          )}

          {activeTab === 'room' && (
            <CozyRoomView onSelectAction={handleSelectRoomAction} />
          )}

          {activeTab === 'workspace' && (
            <WorkspaceGrid onSessionComplete={handleSessionComplete} />
          )}

          {activeTab === 'leaderboard' && (
            <div className="flex-1 p-6 lg:p-8 max-w-4xl mx-auto w-full">
              <LeaderboardWidget />
            </div>
          )}

          {activeTab === 'about' && (
            <AboutView onBackToRoom={() => setActiveTab('room')} />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
