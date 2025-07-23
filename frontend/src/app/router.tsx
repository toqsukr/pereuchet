import AuthPage from '@pages/auth'
import ControlBoardPage from '@pages/control-board'
import HomePage from '@pages/home'
import { Routes } from '@shared/model/routes'
import NavigationPanel from '@widgets/navigation-panel'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import AuthLoadingLayout from './auth-loading-layout'
import LoadingLayout from './loading-layout'
import { QueryErrorBoundary } from './query-error-boundary'

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: (
      <QueryErrorBoundary>
        <div className='w-full p-8'>
          <LoadingLayout>
            <Outlet />
          </LoadingLayout>
        </div>
      </QueryErrorBoundary>
    ),
    children: [
      {
        element: (
          <AuthLoadingLayout>
            <NavigationPanel />
            <Outlet />
          </AuthLoadingLayout>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: Routes.CONTROL_BOARD,
            element: <ControlBoardPage />,
          },
        ],
      },
      {
        path: Routes.AUTH,
        element: <AuthPage />,
      },
    ],
  },
])
