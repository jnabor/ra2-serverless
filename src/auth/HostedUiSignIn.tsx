import React, { useContext } from 'react'

import { AuthContext } from './auth-context'
import cognitoLogo from '../static/cognito.png'
import Button from '@material-ui/core/Button'
import { useStyles } from './components/styles'

export interface HostedUiSignInProps {}

const HostedUiSignIn: React.SFC<HostedUiSignInProps> = () => {
  const authContext = useContext(AuthContext)

  const signInHandler = () => {
    authContext.federatedSignIn('hosted')
  }

  const classes = useStyles()

  return (
    <Button
      fullWidth
      variant='contained'
      onClick={() => signInHandler()}
      size='large'
      className={classes.google}>
      <div className={classes.container}>
        <div className={classes.spacer} />
        <div className={classes.fsignLabel}>
          <div className={classes.logo}>
            <img style={{ height: '22px' }} src={cognitoLogo} />
          </div>
          Sign in with Hosted UI
        </div>
      </div>
    </Button>
  )
}

export default HostedUiSignIn
