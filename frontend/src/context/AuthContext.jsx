import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile } from '../api/client';
import {
  auth,
  isFirebaseConfigured,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile as updateFirebaseProfile,
  formatFirebaseError
} from '../config/firebase';

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('studyarc_token') || localStorage.getItem('focusnest_token') || ''
  );
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [authError, setAuthError] = useState(null);

  // 1. Firebase onAuthStateChanged listener
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          localStorage.setItem('studyarc_token', idToken);
          setToken(idToken);

          // Synchronize profile with backend MongoDB (JIT provisioning)
          const res = await getMyProfile();
          if (res.success && res.data) {
            setUser(res.data);
          } else {
            setUser({
              _id: firebaseUser.uid,
              firebaseUid: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Focus Learner',
              email: firebaseUser.email,
              level: 1,
              xp: 0
            });
          }
        } catch (err) {
          console.error('[AuthContext] Failed to sync user profile:', err);
          setUser({
            _id: firebaseUser.uid,
            firebaseUid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Focus Learner',
            email: firebaseUser.email,
            level: 1,
            xp: 0
          });
        } finally {
          setLoading(false);
        }
      } else {
        // Only clear if not using developer/demo token
        if (!token.startsWith('dev_token_')) {
          setUser(null);
          setToken('');
          localStorage.removeItem('studyarc_token');
          localStorage.removeItem('focusnest_token');
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [token]);

  // 2. Token observer / dev auth fallback
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // If token is a dev token or Firebase auth is not configured
      if (token.startsWith('dev_token_') || !auth) {
        try {
          const res = await getMyProfile();
          if (res.success && res.data) {
            setUser(res.data);
          } else {
            const devUid = token.replace('dev_token_', '') || 'debasis';
            const capitalized = devUid.charAt(0).toUpperCase() + devUid.slice(1);
            setUser({
              _id: '65f1a2b3c4d5e6f7a8b9c0d1',
              firebaseUid: `dev_${devUid}`,
              name: capitalized,
              email: `${devUid}@studyarc.com`,
              level: 1,
              xp: 0
            });
          }
        } catch (err) {
          console.warn('Backend unavailable, using local session:', err.message);
          const devUid = token.replace('dev_token_', '') || 'debasis';
          const capitalized = devUid.charAt(0).toUpperCase() + devUid.slice(1);
          setUser({
            _id: '65f1a2b3c4d5e6f7a8b9c0d1',
            firebaseUid: `dev_${devUid}`,
            name: capitalized,
            email: `${devUid}@studyarc.com`,
            level: 1,
            xp: 0
          });
        } finally {
          setLoading(false);
        }
      }
    }

    loadUser();
  }, [token]);

  const loginWithToken = (newToken) => {
    localStorage.setItem('studyarc_token', newToken);
    setToken(newToken);
    setAuthModalOpen(false);
    setAuthError(null);
  };

  // Real Firebase Email/Password Sign-In
  const login = async (email, password) => {
    setAuthError(null);
    if (!isFirebaseConfigured() || !auth) {
      const err = new Error(
        'Firebase Authentication is not configured on this environment. Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in Vercel.'
      );
      err.code = 'auth/not-configured';
      setAuthError(err.message);
      throw err;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('studyarc_token', idToken);
      setToken(idToken);
      setAuthModalOpen(false);
      return userCredential.user;
    } catch (error) {
      console.error('[Firebase Login Error]:', error.code, error.message);
      const friendlyMsg = formatFirebaseError(error);
      setAuthError(friendlyMsg);
      throw error;
    }
  };

  // Real Firebase Email/Password Sign-Up
  const signup = async (email, password, displayName) => {
    setAuthError(null);
    if (!isFirebaseConfigured() || !auth) {
      const err = new Error(
        'Firebase Authentication is not configured on this environment. Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in Vercel.'
      );
      err.code = 'auth/not-configured';
      setAuthError(err.message);
      throw err;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && userCredential.user) {
        await updateFirebaseProfile(userCredential.user, { displayName });
      }
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('studyarc_token', idToken);
      setToken(idToken);
      setAuthModalOpen(false);
      return userCredential.user;
    } catch (error) {
      console.error('[Firebase Signup Error]:', error.code, error.message);
      const friendlyMsg = formatFirebaseError(error);
      setAuthError(friendlyMsg);
      throw error;
    }
  };

  // Real Firebase Google Sign-In
  const loginWithGoogle = async () => {
    setAuthError(null);
    if (!isFirebaseConfigured() || !auth) {
      const err = new Error(
        'Firebase Authentication is not configured on this environment. Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in Vercel.'
      );
      err.code = 'auth/not-configured';
      setAuthError(err.message);
      throw err;
    }

    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const idToken = await res.user.getIdToken();
      localStorage.setItem('studyarc_token', idToken);
      setToken(idToken);
      setAuthModalOpen(false);
      return res.user;
    } catch (error) {
      console.error('[Google Auth Error]:', error.code, error.message);
      const friendlyMsg = formatFirebaseError(error);
      setAuthError(friendlyMsg);
      throw error;
    }
  };

  // Real Firebase GitHub Sign-In
  const loginWithGithub = async () => {
    setAuthError(null);
    if (!isFirebaseConfigured() || !auth) {
      const err = new Error(
        'Firebase Authentication is not configured on this environment. Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in Vercel.'
      );
      err.code = 'auth/not-configured';
      setAuthError(err.message);
      throw err;
    }

    try {
      const provider = new GithubAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const idToken = await res.user.getIdToken();
      localStorage.setItem('studyarc_token', idToken);
      setToken(idToken);
      setAuthModalOpen(false);
      return res.user;
    } catch (error) {
      console.error('[GitHub Auth Error]:', error.code, error.message);
      const friendlyMsg = formatFirebaseError(error);
      setAuthError(friendlyMsg);
      throw error;
    }
  };

  // Instant developer / demo login as the mockup persona "Debasis" or custom user
  const devLogin = (username = 'Debasis') => {
    const devToken = `dev_token_${username.toLowerCase().replace(/\s+/g, '_')}`;
    loginWithToken(devToken);
  };

  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    } finally {
      localStorage.removeItem('studyarc_token');
      localStorage.removeItem('focusnest_token');
      setToken('');
      setUser(null);
      setAuthError(null);
    }
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
    setAuthError(null);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthError(null);
  };

  const awardXp = (amount = 15) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newXp = (prev.xp || 0) + amount;
      const newLevel = Math.floor(newXp / 250) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
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
        authError,
        isFirebaseConfigured: isFirebaseConfigured(),
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        loginWithGoogle,
        loginWithGithub,
        loginWithToken,
        devLogin,
        logout,
        refreshUser,
        awardXp,
        clearAuthError: () => setAuthError(null),
        updateProfile: updateMyProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components, react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
