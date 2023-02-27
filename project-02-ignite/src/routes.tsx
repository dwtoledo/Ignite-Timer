import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from './layouts/default_layout'
import { History } from './pages/History'
import { Home } from './pages/Home'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
])
