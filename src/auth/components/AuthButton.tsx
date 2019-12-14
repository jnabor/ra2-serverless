import React from 'react'

import Button from '@material-ui/core/Button'
import { useStyles } from './styles'

export interface AuthButtonProps {
  children: any
  disabled: boolean
}

const AuthButton: React.SFC<AuthButtonProps> = ({ children, disabled }) => {
  const classes = useStyles()

  return (
    <Button
      type='submit'
      disabled={disabled}
      fullWidth
      variant='contained'
      color='primary'
      size='large'
      className={classes.submit}>
      {children}
    </Button>
  )
}

export default AuthButton
