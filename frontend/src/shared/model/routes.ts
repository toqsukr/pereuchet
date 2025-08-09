export type Path = 'HOME' | 'AUTH' | 'RECORD_DASHBOARD' | 'ADD_PRODUCT' | 'ADD_WORKER' | 'ADD_TREAT'

export const Routes: Record<Path, string> = {
  HOME: '/',
  AUTH: '/auth',
  ADD_PRODUCT: '/add-product',
  ADD_WORKER: '/add-worker',
  ADD_TREAT: '/add-treat',
  RECORD_DASHBOARD: '/record-dashboard',
} as const
