import MUICheckbox, { type CheckboxProps } from '@mui/material/Checkbox'
import type { SxProps } from '@mui/material/styles'
import type { FC } from 'react'

const style: SxProps = {
  '.css-1umw9bq-MuiSvgIcon-root': {
    color: 'white',
  },
}

const Checkbox: FC<CheckboxProps> = props => {
  return <MUICheckbox {...props} sx={style} />
}

export default Checkbox
