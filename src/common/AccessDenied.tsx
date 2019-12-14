import React from 'react'
import Layout from '../app/AppLayout'

import { useStyles } from './styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export interface AccessDeniedProps {}

const AccessDenied: React.SFC<AccessDeniedProps> = () => {
  const classes = useStyles()
  return (
    <Layout title='RA2 Access Denied'>
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Access Denied!</h1>
      </div>
    </Layout>
  )
}

export default AccessDenied
