import React, { useState, useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'

import {
  Grid,
  Link,
  Container,
  CssBaseline,
  Paper,
  Typography
} from '@material-ui/core'

//import Button from '@material-ui/core/Button'
import Snackbar from '../common/Snackbar'
//import { AuthContext } from '../components/auth/auth-context'
//import AuthButton from '../components/auth/AuthButton'
//import AuthEmailField from '../components/auth/AuthEmailField'
//import AuthPasswordField from '../components/auth/AuthPasswordField'
import AppImage from './AppImage'
import Layout from '../app/AppHomeLayout'

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

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  //const authContext = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setDisable(!(email && password))
  }, [email, password])

  const submitHandler = async (e: any) => {
    e.preventDefault()
    try {
      //const signin = await authContext.signIn(email, password)
      //console.log(signin)
      //Router.push('/dashboard')
    } catch (err) {
      //console.error('error:', err)
      //setError(err)
    }
  }

  const classes = useStyles(useTheme())

  return (
    <div>
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
                <Snackbar variant='error' message={error} />
              </div>
            </Container>
          </Layout>
        </Grid>
        <AppImage />
      </Grid>
    </div>
  )
}

export default App
