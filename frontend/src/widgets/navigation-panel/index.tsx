import { LogoutButton } from '@features/logout'
import { RouteLinkList } from '@features/navigation-link'
import ContentField from '@shared/uikit/content-field'

const NavigationPanel = ({}) => {
  return (
    <div className='relative z-10 pb-2 overflow-auto'>
      <div className='w-max mx-auto'>
        <ContentField>
          <ul className='flex h-full gap-6 items-center'>
            <RouteLinkList />
            <li>
              <LogoutButton />
            </li>
          </ul>
        </ContentField>
      </div>
    </div>
  )
}

export default NavigationPanel
