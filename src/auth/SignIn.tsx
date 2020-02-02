import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, Grid } from '@material-ui/core'
import Layout from '../app/AppLayout'
import Snackbar from '../common/Snackbar'

import { AuthContext } from './auth-context'
import AuthButton from './components/AuthButton'
import AuthEmailField from './components/AuthEmailField'
import AuthPasswordField from './components/AuthPasswordField'
import AuthLayout from './components/AuthLayout'
import { useStyles } from './components/styles'

export interface AuthSignInProps {}

const AuthSignIn: React.SFC<AuthSignInProps> = () => {
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const history = useHistory()

  useEffect(() => {
    setDisable(!(email && password))
  }, [email, password])

  const submitHandler = (e: any) => {
    e.preventDefault()
    authContext
      .signIn(email, password)
      .then(data => {
        console.log('sign in success!')
      })
      .catch(err => {
        console.error('error:', err)
        setError(err)
      })
  }

  const setErrorMsg = useCallback((message: string) => {
    setError(message)
  }, [])

  const classes = useStyles()

  return (
    <Layout title='RA2 Sign In'>
      <AuthLayout title='Sign In'>
        <Snackbar
          variant='error'
          message={error}
          setMessage={message => setErrorMsg(message)}
        />
        <form
          className={classes.form}
          onSubmit={e => submitHandler(e)}
          noValidate>
          <AuthEmailField setEmail={email => setEmail(email)} />
          <AuthPasswordField setPassword={password => setPassword(password)} />
          <AuthButton disabled={disable}>Sign In</AuthButton>
          <Grid container>
            <Grid item xs className={classes.links}>
              <Link
                href='#'
                onClick={() => history.push('/auth/resetpassword')}
                variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item className={classes.links}>
              <Link
                href='#'
                onClick={() => history.push('/auth/signup')}
                variant='body2'>
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </Layout>
  )
}

export default AuthSignIn
