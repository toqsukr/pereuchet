import { useVirtual } from './store'

export const MAX_ROWS = 15

export const useSlicedData = <T extends Array<unknown>>(data: T[]) => {
  const { page } = useVirtual()

  const sliced = data.slice(page * MAX_ROWS, page * MAX_ROWS + MAX_ROWS)

  const add = new Array(MAX_ROWS - sliced.length).fill(
    new Array(data[0]?.length).fill({
      value: '',
      readOnly: true,
    })
  )

  const res = sliced.length < MAX_ROWS ? [...sliced, ...add] : sliced

  return res
}
