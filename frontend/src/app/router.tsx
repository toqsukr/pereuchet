import AuthPage from '@pages/auth'
import ControlBoardPage from '@pages/control-board'
import HomePage from '@pages/home'
import { Routes } from '@shared/model/routes'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import AuthLayout from './auth-layout'

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: (
      <div className='w-full p-8'>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: Routes.CONTROL_BOARD,
        element: (
          <AuthLayout>
            <ControlBoardPage />
          </AuthLayout>
        ),
      },
      {
        path: Routes.AUTH,
        element: <AuthPage />,
      },
    ],
  },
])
