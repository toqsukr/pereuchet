import { Routes, type Path } from '@shared/model/routes'
import NavWithIcon from '@shared/uikit/nav-with-icon/nav-with-icon'
import cn from 'classnames'
import type { ReactNode } from 'react'
import { BsTable } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { GiSlippers } from 'react-icons/gi'
import { IoPersonAdd } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { useNavigationMenu } from './model/store'
import css from './style.module.scss'
import { NavigationLink } from './ui/navigation-link'

const names: Record<Exclude<Path, 'AUTH' | 'HOME'>, ReactNode> = {
  ADD_STAMPED_PRODUCT: <FiEdit className='w-6 h-6 scale-110' />,
  STAMPED_PRODUCT_DASHBOARD: <BsTable className='w-6 h-6' />,
  ADD_TREAT: <GiSlippers className='w-6 h-6' />,
  ADD_STAMPIST: <IoPersonAdd className='w-6 h-6' />,
}

const NavigationPanel = () => {
  const { pathname } = useLocation()
  const { isShow, toggleShow } = useNavigationMenu()

  return (
    <div className={cn(css.navigation, { [css.shown]: isShow })}>
      <button onClick={toggleShow} className={css.toggle_container}>
        <img src='/arrow.svg' className={cn(css.toggle_icon, { [css.active]: isShow })} />
      </button>
      <ul className={css.route_list}>
        {Object.keys(Routes)
          .filter(path => path !== 'AUTH' && path !== 'HOME')
          .map(path => {
            const routePath = path as Exclude<Path, 'AUTH' | 'HOME'>
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
    </div>
  )
}

export default NavigationPanel
