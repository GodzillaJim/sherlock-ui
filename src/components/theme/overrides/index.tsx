import { Theme } from '@mui/material'
import { merge } from 'lodash'
import Badge from './Badge'
import Button from './Button'
import CardContent from './CardContent'
import Checkbox from './Checkbox'
import Chip from './Chip'

const ComponentsOverride = (theme: Theme) => {
  return merge(
    Badge(theme),
    Button(theme),
    CardContent(),
    Checkbox(theme),
    Chip(theme)
  )
}
export default ComponentsOverride
