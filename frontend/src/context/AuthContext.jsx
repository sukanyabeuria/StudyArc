import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('focusnest_token') || '');
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  // Load user profile whenever token changes
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await getMyProfile();
        if (res.success && res.data) {
          setUser(res.data);
        }
      } catch (err) {
        console.warn('Auth token invalid or expired:', err.message);
        localStorage.removeItem('focusnest_token');
        setToken('');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  const loginWithToken = (newToken) => {
    localStorage.setItem('focusnest_token', newToken);
    setToken(newToken);
    setAuthModalOpen(false);
  };

  // Instant developer / demo login as the mockup persona "Debasis" or custom user
  const devLogin = (username = 'Debasis') => {
    const devToken = `dev_token_${username.toLowerCase().replace(/\s+/g, '_')}`;
    loginWithToken(devToken);
  };

  const logout = () => {
    localStorage.removeItem('focusnest_token');
    setToken('');
    setUser(null);
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await getMyProfile();
      if (res.success && res.data) {
        setUser(res.data);
      }
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        loginWithToken,
        devLogin,
        logout,
        refreshUser,
        updateProfile: updateMyProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
