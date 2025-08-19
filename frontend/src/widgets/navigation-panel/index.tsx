import { rootPathes, type RootPath } from '@shared/model/routes'
import NavWithIcon from '@shared/uikit/nav-with-icon/nav-with-icon'
import cn from 'classnames'
import type { ReactNode } from 'react'
import { FiEdit } from 'react-icons/fi'
import { GiSlippers } from 'react-icons/gi'
import { IoPersonAdd } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { useNavigationMenu } from './model/store'
import css from './style.module.scss'
import { NavigationLink } from './ui/navigation-link'

const defineRouteIcon: Record<RootPath, ReactNode> = {
  'stamped-product': <FiEdit className='w-6 h-6 scale-110' />,
  tread: <GiSlippers className='w-6 h-6' />,
  stampist: <IoPersonAdd className='w-6 h-6' />,
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
        {rootPathes.map(path => {
          return (
            <li key={path}>
              <NavigationLink className='flex justify-center items-center h-full' to={path}>
                <NavWithIcon active={pathname.includes(path)} Icon={defineRouteIcon[path]} />
              </NavigationLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavigationPanel
