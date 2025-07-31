import AddProductPage from '@pages/add-product'
import AddWorkerPage from '@pages/add-worker'
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
        <div className='w-full'>
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
            <section className='fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-6 max-w-[2560px] max-h-[856px] w-screen h-screen p-6 overflow-y-auto'>
              <div className='relative h-full w-full'>
                <Outlet />
              </div>
              <div className='w-full mx-auto'>
                <NavigationPanel />
              </div>
            </section>
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
          {
            path: Routes.ADD_WORKER,
            element: <AddWorkerPage />,
          },
          {
            path: Routes.ADD_PRODUCT,
            element: <AddProductPage />,
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
