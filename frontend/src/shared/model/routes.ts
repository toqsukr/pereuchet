export type Path =
  | 'HOME'
  | 'AUTH'
  | 'STAMPED_PRODUCT_DASHBOARD'
  | 'ADD_STAMPED_PRODUCT'
  | 'ADD_STAMPIST'
  | 'ADD_TREAT'

export const Routes: Record<Path, string> = {
  HOME: '/',
  AUTH: '/auth',
  ADD_STAMPED_PRODUCT: '/add-stamped-product',
  ADD_STAMPIST: '/add-stampist',
  ADD_TREAT: '/add-treat',
  STAMPED_PRODUCT_DASHBOARD: '/stamped-product-dashboard',
} as const
