import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

export interface AuthEmailFieldProps {
  setCode: (code: string) => void
}

const AuthEmailField: React.SFC<AuthEmailFieldProps> = ({ setCode }) => {
  const [hint, setHint] = useState<string>('')

  let delay: any = null
  const validate = (code: string): any => {
    if (delay !== null) {
      clearTimeout(delay)
    }
    delay = setTimeout(() => {
      const isValid = code.length === 6
      setHint(isValid ? '' : 'Incorrect code length.')
      setCode(isValid ? code : '')
      delay = null
    }, 300)
  }

  return (
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
  )
}

export default AuthEmailField
