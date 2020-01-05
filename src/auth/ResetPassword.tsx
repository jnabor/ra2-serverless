import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import Snackbar from '../common/Snackbar'
import { AuthContext } from './auth-context'
import Layout from '../app/AppLayout'
import AuthButton from './components/AuthButton'
import AuthEmailField from './components/AuthEmailField'
import AuthLayout from './components/AuthLayout'
import { useStyles } from './components/styles'

export interface AuthResetProps {}

const AuthReset: React.SFC<AuthResetProps> = () => {
  const authContext = useContext(AuthContext)
  const [error, setError] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const history = useHistory()

  useEffect(() => {
    setDisable(!email)
  }, [email])

  const submitHandler = (e: any) => {
    e.preventDefault()
    authContext
      .resetPassword(email)
      .then(data => {
        console.log('response', data, email)
        history.push('/auth/resetpassword/confirm', email)
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
    <Layout title='RA2 Reset Password'>
      <AuthLayout title='Reset Password'>
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
          <AuthButton disabled={disable}>Reset</AuthButton>
        </form>
      </AuthLayout>
    </Layout>
  )
}

export default AuthReset
