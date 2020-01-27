import React, { useContext } from 'react'

import { AuthContext } from '../auth-context'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'
import facebookLogo from '../../static/facebook.png'

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
        <div className={classes.fsignLogo}>
          <img style={{ height: '22px' }} src={facebookLogo} />
        </div>
        <div className={classes.fsignLabel}>
          {authContext.isAuthenticated()
            ? 'Sign Out Facebook'
            : 'Sign In Facebook'}
        </div>
      </div>
    </Button>
  )
}

export default FacebookSignIn
