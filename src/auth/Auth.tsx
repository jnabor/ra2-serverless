import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'
import ConfirmSignUp from './ConfirmSignUp'
import ConfirmSignUpEmail from './ConfirmSignUpEmail'
import ResetPassword from './ResetPassword'

export interface AuthProps {}

const Auth: React.SFC<AuthProps> = () => {
  return (
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
    </Switch>
  )
}

export default Auth
