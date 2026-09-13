import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LandingView from './components/landing/LandingView';
import CozyRoomView from './components/dashboard/CozyRoomView';
import WorkspaceGrid from './components/dashboard/WorkspaceGrid';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutView from './components/dashboard/AboutView';
import ProtectedRoute from './components/auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingView />
      },
      {
        path: 'room',
        element: (
          <ProtectedRoute>
            <CozyRoomView />
          </ProtectedRoute>
        )
      },
      {
        path: 'workspace',
        element: (
          <ProtectedRoute>
            <WorkspaceGrid />
          </ProtectedRoute>
        )
      },
      {
        path: 'leaderboard',
        element: (
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <AboutView />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
