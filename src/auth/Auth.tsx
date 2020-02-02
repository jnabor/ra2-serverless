import React, { useContext, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import { AuthContext } from './auth-context'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ConfirmSignUp from './ConfirmSignUp'
import ConfirmSignUpEmail from './ConfirmSignUpEmail'
import ResetPassword from './ResetPassword'
import ConfirmResetPassword from './ConfirmResetPassword'

export interface AuthProps {}

const Auth: React.SFC<AuthProps> = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    console.log('authenticated?', authContext.isAuthenticated())
    if (authContext.isAuthenticated()) {
      history.push('/')
    }
  }, [])

  authContext.isAuthenticated() && history.push('/')

  const routes = authContext.isAuthenticated() ? null : (
    <Switch>
      <Route exact path='/auth' component={SignIn} />
      <Route exact path='/auth/signup' component={SignUp} />
      <Route exact path='/auth/signup/confirm' component={ConfirmSignUp} />
      <Route
        exact
        path='/auth/signup/confirmemail'
        component={ConfirmSignUpEmail}
      />
      <Route exact path='/auth/resetpassword' component={ResetPassword} />
      <Route
        exact
        path='/auth/resetpassword/confirm'
        component={ConfirmResetPassword}
      />
    </Switch>
  )

  return <React.Fragment>{routes}</React.Fragment>
}

export default Auth
