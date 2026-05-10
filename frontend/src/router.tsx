import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoginPage } from './features/auth/pages/LoginPage'
import { ChallengesPage } from './features/challenges/pages/ChallengesPage'
import { ChallengeDetailPage } from './features/challenges/pages/ChallengeDetailPage'
import { AtaqueDefensaPage } from './features/challenges/pages/AtaqueDefensaPage'
import { RankingPage } from './features/ranking/pages/RankingPage'
import { InfoPage } from './features/info/pages/InfoPage'
import { AdminPage } from './features/admin/pages/AdminPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'challenges', element: <ChallengesPage /> },
      { path: 'challenges/ataque-defensa', element: <AtaqueDefensaPage /> },
      { path: 'challenges/:id', element: <ChallengeDetailPage /> },
      { path: 'ranking',    element: <RankingPage /> },
      { path: 'info',       element: <InfoPage /> },
      { path: 'admin',      element: <AdminPage /> },
    ],
  },
])
