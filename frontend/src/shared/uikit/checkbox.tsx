import MUICheckbox, { type CheckboxProps } from '@mui/material/Checkbox'
import type { SxProps } from '@mui/material/styles'
import type { FC } from 'react'

const style: SxProps = {
  color: 'white !important',
  padding: '0',
}

const Checkbox: FC<CheckboxProps> = props => {
  return <MUICheckbox {...props} sx={style} />
}

export default Checkbox
