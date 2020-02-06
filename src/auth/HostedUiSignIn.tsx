import React, { useContext } from 'react'
import { Auth } from 'aws-amplify'
import cognitoLogo from '../static/cognito.png'
import Button from '@material-ui/core/Button'
import { useStyles } from './components/styles'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types'

export interface HostedUiSignInProps {}

const HostedUiSignIn: React.SFC<HostedUiSignInProps> = () => {
  const signInHandler = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook
    })
  }

  const classes = useStyles()

  return (
    <Button
      fullWidth
      variant='contained'
      onClick={() => signInHandler()}
      size='large'
      className={classes.btnFederated}>
      <div className={classes.btnElems}>
        <div className={classes.btnIcon}>
          <img style={{ height: '22px' }} src={cognitoLogo} />
        </div>
        <div className={classes.btnLabel}>Sign in with Hosted UI</div>
      </div>
    </Button>
  )
}

export default HostedUiSignIn
