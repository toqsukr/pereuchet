import { LogoutButton } from '@features/logout'
import { RouteLinkList } from '@features/navigation-link'
import ContentField from '@shared/uikit/content-field'
import cn from 'classnames'
import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react'

const NavigationPanel: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <nav {...props} className={cn('fixed top-4 left-1/2 -translate-x-1/2 w-max', className)}>
      <ContentField>
        <ul
          style={{ gridTemplateColumns: 'repeat(auto-fit, 250px)' }}
          className='grid max-w-[1440px] w-full items-center'>
          <RouteLinkList />
          <li className='h-full p-2'>
            <LogoutButton />
          </li>
        </ul>
      </ContentField>
    </nav>
  )
}

export default NavigationPanel
