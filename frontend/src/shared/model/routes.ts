export type Path = 'HOME' | 'AUTH' | 'CONTROL_BOARD'

export const Routes: Record<Path, string> = {
  HOME: '/',
  AUTH: '/auth',
  CONTROL_BOARD: '/control-board',
} as const
