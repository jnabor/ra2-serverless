import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, Grid } from '@material-ui/core'

import Layout from '../app/AppLayout'
import Snackbar from '../common/Snackbar'

import { AuthContext } from './auth-context'
import AuthCodeField from './components/AuthCodeField'
import AuthButton from './components/AuthButton'
import AuthLayout from './components/AuthLayout'
import { useStyles } from './components/styles'

export interface AuthConfirmSignUpProps {}

const AuthConfirmSignUp: React.SFC<AuthConfirmSignUpProps> = () => {
  const authContext = useContext(AuthContext)
  const [code, setCode] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const history = useHistory()

  useEffect(() => {
    setDisable(!code)
  }, [code])

  const submitHandler = (e: any) => {
    e.preventDefault()
    authContext
      .confirmSignUp(code)
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
    setMessage('')
    authContext
      .resendSignUp()
      .then(data => {
        setMessage('Code resent to your email.')
      })
      .catch(err => {
        console.error('error:', err)
        setError(err)
      })
  }

  const classes = useStyles()
  return (
    <Layout title='RA2 Confirm Sign Up'>
      <AuthLayout title='Confirm'>
        <Snackbar variant='error' message={error} />
        <Snackbar variant='success' message={message} />
        <form
          className={classes.form}
          onSubmit={e => submitHandler(e)}
          noValidate>
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

export default AuthConfirmSignUp
