// Support VITE_API_URL with or without trailing slash or /api suffix
const rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
const BASE_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

/**
 * FocusNest API Request Wrapper
 * Injects Authorization header and parses standard API response payload
 */
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('focusnest_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
