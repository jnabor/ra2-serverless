import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useStyles } from './styles'

export interface AuthLayoutProps {
  title: string
  children: any
}

const AuthLayout: React.SFC<AuthLayoutProps> = ({ title, children }) => {
  const classes = useStyles()

  return (
    <Container maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {title}
        </Typography>
        {children}
      </div>
    </Container>
  )
}

export default AuthLayout
