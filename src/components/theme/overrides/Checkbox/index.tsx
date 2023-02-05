import { Theme } from '@mui/material/styles'
const Checkbox = (theme: Theme) => {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main[300]
        }
      }
    }
  }
}
export default Checkbox
