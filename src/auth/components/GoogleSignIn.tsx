import React, { useContext } from 'react'

import { AuthContext } from '../auth-context'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'
import GoogleIcon from './GoogleIcon'

export interface GoogleSignInProps {}

const GoogleSignIn: React.SFC<GoogleSignInProps> = () => {
  const authContext = useContext(AuthContext)

  const signInHandler = () => {
    authContext.federatedSignIn('google')
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
      <div className={classes.container}>
        <div className={classes.spacer} />
        <div className={classes.fsignLabel}>
          <div className={classes.logo}>
            <GoogleIcon />
          </div>
          {authContext.isAuthenticated()
            ? 'Sign Out Google'
            : 'Sign in with Google'}
        </div>
      </div>
    </Button>
  )
}

export default GoogleSignIn
