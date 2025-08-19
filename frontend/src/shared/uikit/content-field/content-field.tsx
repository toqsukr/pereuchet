import type { FC, PropsWithChildren, ReactNode } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import css from './content-field.module.scss'

type HeaderWithIconProps = { icon: ReactNode; text: string }

const HeaderWithIcon: FC<HeaderWithIconProps> = ({ icon, text }) => {
  return (
    <div className='w-full flex justify-between items-center'>
      <span className='truncate'>{text}</span>
      <span className='ml-4'>{icon}</span>
    </div>
  )
}

export type ContentFieldProps = { title?: ReactNode; onBack?: () => void }

const ContentField = ({ children, title, onBack }: PropsWithChildren<ContentFieldProps>) => {
  return (
    <section className={css.content_field}>
      {title && (
        <header className={css.header}>
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
