import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Auto-prompt login modal when user attempts to access protected page
      openAuthModal('login');
    }
  }, [loading, isAuthenticated, openAuthModal, location.pathname]);

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-black text-white space-y-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-600/30 animate-pulse">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="absolute -inset-2 rounded-2xl border-2 border-orange-500/30 animate-spin border-t-orange-500" />
        </div>
        <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase font-syne">
          Entering Focus Sanctuary...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
