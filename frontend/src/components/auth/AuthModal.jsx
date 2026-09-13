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
