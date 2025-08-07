export type Path = 'HOME' | 'AUTH' | 'RECORD_DASHBOARD' | 'ADD_WORKER' | 'ADD_PRODUCT'

export const Routes: Record<Path, string> = {
  HOME: '/',
  AUTH: '/auth',
  ADD_WORKER: '/add-worker',
  ADD_PRODUCT: '/add-product',
  RECORD_DASHBOARD: '/record-dashboard',
} as const
