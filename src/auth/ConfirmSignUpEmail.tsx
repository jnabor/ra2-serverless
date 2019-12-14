import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, Grid } from '@material-ui/core'

import Layout from '../app/AppLayout'
import Snackbar from '../common/Snackbar'

import { AuthContext } from './auth-context'
import AuthEmailField from './components/AuthEmailField'
import AuthCodeField from './components/AuthCodeField'
import AuthButton from './components/AuthButton'
import AuthLayout from './components/AuthLayout'
import { useStyles } from './components/styles'

export interface AuthConfirmSignUpEmailProps {}

const AuthConfirmSignUpEmail: React.SFC<AuthConfirmSignUpEmailProps> = () => {
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const history = useHistory()

  useEffect(() => {
    setDisable(!(email && code))
  }, [email, code])

  const submitHandler = (e: any) => {
    e.preventDefault()
    authContext
      .confirmSignUp(email, code)
      .then(data => {
        console.log(data)
        history.push('/')
      })
      .catch(err => {
        console.error('error:', err)
        setError(err)
      })
  }

  const resendHandler = () => {
    authContext
      .resendSignUp(email)
      .then(data => {
        setMessage('Code resent to your email.')
      })
      .catch(err => {
        console.error('error:', err)
        setError(err)
      })
  }

  const setErrorMsg = useCallback((message: string) => {
    setError(message)
  }, [])

  const setSuccessMsg = useCallback((message: string) => {
    setMessage(message)
  }, [])

  const classes = useStyles()
  return (
    <Layout title='RA2 Confirm Sign Up'>
      <AuthLayout title='Confirm Sign Up'>
        <Snackbar
          variant='error'
          message={error}
          setMessage={message => setErrorMsg(message)}
        />
        <Snackbar
          variant='success'
          message={message}
          setMessage={message => setSuccessMsg(message)}
        />
        <form
          className={classes.form}
          onSubmit={e => submitHandler(e)}
          noValidate>
          <AuthEmailField setEmail={email => setEmail(email)} />
          <AuthCodeField setCode={code => setCode(code)} />
          <AuthButton disabled={disable}>Confirm</AuthButton>
          <Grid container>
            <Grid item xs className={classes.links}></Grid>
            <Grid item className={classes.links}>
              <Link href='#' onClick={() => resendHandler()} variant='body2'>
                Resend code
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </Layout>
  )
}

export default AuthConfirmSignUpEmail
