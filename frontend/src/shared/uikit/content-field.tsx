import type { FC, PropsWithChildren, ReactNode } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

type HeaderWithIconProps = { icon: ReactNode; text: string }

const HeaderWithIcon: FC<HeaderWithIconProps> = ({ icon, text }) => {
  return (
    <div className='w-full flex justify-between items-center'>
      <span className='truncate'>{text}</span>
      <span className='ml-4'>{icon}</span>
    </div>
  )
}

type ContentFieldProps = { title?: ReactNode; onBack?: () => void }

const ContentField = ({ children, title, onBack }: PropsWithChildren<ContentFieldProps>) => {
  return (
    <section className='h-max text-white bg-[var(--content-field-color)] p-6 rounded-[1rem]'>
      {title && (
        <header style={{ lineHeight: '2rem' }} className='text-[1.3rem] font-bold mb-[1.5rem]'>
          <div className='flex items-center gap-5'>
            {onBack && <IoArrowBackOutline className='cursor-pointer' onClick={onBack} />}
            <span className='flex-1 truncate'>{title}</span>
          </div>
        </header>
      )}
      {children}
    </section>
  )
}

ContentField.HeaderWithIcon = HeaderWithIcon

export default ContentField
