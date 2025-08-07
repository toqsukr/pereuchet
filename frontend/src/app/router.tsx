import AddProductPage from '@pages/add-product'
import AddWorkerPage from '@pages/add-worker'
import AuthPage from '@pages/auth'
import HomePage from '@pages/home'
import RecordDashboard from '@pages/record-dashboard'
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
            <section className='fixed top-1/2 left-1/2 -translate-1/2 max-w-[2500px] max-h-[856px] w-screen h-screen pt-6 pb-12 overflow-y-auto'>
              <Outlet />
            </section>
            <NavigationPanel />
          </AuthLoadingLayout>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: Routes.RECORD_DASHBOARD,
            element: <RecordDashboard />,
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
