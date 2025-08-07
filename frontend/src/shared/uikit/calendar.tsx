import { type SxProps } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import type { FC } from 'react'

const styles: SxProps = {
  width: '100%',

  '.MuiPickersSectionList-root.MuiPickersInputBase-sectionsContainer': {
    width: '100%',
  },
  '.MuiPickersInputBase-root.MuiPickersOutlinedInput-root.MuiPickersInputBase-colorPrimary.MuiPickersInputBase-adornedEnd':
    {
      height: '2.8rem',
      width: '100%',
      color: 'white !important',
      border: 0,
      transition: 'box-shadow .2s',
      WebkitBoxShadow: '0 0 0 2px rgba(255, 255, 255, .5) !important',
      boxShadow: '0 0 0 2px rgba(255, 255, 255, .5) !important',
      ':hover': {
        WebkitBoxShadow: '0 0 0 2px rgba(255, 255, 255, .5) !important',
        boxShadow: '0 0 0 2px white !important',
      },
    },
  '.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd': {
    color: 'white',
  },
  '.MuiPickersOutlinedInput-notchedOutline': {
    border: '0 !important',
    width: '100%',
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
