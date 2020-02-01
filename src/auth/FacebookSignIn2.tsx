import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from './auth-context'
import Button from '@material-ui/core/Button'
import { useStyles } from './components/styles'
import facebookLogo from '../static/facebook.png'
import { Auth } from 'aws-amplify'

declare global {
  interface Window {
    FB: any
    fbAsyncInit: any
  }
}

export interface FacebookSignInProps {}

const FacebookSignIn: React.SFC<FacebookSignInProps> = () => {
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!window.FB) createScript()
    waitForInit()
      .then(data => setLoading(false))
      .catch(err => {})
  }, [])

  const waitForInit = () => {
    return new Promise((res, rej) => {
      const hasFbLoaded = () => {
        if (window.FB) {
          res()
        } else {
          setTimeout(hasFbLoaded, 300)
        }
      }
      hasFbLoaded()
    })
  }

  const createScript = () => {
    // load the sdk
    window.fbAsyncInit = fbAsyncInit
    const script = document.createElement('script')
    script.src = 'https://connect.facebook.net/en_US/sdk.js'
    script.async = true
    document.body.appendChild(script)
  }

  const fbAsyncInit = () => {
    const fb = window.FB
    fb.init({
      appId: '552618845303798',
      cookie: true,
      xfbml: true,
      version: 'v2.11'
    })
  }

  const statusChangeCallback = (response: any) => {
    if (response.status === 'connected') {
      handleResponse(response.authResponse)
    } else {
      handleError(response)
    }
  }

  const checkLoginState = () => {
    window.FB.getLoginStatus(statusChangeCallback)
  }

  const handleClick = () => {
    window.FB.login(checkLoginState, { scope: 'public_profile,email' })
  }

  const handleError = (error: any) => {
    alert(error)
  }

  const handleResponse = async (data: any) => {
    const { name, email, accessToken: token, expiresIn } = data
    const expires_at = expiresIn * 1000 + new Date().getTime()
    const user = { name, email }

    setLoading(true)

    try {
      const response = await Auth.federatedSignIn(
        'facebook',
        { token, expires_at },
        user
      )
      setLoading(false)
      console.log('signed in with facebook')
    } catch (e) {
      setLoading(false)
      console.log('error sign in with facebook')
    }
  }

  const classes = useStyles()

  return (
    <Button
      fullWidth
      variant='contained'
      disabled={loading}
      onClick={() => {
        handleClick()
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
