import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import Auth from '../auth/Auth'
import Dashboard from '../dashboard/Dashboard'

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/auth' component={Auth} />
      <Route path='/dashboard' component={Dashboard} />
    </Switch>
  )
}

export default App
