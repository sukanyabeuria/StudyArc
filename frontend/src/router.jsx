import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LandingView from './components/landing/LandingView';
import CozyRoomView from './components/dashboard/CozyRoomView';
import WorkspaceGrid from './components/dashboard/WorkspaceGrid';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutView from './components/dashboard/AboutView';

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
        element: <CozyRoomView />
      },
      {
        path: 'workspace',
        element: <WorkspaceGrid />
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />
      },
      {
        path: 'about',
        element: <AboutView />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
