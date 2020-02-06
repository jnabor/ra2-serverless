import React, { useEffect, useState } from 'react'
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

const FACEBOOK_CLIENT_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID

export interface FacebookSignInProps {}

const FacebookSignIn: React.SFC<FacebookSignInProps> = () => {
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
      appId: FACEBOOK_CLIENT_ID,
      cookie: true,
      xfbml: true,
      version: 'v2.11'
    })
  }

  const statusChangeCallback = (response: any) => {
    if (response.status === 'connected') {
      handleResponse(response.authResponse)
    } else {
      console.log(response)
    }
  }

  const checkLoginState = () => {
    window.FB.getLoginStatus(statusChangeCallback)
  }

  const handleClick = () => {
    window.FB.login(checkLoginState, {
      scope: 'public_profile,email'
    })
  }

  const handleResponse = async (data: any) => {
    const { accessToken: token, expiresIn } = data
    const date = new Date()
    const expires_at = expiresIn * 1000 + date.getTime()
    setLoading(true)

    const fb = window.FB
    fb.api('/me', { fields: 'name,email' }, (response: any) => {
      const user = {
        name: response.name,
        email: response.email
      }

      Auth.federatedSignIn('facebook', { token, expires_at }, user)
        .then(credentials => {
          console.log(credentials)
          setLoading(false)
          localStorage.setItem('provider', 'facebook')
          console.log('signed in with facebook')
        })
        .catch(err => {
          setLoading(false)
          console.log('error sign in with facebook')
        })
    })
  }

  const classes = useStyles()

  return (
    <Button
      variant='contained'
      disabled={loading}
      onClick={() => {
        handleClick()
      }}
      size='large'
      className={[classes.btn, classes.btnFederated].join(' ')}>
      <div className={classes.btnElems}>
        <div className={classes.btnIcon}>
          <img
            style={{ height: '24px', paddingTop: '3px' }}
            src={facebookLogo}
          />
        </div>
        <div className={classes.btnLabel}>Continue with Facebook</div>
      </div>
    </Button>
  )
}

export default FacebookSignIn
