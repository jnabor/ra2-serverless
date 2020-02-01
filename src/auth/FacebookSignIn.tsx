import React, { useContext } from 'react'

import { AuthContext } from './auth-context'
import Button from '@material-ui/core/Button'
import { useStyles } from './components/styles'
import facebookLogo from '../static/facebook.png'

export interface FacebookSignInProps {}

const FacebookSignIn: React.SFC<FacebookSignInProps> = () => {
  const authContext = useContext(AuthContext)

  const signInHandler = () => {
    authContext.federatedSignIn('facebook')
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
            <img style={{ height: '22px' }} src={facebookLogo} />
          </div>
          Sign in with Facebook
        </div>
      </div>
    </Button>
  )
}

export default FacebookSignIn
