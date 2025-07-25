import { Routes, type Path } from '@shared/model/routes'
import { IconButton } from '@shared/uikit/icon-button'
import type { ReactNode } from 'react'
import { BsTable } from 'react-icons/bs'
import { GiSlippers } from 'react-icons/gi'
import { IoPersonAdd } from 'react-icons/io5'
import { TbEdit } from 'react-icons/tb'
import { NavigationLink } from './navigation-link'

const names: Record<Exclude<Path, 'AUTH'>, ReactNode> = {
  HOME: <TbEdit className='w-6 h-6 scale-125' />,
  CONTROL_BOARD: <BsTable className='w-6 h-6' />,
  ADD_PRODUCT: <GiSlippers className='w-6 h-6' />,
  ADD_WORKER: <IoPersonAdd className='w-6 h-6' />,
}

export const RouteLinkList = () => {
  return (
    <>
      {Object.keys(Routes)
        .filter(path => path !== 'AUTH')
        .map(path => {
          const routePath = path as Exclude<Path, 'AUTH'>
          return (
            <li key={routePath}>
              <NavigationLink
                className='flex justify-center items-center h-full'
                to={Routes[routePath]}>
                <IconButton Icon={names[routePath]} />
              </NavigationLink>
            </li>
          )
        })}
    </>
  )
}
