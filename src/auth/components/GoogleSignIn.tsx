import React, { useContext } from 'react'

import { AuthContext } from '../auth-context'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'
import GoogleIcon from './GoogleIcon'

export interface GoogleSignInProps {}

const GoogleSignIn: React.SFC<GoogleSignInProps> = () => {
  const authContext = useContext(AuthContext)

  const signInHandler = () => {
    authContext
      .googleSignIn()
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const classes = useStyles()

  return (
    <Button
      fullWidth
      variant='contained'
      onClick={() => {
        signInHandler()
      }}
      size='large'
      className={classes.google}>
      <GoogleIcon />
      {authContext.isAuth ? 'Signed In' : 'Sign In with Google'}
    </Button>
  )
}

export default GoogleSignIn
