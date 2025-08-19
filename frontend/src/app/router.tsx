import AddStampedProductPage from '@pages/add-stamped-product'
import AddStampistPage from '@pages/add-stampist'
import AddTreadPage from '@pages/add-tread'
import AuthPage from '@pages/auth'
import StampedProductDashboard from '@pages/stamped-product-dashboard'
import StampistDashboardPage from '@pages/stampist-dashboard'
import TreadDashboardPage from '@pages/tread-dashboard'
import { Routes } from '@shared/model/routes'
import NavigationPanel from '@widgets/navigation-panel'
import SubrouteNavigation from '@widgets/subroute-navigation'
import { BsTable } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa6'
import { createBrowserRouter, Navigate, Outlet, redirect } from 'react-router-dom'
import AuthLoadingLayout from './layouts/auth-loading-layout'
import LoadingLayout from './layouts/loading-layout'
import { QueryErrorLayout } from './layouts/query-error-layout'

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    loader: () => redirect(Routes.ADD_STAMPED_PRODUCT),
  },
  {
    element: (
      <QueryErrorLayout>
        <LoadingLayout>
          <Outlet />
        </LoadingLayout>
      </QueryErrorLayout>
    ),
    children: [
      {
        element: (
          <AuthLoadingLayout>
            <Outlet />
            <NavigationPanel />
          </AuthLoadingLayout>
        ),
        children: [
          {
            path: Routes.STAMPED_PRODUCT,
            element: (
              <SubrouteNavigation
                rootPath='stamped-product'
                title={'Инфо о штамповке'}
                subrouteOptions={{
                  add: { name: 'Добавить штамповку', Icon: <FaPlus className='w-5 h-5' /> },
                  dashboard: {
                    name: 'Управление штамповками',
                    Icon: <BsTable className='w-5 h-5' />,
                  },
                }}>
                <Outlet />
              </SubrouteNavigation>
            ),
            children: [
              {
                index: true,
                element: <Navigate to={Routes.ADD_STAMPED_PRODUCT} />,
              },
              {
                path: Routes.STAMPED_PRODUCT_DASHBOARD,
                element: <StampedProductDashboard />,
              },
              {
                path: Routes.ADD_STAMPED_PRODUCT,
                element: <AddStampedProductPage />,
              },
            ],
          },
          {
            path: Routes.STAMPIST,
            element: (
              <SubrouteNavigation
                rootPath='stampist'
                title={'Штамповщики'}
                subrouteOptions={{
                  add: { name: 'Добавить штамповщика', Icon: <FaPlus className='w-5 h-5' /> },
                  dashboard: {
                    name: 'Управление штамповщиками',
                    Icon: <BsTable className='w-5 h-5' />,
                  },
                }}>
                <Outlet />
              </SubrouteNavigation>
            ),
            children: [
              {
                index: true,
                element: <Navigate to={Routes.ADD_STAMPIST} />,
              },
              {
                path: Routes.STAMPIST_DASHBOARD,
                element: <StampistDashboardPage />,
              },
              {
                path: Routes.ADD_STAMPIST,
                element: <AddStampistPage />,
              },
            ],
          },
          {
            path: Routes.TREAD,
            element: (
              <SubrouteNavigation
                rootPath='tread'
                title={'Подошвы'}
                subrouteOptions={{
                  add: { name: 'Добавить подошву', Icon: <FaPlus className='w-5 h-5' /> },
                  dashboard: {
                    name: 'Управление подошвами',
                    Icon: <BsTable className='w-5 h-5' />,
                  },
                }}>
                <Outlet />
              </SubrouteNavigation>
            ),
            children: [
              {
                index: true,
                element: <Navigate to={Routes.ADD_TREAD} />,
              },
              {
                path: Routes.TREAD_DASHBOARD,
                element: <TreadDashboardPage />,
              },
              {
                path: Routes.ADD_TREAD,
                element: <AddTreadPage />,
              },
            ],
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
