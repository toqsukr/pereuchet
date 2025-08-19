import { getSubRoutes, type RootPath, type SubPath } from '@shared/model/routes'
import { type ContentFieldProps } from '@shared/uikit/content-field/content-field'
import cn from 'classnames'
import type { PropsWithChildren, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import css from './style.module.scss'

function SubrouteNavigation<R extends RootPath>({
  children,
  ...props
}: PropsWithChildren<SidePanelProps<R>>) {
  return (
    <section className={css.subroute_navigation}>
      <SidePanel {...props} />
      <div className='relative'>{children}</div>
    </section>
  )
}

type SidePanelProps<R extends RootPath> = ContentFieldProps & {
  rootPath: R
  subrouteOptions: Record<
    SubPath<R>,
    {
      name: string
      Icon?: ReactNode
    }
  >
}

const SidePanel = <R extends RootPath>({
  rootPath,
  subrouteOptions,
  ...props
}: SidePanelProps<R>) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <aside className={css.side_panel}>
      <h1 className='text-xl truncate'>{props.title}</h1>
      <nav>
        <ul className='flex flex-col gap-4'>
          {getSubRoutes(rootPath).map(subroute => (
            <li
              key={subroute}
              onClick={() => navigate(subroute)}
              className={cn(css.link_button, { [css.inactive]: !pathname.includes(subroute) })}>
              <div className='flex shrink-0'>{subrouteOptions[subroute].Icon}</div>
              <span className='truncate'>{subrouteOptions[subroute].name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SubrouteNavigation
