import { Routes, type Path } from '@shared/model/routes'
import { NavigationLink } from './navigation-link'

const names: Record<Exclude<Path, 'AUTH'>, string> = {
  HOME: 'Добавление продукта',
  CONTROL_BOARD: 'Панель управления',
}

export const RouteLinkList = () => {
  return (
    <>
      {Object.keys(Routes)
        .filter(path => path !== 'AUTH')
        .map(path => {
          const routePath = path as Exclude<Path, 'AUTH'>
          return (
            <li key={routePath} className='h-full p-2'>
              <NavigationLink
                className='flex justify-center items-center h-full'
                to={Routes[routePath]}>
                <span>{names[routePath]}</span>
              </NavigationLink>
            </li>
          )
        })}
    </>
  )
}
