import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import App from './App'
import { LoginPage } from './features/auth/pages/LoginPage'
import { ChallengesPage } from './features/challenges/pages/ChallengesPage'
import { RankingPage } from './features/ranking/pages/RankingPage'
import { InfoPage } from './features/info/pages/InfoPage'
import { AdminPage } from './features/admin/pages/AdminPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      { path: 'ranking',    element: <RankingPage /> },
      { path: 'info',       element: <InfoPage /> },
      { path: 'admin',      element: <AdminPage /> },
    ],
  },
])
