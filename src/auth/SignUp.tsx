import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, Grid } from '@material-ui/core'
import Layout from '../app/AppLayout'
import Snackbar from '../common/Snackbar'

import { AuthContext } from './auth-context'
import AuthLayout from './components/AuthLayout'
import AuthEmailField from './components/AuthEmailField'
import AuthPasswordField from './components/AuthPasswordField'
import AuthButton from './components/AuthButton'
import { useStyles } from './components/styles'

export interface AuthSignUpProps {}

const AuthSignUp: React.SFC<AuthSignUpProps> = () => {
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
      .signUp(email, password)
      .then(data => {
        history.push('/auth/signup/confirm', email)
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
    <Layout title='RA2 Sign Up'>
      <AuthLayout title='Sign Up'>
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
          <AuthButton disabled={disable}>Sign Up</AuthButton>
          <Grid container>
            <Grid item xs className={classes.links}>
              <Link
                href='#'
                onClick={() => history.push('/auth')}
                variant='body2'>
                {'Sign In'}
              </Link>
            </Grid>
            <Grid item className={classes.links}>
              <Link
                href='#'
                onClick={() => history.push('/auth/signup/confirmemail')}
                variant='body2'>
                {'Confirm Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </Layout>
  )
}

export default AuthSignUp
