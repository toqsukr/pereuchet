import cn from 'classnames'
import {
  type ChangeEvent,
  type FormEvent,
  forwardRef,
  type MouseEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { RxCross2 } from 'react-icons/rx'
import { IconButton } from './icon-button'
import Input, { type InputProps } from './input'

const ClearableInput = forwardRef<HTMLInputElement, InputProps>(({ onChange, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFieldEmpty, setFieldEmpty] = useState(!!!props.value)

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget) {
      event.currentTarget.value = ''
      setFieldEmpty(true)
    }

    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as ChangeEvent<HTMLInputElement>

    onChange?.(syntheticEvent)
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    onChange?.(e)
    setFieldEmpty(!!!e.currentTarget.value)
  }

  return (
    <Input
      {...props}
      ref={inputRef}
      onChange={handleChange}
      Button={
        <IconButton
          onClick={handleClear}
          disabled={props.disabled}
          style={{ transformOrigin: 'right' }}
          Icon={<RxCross2 className='w-7 h-7' />}
          className={cn('scale-x-0', {
            ['scale-x-100!']: !isFieldEmpty,
          })}
        />
      }
    />
  )
})

export default ClearableInput
