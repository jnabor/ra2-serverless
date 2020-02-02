import React, { useContext, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Grid,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Divider
} from '@material-ui/core'

import logo from '../static/ra2.png'
//import HostedUiSignIn from '../auth/HostedUiSignIn'
import EmailSignIn from '../auth/EmailSignIn'
import GoogleSignIn from '../auth/GoogleSignIn'
import FacebookSignIn from '../auth/FacebookSignIn'
import Button from '@material-ui/core/Button'
import { AuthContext } from '../auth/auth-context'
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
    link1: {
      margin: theme.spacing(3, 0, 0, 0)
    },
    link2: {
      margin: theme.spacing(2, 0, 0, 0)
    },
    logo: {
      height: '48px',
      marginBottom: theme.spacing(1)
    },
    hr: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
      width: '100%'
    }
  })
)

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()
  const classes = useStyles(useTheme())

  const appImage = useMemo(() => <AppImage />, [])

  const dashLink = authContext.isAuthenticated() ? (
    <React.Fragment>
      <Button
        fullWidth
        color='secondary'
        variant='outlined'
        size='large'
        onClick={() => history.push('/dashboard')}
        className={classes.link1}>
        Go to Dashboard
      </Button>
      <Button
        fullWidth
        color='primary'
        variant='outlined'
        size='large'
        onClick={() => authContext.signOut()}
        className={classes.link2}>
        Sign Out
      </Button>
    </React.Fragment>
  ) : null

  const federatedSignIn = !authContext.isAuthenticated() ? (
    <React.Fragment>
      <EmailSignIn />
      <div className={classes.hr}>
        <Divider />
      </div>
      <GoogleSignIn />
      <FacebookSignIn />
    </React.Fragment>
  ) : null

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Layout title='RA2 Serverless'>
          <CssBaseline />
          <Container maxWidth='xs'>
            <div className={classes.paper}>
              <img className={classes.logo} src={logo} />
              <Typography variant='h5' gutterBottom>
                RA2™ Serverless
              </Typography>
              <Typography variant='subtitle2'>
                SaaS Starter Kit with React AWS Amplify
              </Typography>
              {dashLink}
              {federatedSignIn}
            </div>
          </Container>
        </Layout>
      </Grid>
      {appImage}
    </Grid>
  )
}

export default Home
