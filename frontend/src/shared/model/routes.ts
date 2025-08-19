export const Routes = {
  HOME: '/',
  AUTH: '/auth',
  STAMPED_PRODUCT: '/stamped-product',
  ADD_STAMPED_PRODUCT: '/stamped-product/add',
  STAMPED_PRODUCT_DASHBOARD: '/stamped-product/dashboard',
  STAMPIST: '/stampist',
  ADD_STAMPIST: '/stampist/add',
  STAMPIST_DASHBOARD: '/stampist/dashboard',
  TREAD: '/tread',
  ADD_TREAD: '/tread/add',
  TREAD_DASHBOARD: '/tread/dashboard',
} as const

export type Path = keyof typeof Routes

export type RootPath<R = (typeof Routes)[Path]> = R extends `/${infer Root}/${string}`
  ? Root
  : never

export type SubPath<R extends RootPath, U = (typeof Routes)[Path]> = U extends `/${R}/${infer Sub}`
  ? Sub
  : never

const rootPathRegex = /^\/([^\/]+)\//

export const rootPathes = Array.from(
  new Set(
    Object.values(Routes)
      .filter(route => route.match(rootPathRegex) != null)
      .map(route => {
        return route.match(rootPathRegex)![0].slice(1, -1)
      })
  ).values()
) as RootPath[]

export function getSubRoutes<R extends RootPath>(root: R): SubPath<R>[] {
  const prefix = `/${root}/`
  return (Object.values(Routes) as string[])
    .filter(route => route.startsWith(prefix))
    .map(route => route.slice(prefix.length)) as SubPath<R>[]
}
