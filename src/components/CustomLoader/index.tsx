import React from 'react'
import { CircularProgress } from '@mui/material'

const CustomLoader = (): JSX.Element => {
  return <CircularProgress variant={'determinate'} size={20} />
}

export default CustomLoader
