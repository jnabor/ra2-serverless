import React from 'react'

import cognitoLogo from '../../static/cognito.png'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'

export interface HostedUiSignInProps {}

const HostedUiSignIn: React.SFC<HostedUiSignInProps> = () => {
  const classes = useStyles()

  return (
    <Button
      fullWidth
      disabled={true}
      variant='contained'
      href='https://ra2-serverless-dev.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=23dh4b2jv56qoovs13ga8vqjre&redirect_uri=http://localhost:3000/'
      size='large'
      className={classes.google}>
      <div className={classes.container}>
        <div className={classes.fsignLogo}>
          <img style={{ height: '22px' }} src={cognitoLogo} />
        </div>
        <div className={classes.fsignLabel}>Hosted UI</div>
      </div>
    </Button>
  )
}

export default HostedUiSignIn
