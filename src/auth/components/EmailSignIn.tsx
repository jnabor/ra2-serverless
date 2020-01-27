import React from 'react'
import { useHistory } from 'react-router-dom'

import EmailIcon from '@material-ui/icons/Email'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'

export interface HostedUiSignInProps {}

const HostedUiSignIn: React.SFC<HostedUiSignInProps> = () => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <Button
      fullWidth
      variant='contained'
      onClick={() => history.push('/auth')}
      size='large'
      className={classes.google}>
      <div className={classes.container}>
        <div className={classes.spacer} />
        <div className={classes.fsignLabel}>
          <div className={classes.logo}>
            <EmailIcon />
          </div>
          Sign In Email
        </div>
        <div className={classes.spacer} />
      </div>
    </Button>
  )
}

export default HostedUiSignIn
