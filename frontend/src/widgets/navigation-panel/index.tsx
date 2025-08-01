import { RouteLinkList } from '@features/navigation-link'

const NavigationPanel = ({}) => {
  return (
    <div className='relative z-10 pb-2 overflow-auto'>
      <div className='w-max mx-auto'>
        <RouteLinkList />
      </div>
    </div>
  )
}

export default NavigationPanel
