export type Path = 'HOME' | 'AUTH' | 'CONTROL_BOARD' | 'ADD_WORKER' | 'ADD_PRODUCT'

export const Routes: Record<Path, string> = {
  HOME: '/',
  AUTH: '/auth',
  ADD_WORKER: '/add-worker',
  ADD_PRODUCT: '/add-product',
  CONTROL_BOARD: '/control-board',
} as const
