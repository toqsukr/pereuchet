import cn from 'classnames'
import { forwardRef, type ReactNode } from 'react'
import { IconButton } from '../icon-button'
import Input, { type InputProps } from '../input'
import css from './flip-icon-input.module.scss'

type FlipIconInputProp = {
  activeIcon: number
  isLoading?: boolean
  Icons: [{ element: ReactNode; action: () => void }, { element: ReactNode; action: () => void }]
} & InputProps

const FlipIconInput = forwardRef<HTMLInputElement, FlipIconInputProp>((props, ref) => {
  const { Icons, activeIcon, isLoading, ...inputProps } = props

  return (
    <Input
      {...inputProps}
      ref={ref}
      Button={
        <IconButton
          isLoading={isLoading}
          disabled={inputProps.disabled}
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
      }
    />
  )
})

export default FlipIconInput
