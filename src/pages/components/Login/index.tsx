import React from 'react'
import {
  Alert,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import { string, object } from 'yup'
import CustomButton from './CustomButton'
import styled from 'styled-components'
import {
  AuthResponse,
  LoginParams,
  useSignInLazyQuery
} from '../../../generated/graphql'
import { AuthContext } from '../../../Context/AuthManager'
import { useLocation, useNavigate } from 'react-router-dom'
import { AUTH_DETAILS } from '../../../config/Constants'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import CustomLoader from '../../../components/CustomLoader'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  text-align: center;
  margin-top: 40%;
`
const Login = (): JSX.Element => {
  const [login, { loading, data }] = useSignInLazyQuery()
  const [err, setError] = React.useState<string>('')
  const authContext = React.useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const handleInputStart = (): void => {
    setError('')
  }
  const handleSign = async (payload: LoginParams): Promise<void> => {
    handleInputStart()
    try {
      const result = await login({ variables: { payload } })
      console.log('Data Result: ', result)
      if (result.data !== undefined) {
        authContext?.setAuthDetails(data?.signIn as AuthResponse)
        localStorage.setItem(AUTH_DETAILS, JSON.stringify(data?.signIn))
        const searchParams = Object.fromEntries(
          new URLSearchParams(location.search)
        )
        if (searchParams.redirect !== null && searchParams.redirect !== '/') { return navigate(searchParams.redirect) }
        return navigate('/app')
      }

      if (result.error != null) {
        return setError(result.error.message)
      }
    } catch (e: any) {
      setError(e.message as string)
    }
  }

  const validationSchema = object().shape({
    email: string()
      .email('Please provide a valid email')
      .required('Please provide an email!'),
    password: string().required('Please provide a password')
  })
  const { values, errors, touched, setFieldValue, handleSubmit } =
    useFormik<LoginParams>({
      initialValues: {
        password: '',
        email: ''
      },
      validationSchema,
      onSubmit: handleSign
    })

  const theme = useTheme()
  const errorText = React.useMemo(() => {
    if (err !== '') return err
    return null
  }, [err])

  return (
    <Grid
      height={'100vh'}
      container
      alignItems={'center'}
      id={'login-component'}
      justifyContent={'center'}
    >
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Grid
        item
        height={'100vh'}
        bgcolor={theme.palette.primary.main}
        xs={0}
        md={6}
        xl={6}
      >
        <Content>
          <div>
            <Typography textAlign={'center'} variant={'h2'} color={'light'}>
              Welcome Back
            </Typography>
          </div>
          <div>
            <CustomButton>Create Account</CustomButton>
          </div>
        </Content>
      </Grid>
      <Grid
        height={'100%'}
        item
        padding={3}
        xs={12}
        sm={12}
        md={6}
        xl={6}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid
          item
          component={'form'}
          onSubmit={handleSubmit}
          noValidate={true}
          mt={'40%'}
        >
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant={'h3'} color={'primary'}>
                Log In To Continue
              </Typography>
            </Grid>
            {errorText !== null && (
              <Grid width={'100%'} item>
                <Alert
                  sx={{ width: '100%' }}
                  variant={'filled'}
                  color={'error'}
                >
                  {JSON.stringify(errorText)}
                </Alert>
              </Grid>
            )}
            <Grid xs={12} item>
              <TextField
                label={'Email'}
                type={'email'}
                fullWidth={true}
                value={values.email}
                error={Boolean(touched.email === true && errors.email)}
                helperText={touched.email === true ? errors.email : undefined}
                onChange={async (e) =>
                  await setFieldValue('email', e.target.value).then()
                }
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type={'password'}
                label={'Password'}
                fullWidth={true}
                value={values.password}
                onChange={async (e) =>
                  await setFieldValue('password', e.target.value)
                }
                error={Boolean(touched?.password && Boolean(errors.password))}
                helperText={
                  touched?.password && Boolean(errors.password)
                    ? errors.password
                    : undefined
                }
              />
            </Grid>
            <Grid xs={12} item textAlign={'end'}>
              <Button disabled={loading} startIcon={loading ? <CustomLoader/> : <LockOpenIcon/>} variant={'contained'} type={'submit'}>
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
