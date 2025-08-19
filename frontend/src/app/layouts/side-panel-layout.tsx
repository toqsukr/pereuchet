import ContentField from '@shared/uikit/content-field/content-field'
import { type FC, type PropsWithChildren, type ReactNode } from 'react'

const SidePanelLayout: FC<PropsWithChildren<{ SidePanel?: ReactNode }>> = ({
  children,
  SidePanel = <ContentField />,
}) => {
  return (
    <section
      style={{ gridTemplateColumns: '24rem 1fr' }}
      className='grid gap-6 max-w-[2500px] max-h-[856px] w-screen h-screen p-6 pb-14 overflow-y-auto'>
      {SidePanel}
      <div className='relative'>{children}</div>
    </section>
  )
}

export default SidePanelLayout
