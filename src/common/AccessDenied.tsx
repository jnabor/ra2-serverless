import React from 'react'
import Layout from '../app/AppLayout'

import {
  useTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })
)

export interface AccessDeniedProps {}

const AccessDenied: React.SFC<AccessDeniedProps> = () => {
  const classes = useStyles(useTheme())
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
