import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, Grid, TextField } from '@material-ui/core'

import Layout from '../app/AppLayout'
import Snackbar from '../common/Snackbar'

import { AuthContext } from './auth-context'
import AuthButton from './components/AuthButton'
import AuthLayout from './components/AuthLayout'
import { useStyles } from './components/styles'

export interface AuthConfirmSignUpProps {}

const AuthConfirmSignUp: React.SFC<AuthConfirmSignUpProps> = () => {
  const authContext = useContext(AuthContext)
  const [code, setCode] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [hint, setHint] = useState<string>('')
  const [error, setError] = useState<string>('')
  const history = useHistory()

  const submitHandler = (e: any) => {
    e.preventDefault()
    console.log('submit', code)
    e.preventDefault()
    authContext
      .confirmSignUp(code)
      .then(data => {
        console.log(data)
        history.push('/auth')
      })
      .catch(err => {
        console.error('error:', err)
        setError(err)
      })
  }

  let delay: any = null
  const validate = (code: string): any => {
    if (delay !== null) {
      clearTimeout(delay)
    }
    delay = setTimeout(() => {
      const isValid = code.length === 6
      setDisable(!isValid)
      setHint(isValid ? '' : 'Incorrect code length.')
      setCode(code)
      delay = null
    }, 300)
  }

  const classes = useStyles()
  return (
    <Layout title='RA2 Confirm Sign Up'>
      <AuthLayout title='Confirm'>
        <Snackbar variant='error' message={error} />
        <form
          className={classes.form}
          onSubmit={e => submitHandler(e)}
          noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='confirmation'
            label='Confirmation Code'
            name='confirmation'
            helperText={hint}
            onChange={e => validate(e.currentTarget.value)}
          />
          <AuthButton disabled={disable}>Confirm</AuthButton>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href='#'
                onClick={() => history.push('/auth')}
                variant='body2'>
                {'Resend confirmation code'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </Layout>
  )
}

export default AuthConfirmSignUp
