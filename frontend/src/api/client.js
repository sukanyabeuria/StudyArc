import { auth } from '../config/firebase';

const API_PORT = 5000;
const host =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname
    : 'localhost';

const rawApiUrl = import.meta.env.VITE_API_URL;
let resolvedBaseUrl;
if (host === 'localhost' || host === '127.0.0.1') {
  resolvedBaseUrl = `http://${host}:${API_PORT}/api`;
} else if (rawApiUrl && rawApiUrl.trim()) {
  const trimmed = rawApiUrl.trim().replace(/\/+$/, '');
  resolvedBaseUrl = trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
} else {
  // Production default Render backend endpoint for Vercel deployment
  resolvedBaseUrl = 'https://studyarc-backend.onrender.com/api';
}
const BASE_URL = resolvedBaseUrl;

/**
 * StudyArc API Request Wrapper
 * Injects Authorization header and parses standard API response payload
 */
export async function apiRequest(endpoint, options = {}) {
  let token = localStorage.getItem('studyarc_token') || localStorage.getItem('focusnest_token');

  // If user is actively authenticated with Firebase, ensure token is fresh
  if (auth && auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
      localStorage.setItem('studyarc_token', token);
    } catch (err) {
      console.warn('[API Client] Token refresh warning:', err.message);
    }
  }

  if (!token) {
    token = 'dev_token_debasis';
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: 'Failed to parse server response'
  }));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

// User Profile Endpoints
export const getMyProfile = () => apiRequest('/users/me');
export const updateMyProfile = (updates) =>
  apiRequest('/users/me', {
    method: 'PUT',
    body: JSON.stringify(updates)
  });

// Todo Endpoints
export const fetchTodos = () => apiRequest('/todos');
export const addTodo = (todoData) =>
  apiRequest('/todos', {
    method: 'POST',
    body: JSON.stringify(todoData)
  });
export const updateTodo = (id, updates) =>
  apiRequest(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
export const deleteTodo = (id) =>
  apiRequest(`/todos/${id}`, {
    method: 'DELETE'
  });

// Study Session & Gamification Endpoints
export const fetchSessions = (page = 1, limit = 20) =>
  apiRequest(`/sessions?page=${page}&limit=${limit}`);
export const logSession = (sessionData) =>
  apiRequest('/sessions', {
    method: 'POST',
    body: JSON.stringify(sessionData)
  });

// Leaderboard Endpoints
export const fetchLeaderboard = (limit = 10) =>
  apiRequest(`/leaderboard?limit=${limit}`);

// Gemini AI Assistant Endpoints
export const askGeminiAssistant = (question) =>
  apiRequest('/ai/ask', {
    method: 'POST',
    body: JSON.stringify({ question })
  });
