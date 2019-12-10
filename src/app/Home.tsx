import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Grid,
  Link,
  Container,
  CssBaseline,
  Paper,
  Typography
} from '@material-ui/core'

import Button from '@material-ui/core/Button'
import Snackbar from '../common/Snackbar'
import { AuthContext } from '../auth/auth-context'
import AuthButton from '../auth/components/AuthButton'
import AuthEmailField from '../auth/components/AuthEmailField'
import AuthPasswordField from '../auth/components/AuthPasswordField'
import AppImage from './AppImage'
import Layout from './AppHomeLayout'

import {
  useTheme,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh'
    },
    paper: {
      margin: theme.spacing(2),
      marginBottom: theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    link: {
      margin: theme.spacing(3, 0, 2)
    }
  })
)

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const history = useHistory()

  useEffect(() => {
    setDisable(!(email && password))
  }, [email, password])

  const submitHandler = async (e: any) => {
    e.preventDefault()
    try {
      const signin = await authContext.signIn(email, password)
      console.log(signin)
      //history.push('/')
    } catch (err) {
      console.error('err', err)
      setError(err)
    }
  }

  const classes = useStyles(useTheme())

  const login = authContext.isAuth ? (
    <Button
      color='primary'
      variant='contained'
      onClick={() => history.push('/dashboard')}
      className={classes.link}>
      Dashboard
    </Button>
  ) : (
    <form className={classes.form} onSubmit={e => submitHandler(e)} noValidate>
      <AuthEmailField setEmail={email => setEmail(email)} />
      <AuthPasswordField setPassword={password => setPassword(password)} />
      <AuthButton disabled={disable}>Sign In</AuthButton>
      <Grid container>
        <Grid item xs>
          <Link
            onClick={() => history.push('/auth/resetpassword')}
            variant='body2'>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={() => history.push('/auth/signup')} variant='body2'>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  )

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Layout title='Molotov Home'>
          <CssBaseline />
          <Container maxWidth='xs'>
            <div className={classes.paper}>
              <Typography variant='h5' gutterBottom>
                RA2™ Serverless
              </Typography>
              <Typography variant='subtitle2'>
                SaaS Starter Kit with React AWS Amplify
              </Typography>
              {login}
              <Snackbar variant='error' message={error} />
            </div>
          </Container>
        </Layout>
      </Grid>
      <AppImage />
    </Grid>
  )
}

export default Home
