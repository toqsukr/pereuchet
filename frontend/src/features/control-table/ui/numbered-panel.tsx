import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react'
import { useVirtual } from '../model/store'
import { MAX_ROWS } from '../model/use-sliced-data'

const NumberedButton: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    value: number
    active?: boolean
  }
> = ({ value, active, ...props }) => {
  return (
    <button
      {...props}
      disabled={active}
      style={{
        cursor: !active ? 'pointer' : 'auto',
        background: active
          ? 'linear-gradient(90deg, #0198ea 0%, #14ccfa 100%)'
          : 'var(--background-color)',
      }}
      className='p-4 rounded-xl h-[2.8rem] w-[2.8rem]'>
      {value}
    </button>
  )
}

export const NumberedPanel = (props: { data: unknown[] }) => {
  const { page, updatePage } = useVirtual()

  const values = new Array(Math.ceil(props.data.length / MAX_ROWS)).fill(0).map((_, i) => i)

  return (
    <nav className='flex flex-col flex-[1 0 0] items-center gap-2 overflow-y-auto bg-[var(--content-field-color)] p-4 rounded-2xl'>
      {values.map(value => (
        <NumberedButton
          key={value}
          active={page === value}
          onClick={() => updatePage(value)}
          value={value + 1}
        />
      ))}
      <span className='w-[2.8rem]' />
    </nav>
  )
}
