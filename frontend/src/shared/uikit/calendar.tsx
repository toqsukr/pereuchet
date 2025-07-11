import { type SxProps } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import type { FC } from 'react'

const styles: SxProps = {
  '.css-vycme6-MuiPickersInputBase-root-MuiPickersOutlinedInput-root': {
    height: '2.8rem',
    width: '10.5rem',
    color: 'white',
    border: 0,
    transition: 'box-shadow .2s',
    WebkitBoxShadow: '0 0 0 2px rgba(255, 255, 255, .5)',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, .5)',
    ':hover': {
      WebkitBoxShadow: '0 0 0 2px rgba(255, 255, 255, .5)',
      boxShadow: '0 0 0 2px white',
    },
  },
  '.css-1ysp02-MuiButtonBase-root-MuiIconButton-root': {
    color: 'white',
  },
  '.css-lqwr9g-MuiPickersOutlinedInput-notchedOutline': {
    border: '0 !important',
  },
}
type CalendarProp = {
  filter: Date | null
  updateFilter: (date: Date | null) => void
  minDate?: Dayjs
  maxDate?: Dayjs
}

const Calendar: FC<CalendarProp> = ({ filter, updateFilter, maxDate = dayjs(), minDate }) => {
  const handleChange = (date: Dayjs | null) => {
    updateFilter(date ? date.toDate() : null)
  }

  return (
    <DatePicker
      sx={styles}
      maxDate={maxDate}
      minDate={minDate}
      format='DD/MM/YYYY'
      onChange={handleChange}
      value={filter ? dayjs(filter) : null}
      slotProps={{
        textField: {
          inputProps: {
            readOnly: true,
          },
        },
      }}
    />
  )
}

export default Calendar
