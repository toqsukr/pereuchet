import cn from 'classnames'
import { type FC, type ReactNode } from 'react'
import { IconButton, type IconButtonProps } from '../icon-button'
import css from './flip-icon-button.module.scss'

type FlipIconButtonProp = {
  activeIcon: number
  Icons: [{ element: ReactNode; action?: () => void }, { element: ReactNode; action?: () => void }]
  buttonProps?: Omit<IconButtonProps, 'Icon'>
}

const FlipIconButton: FC<FlipIconButtonProp> = props => {
  const { Icons, activeIcon, buttonProps } = props

  return (
    <IconButton
      {...buttonProps}
      onClick={Icons[activeIcon].action}
      Icon={
        <div className='relative'>
          <div
            className={cn(css.flip_button, {
              [css.active]: activeIcon === 0,
              [css.hidden]: activeIcon !== 0,
            })}>
            {Icons[0].element}
          </div>
          <div
            className={cn(css.flip_button, {
              [css.active]: activeIcon === 1,
              [css.hidden]: activeIcon !== 1,
            })}>
            {Icons[1].element}
          </div>
        </div>
      }
    />
  )
}

export default FlipIconButton
