import React from 'react'
import { Grid, useTheme } from '@mui/material'
import styled from 'styled-components'

const Content = styled(Grid)`
  height: 100vh;
`
const Register = (): JSX.Element => {
  const theme = useTheme()
  return <Grid container direction={'row'} columns={12}>
    <Grid xs={0} sm={0} md={6} item>
      <Content bgcolor={theme.palette.primary.main}>
        1
      </Content>
    </Grid>
    <Grid xs={12} sm={12} md={6} item>2</Grid>
  </Grid>
}

export default Register
