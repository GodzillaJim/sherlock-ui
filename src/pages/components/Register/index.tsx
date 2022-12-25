import React from 'react'
import { Grid, useTheme, TextField, Typography } from '@mui/material'
import styled from 'styled-components'

const Content = styled(Grid)`
  height: 100vh;
`
const Register = (): JSX.Element => {
  const theme = useTheme()
  return <Grid container direction={'row'} columns={12} >
    <Grid xs={0} sm={0} md={6} item>
      <Content bgcolor={theme.palette.primary.main}>
        1
      </Content>
    </Grid>
    <Grid xs={12} sm={12} md={6} item sx={{ pt: 4 }}>
      <Grid container component={'form'} direction={'column'} padding={4} spacing={4} justifyContent={'center'}>
        <Grid item>
          <Typography variant={'h3'} color={theme.palette.primary.main}>SIGN UP</Typography>
        </Grid>
        <Grid item>
          <Grid columnSpacing={2} container columns={12}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField fullWidth={true} name={'firstName'} label={'First Name'}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField  fullWidth={true} name={'lastName'} label={'Last Name'}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item >
          <TextField fullWidth={false} sx={{ width: '85%' }} name={'email'} label={'Email'}/>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}

export default Register
