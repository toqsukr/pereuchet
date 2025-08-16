import AddProductPage from '@pages/add-stamped-product'
import AddStampistPage from '@pages/add-stampist'
import AddTreatPage from '@pages/add-tread'
import AuthPage from '@pages/auth'
import StampedProductDashboard from '@pages/stamped-product-dashboard'
import { Routes } from '@shared/model/routes'
import NavigationPanel from '@widgets/navigation-panel'
import { createBrowserRouter, Outlet, redirect } from 'react-router-dom'
import AuthLoadingLayout from './auth-loading-layout'
import LoadingLayout from './loading-layout'
import { QueryErrorBoundary } from './query-error-boundary'

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    loader: () => redirect(Routes.ADD_STAMPED_PRODUCT),
  },
  {
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
            path: Routes.ADD_STAMPED_PRODUCT,
            element: <AddProductPage />,
          },
          {
            path: Routes.STAMPED_PRODUCT_DASHBOARD,
            element: <StampedProductDashboard />,
          },
          {
            path: Routes.ADD_STAMPIST,
            element: <AddStampistPage />,
          },
          {
            path: Routes.ADD_TREAT,
            element: <AddTreatPage />,
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
