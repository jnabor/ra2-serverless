import React, { useContext, useEffect } from 'react'
import { Auth } from 'aws-amplify'

import { AuthContext } from './auth-context'
import Button from '@material-ui/core/Button'
import { useStyles } from './components/styles'
import facebookLogo from '../static/facebook.png'

export interface FacebookSignInProps {}

declare global {
  interface Window {
    FB: any
    fbAsyncInit: any
  }
}

const FacebookSignIn: React.SFC<FacebookSignInProps> = () => {
  const authContext = useContext(AuthContext)

  const signInHandler = () => {
    authContext.federatedSignIn('facebook')
  }

  useEffect(() => {
    if (!window.FB) createScript()
  }, [])

  const signIn = () => {
    const fb = window.FB
    fb.getLoginStatus((response: any) => {
      if (response.status === 'connected') {
        console.log('connected', response.authResponse)
        //getAWSCredentials(response.authResponse)
      } else {
        console.log('logging in')
        fb.login(
          (response: any) => {
            if (!response || !response.authResponse) {
              return
            }
            console.log('ogged in', response.authResponse)
            //getAWSCredentials(response.authResponse)
          },
          {
            // the authorized scopes
            scope: 'public_profile,email'
          }
        )
      }
    })
  }

  const getAWSCredentials = (response: any) => {
    const { accessToken, expiresIn } = response
    const date = new Date()
    const expires_at = expiresIn * 1000 + date.getTime()
    if (!accessToken) {
      return
    }

    const fb = window.FB
    fb.api('/me', { fields: 'name,email' }, (response: any) => {
      const user = {
        name: response.name,
        email: response.email
      }

      Auth.federatedSignIn(
        'facebook',
        { token: accessToken, expires_at },
        user
      ).then(credentials => {
        console.log(credentials)
      })
    })
  }

  const createScript = () => {
    // load the sdk
    console.log('creating script')
    window.fbAsyncInit = fbAsyncInit
    const script = document.createElement('script')
    script.src = 'https://connect.facebook.net/en_US/sdk.js'
    script.async = true
    script.onload = initFB
    document.body.appendChild(script)
  }

  const fbAsyncInit = () => {
    // init the fb sdk client
    const fb = window.FB
    fb.init({
      appId: '552618845303798',
      cookie: true,
      xfbml: true,
      version: 'v2.11'
    })
  }

  const initFB = () => {
    const fb = window.FB
    console.log('FB SDK inited')
  }

  const classes = useStyles()

  return (
    <Button
      fullWidth
      variant='contained'
      onClick={() => {
        signIn()
      }}
      size='large'
      className={classes.google}>
      <div className={classes.container}>
        <div className={classes.spacer} />
        <div className={classes.fsignLabel}>
          <div className={classes.logo}>
            <img style={{ height: '22px' }} src={facebookLogo} />
          </div>
          {authContext.isAuthenticated()
            ? 'Sign Out Facebook'
            : 'Sign in with Facebook'}
        </div>
      </div>
    </Button>
  )
}

export default FacebookSignIn
