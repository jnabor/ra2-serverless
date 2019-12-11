import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

export interface AuthEmailFieldProps {
  setEmail: (email: string) => void
}

const AuthEmailField: React.SFC<AuthEmailFieldProps> = ({ setEmail }) => {
  const [valid, setValid] = useState<boolean>(true)
  const [hint, setHint] = useState<string>('')

  let delay: any = null
  const validate = (email: string): any => {
    if (delay !== null) {
      clearTimeout(delay)
    }
    delay = setTimeout(() => {
      const isValid = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
      setValid(isValid)
      setHint(
        isValid ? '' : email.length > 0 ? 'Invalid email.' : 'Enter email.'
      )
      setEmail(isValid ? email : '')
      delay = null
    }, 200)
  }

  return (
    <TextField
      error={!valid}
      variant='outlined'
      margin='normal'
      required
      fullWidth
      id='email'
      label='Email Address'
      name='email'
      autoComplete='email'
      helperText={hint}
      onChange={e => validate(e.currentTarget.value)}
    />
  )
}

export default AuthEmailField
