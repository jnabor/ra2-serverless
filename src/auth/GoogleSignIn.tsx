import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'

import Button from '@material-ui/core/Button'
import { useStyles } from './components/styles'
import GoogleIcon from './components/GoogleIcon'

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

export interface GoogleSignInProps {}

const GoogleSignIn: React.SFC<GoogleSignInProps> = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const ga =
      window.gapi && window.gapi.auth2
        ? window.gapi.auth2.getAuthInstance()
        : null

    if (ga) {
      setLoading(false)
    } else {
      createScript()
    }
  }, [])

  const createScript = () => {
    // load the Google SDK
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.async = true
    script.defer = true
    script.onload = initGapi
    document.body.appendChild(script)
  }

  const initGapi = () => {
    // init the Google SDK client
    const g = window.gapi
    g.load('auth2', function() {
      setLoading(false)
      g.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'profile email openid'
      })
    })
  }

  const signIn = () => {
    const ga = window.gapi.auth2.getAuthInstance()
    ga.signIn().then(
      googleUser => {
        getAWSCredentials(googleUser)
      },
      error => {
        console.log(error)
      }
    )
  }

  const getAWSCredentials = (googleUser: any) => {
    const { id_token, expires_at } = googleUser.getAuthResponse()
    setLoading(true)

    const profile = googleUser.getBasicProfile()
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    }

    Auth.federatedSignIn('google', { token: id_token, expires_at }, user)
      .then(credentials => {
        console.log(credentials)
        setLoading(false)
        localStorage.setItem('provider', 'google')
        console.log('signed in with google')
      })
      .catch(err => {
        setLoading(false)
        console.log('error sign in with google')
      })
  }

  const classes = useStyles()

  return (
    <Button
      fullWidth
      variant='contained'
      disabled={loading}
      onClick={() => {
        signIn()
      }}
      size='large'
      className={[classes.btn, classes.btnFederated].join(' ')}>
      <div className={classes.btnElems}>
        <div className={classes.btnIcon}>
          <GoogleIcon />
        </div>
        <div className={classes.btnLabel}>Continue with Google</div>
      </div>
    </Button>
  )
}

export default GoogleSignIn
