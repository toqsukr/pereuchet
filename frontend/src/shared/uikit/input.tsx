import cn from 'classnames'
import { forwardRef, type HTMLProps, type ReactNode } from 'react'

export type InputProps = {
  Button?: ReactNode
} & HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ Button, className, ...props }, ref) => {
  return (
    <div className='relative rounded-[.625rem]'>
      <input
        {...props}
        ref={ref}
        className={cn(
          'w-full h-[2.8rem] p-[0.8rem] font-bold rounded-[0.625rem] text-[var(--text-primary-color)] bg-[var(--background-color)] placeholder:text-[var(--text-third-color)] file:hidden disabled:opacity-50 truncate',
          className,
          {
            ['pr-[3.6rem]']: !!Button,
          }
        )}
      />
      <div className='absolute top-0 right-0 w-[2.8rem] [&>button]:rounded-[0.5625rem]! [&>button]:rounded-l-none! [&>button]:px-2.5'>
        {Button}
      </div>
    </div>
  )
})

export default Input
