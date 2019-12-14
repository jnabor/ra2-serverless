import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, Grid } from '@material-ui/core'

import Layout from '../app/AppLayout'
import AuthButton from './components/AuthButton'
import AuthEmailField from './components/AuthEmailField'
import AuthLayout from './components/AuthLayout'
import { useStyles } from './components/styles'

export interface AuthResetProps {}

const AuthReset: React.SFC<AuthResetProps> = () => {
  const [email, setEmail] = useState<string>('')
  const history = useHistory()

  const submitHandler = (e: any) => {
    e.preventDefault()
    console.log('reset password')
  }

  const classes = useStyles()

  return (
    <Layout title='RA2 Reset Password'>
      <AuthLayout title='Reset'>
        <form
          className={classes.form}
          onSubmit={e => submitHandler(e)}
          noValidate>
          <AuthEmailField setEmail={email => setEmail(email)} />
          <AuthButton disabled={true}>Reset</AuthButton>
        </form>
      </AuthLayout>
    </Layout>
  )
}

export default AuthReset
