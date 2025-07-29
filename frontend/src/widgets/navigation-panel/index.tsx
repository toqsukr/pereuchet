import { RouteLinkList } from '@features/navigation-link'
import ContentField from '@shared/uikit/content-field'

const NavigationPanel = ({}) => {
  return (
    <div className='relative z-10 pb-2 overflow-auto'>
      <div className='w-max mx-auto'>
        <ContentField>
          <RouteLinkList />
        </ContentField>
      </div>
    </div>
  )
}

export default NavigationPanel
