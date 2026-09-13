import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, X, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { animateModalOpen, animateModalClose } from '../../animations/microInteractions';

export default function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    devLogin,
    login,
    signup,
    loginWithGoogle,
    loginWithGithub,
    authError,
    clearAuthError,
    isFirebaseConfigured
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const modalCardRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (authModalOpen && modalCardRef.current) {
      animateModalOpen(modalCardRef.current, backdropRef.current);
    }
  }, [authModalOpen]);

  if (!authModalOpen) return null;

  const isLogin = authModalMode === 'login';

  const handleClose = () => {
    clearAuthError();
    if (modalCardRef.current) {
      animateModalClose(modalCardRef.current, backdropRef.current, closeAuthModal);
    } else {
      closeAuthModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    setLoading(true);

    try {
      if (isFirebaseConfigured) {
        if (isLogin) {
          await login(email, password);
        } else {
          await signup(email, password, name || 'Focus Learner');
        }
      } else {
        // Transparent development fallback when Firebase credentials are not yet configured in Vercel
        const username = !isLogin && name ? name : email.split('@')[0] || 'Debasis';
        devLogin(username);
      }
    } catch (err) {
      console.error('[AuthModal Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    clearAuthError();
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await loginWithGoogle();
      } else {
        devLogin('Google Student');
      }
    } catch (err) {
      console.error('[Google Auth Modal Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    clearAuthError();
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await loginWithGithub();
      } else {
        devLogin('Github Coder');
      }
    } catch (err) {
      console.error('[GitHub Auth Modal Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md perspective-1000"
    >
      <div
        ref={modalCardRef}
        className="relative w-full max-w-md bg-focus-900/95 border border-zinc-800/80 rounded-2xl p-7 shadow-2xl shadow-orange-950/20 text-zinc-100 preserve-3d will-change-transform"
        style={{
          boxShadow: '0 0 40px rgba(249, 115, 22, 0.12), 0 20px 30px -10px rgba(0,0,0,0.8)'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Brand Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-600/30 mb-2">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-black font-syne tracking-tight text-white flex items-center">
            Study<span className="text-orange-500">Arc</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5 tracking-wide font-sans">Focus · Study · Grow</p>
        </div>

        {/* Header Title */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-1">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-zinc-400">
            {isLogin
              ? "Good to see you again! Let's keep going."
              : 'Join a community of lifelong learners.'}
          </p>
        </div>

        {/* Error Notification Banner */}
        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed flex-1">
              <span>{authError}</span>
            </div>
          </div>
        )}

        {/* Quick Demo Login Banner */}
        <div className="mb-5 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-xs text-orange-200 font-medium">Want instant access?</span>
          </div>
          <button
            type="button"
            onClick={() => {
              clearAuthError();
              devLogin('Debasis');
            }}
            className="px-3 py-1 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-sm shadow-orange-500/30"
          >
            Log In as Debasis
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-focus-850 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/50 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-focus-850 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min. 6 characters)"
                minLength={6}
                className="w-full bg-focus-850 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-800 text-orange-500 focus:ring-orange-500/40"
                />
                Remember me
              </label>
              <a href="#forgot" className="text-orange-400 hover:text-orange-300 transition-colors">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}</span>
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <span className="relative px-3 text-[11px] font-medium tracking-wider text-zinc-500 uppercase bg-focus-900">
            OR
          </span>
        </div>

        {/* Social Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2 px-4 bg-focus-850 hover:bg-focus-800 border border-zinc-800/80 rounded-xl text-xs font-medium text-zinc-200 transition-colors disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleGithubAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2 px-4 bg-focus-850 hover:bg-focus-800 border border-zinc-800/80 rounded-xl text-xs font-medium text-zinc-200 transition-colors disabled:opacity-60"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Footer Toggle */}
        <p className="text-center text-xs text-zinc-400 mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              clearAuthError();
              openAuthModal(isLogin ? 'signup' : 'login');
            }}
            className="text-orange-400 font-semibold hover:text-orange-300 transition-colors ml-1"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
