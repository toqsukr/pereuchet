import { Routes, type Path } from '@shared/model/routes'
import NavWithIcon from '@shared/uikit/nav-with-icon/nav-with-icon'
import type { ReactNode } from 'react'
import { BsTable } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GiSlippers } from 'react-icons/gi'
import { IoPersonAdd } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { NavigationLink } from './navigation-link'

const names: Record<Exclude<Path, 'AUTH'>, ReactNode> = {
  HOME: <FiEdit className='w-6 h-6 scale-110' />,
  CONTROL_BOARD: <BsTable className='w-6 h-6' />,
  ADD_PRODUCT: <GiSlippers className='w-6 h-6' />,
  ADD_WORKER: <IoPersonAdd className='w-6 h-6' />,
}

export const RouteLinkList = () => {
  const { pathname } = useLocation()
  return (
    <ul className='flex h-full gap-6 p-6 rounded-3xl bg-[var(--content-field-color)] items-center'>
      {Object.keys(Routes)
        .filter(path => path !== 'AUTH')
        .map(path => {
          const routePath = path as Exclude<Path, 'AUTH'>
          return (
            <li key={routePath}>
              <NavigationLink
                className='flex justify-center items-center h-full'
                to={Routes[routePath]}>
                <NavWithIcon active={pathname === Routes[routePath]} Icon={names[routePath]} />
              </NavigationLink>
            </li>
          )
        })}
    </ul>
  )
}
