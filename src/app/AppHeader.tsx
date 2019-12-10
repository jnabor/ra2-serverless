import React, { useContext } from 'react'

//import { AuthContext } from '../auth/auth-context'

import { Toolbar, AppBar, IconButton, Button } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import {
  useTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: { boxShadow: 'none', backgroundColor: 'transparent' },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    spacer: {
      flexGrow: 1
    }
  })
)

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
  const classes = useStyles(useTheme())
  //const authContext = useContext(AuthContext)

  //let authLink = authContext.isAuth ? (
  //  <Button
  //    color='primary'
  //    onClick={() => {
  //      console.log('sign out')
  //    }}>
  //    Sign Out
  //  </Button>
  //) : null

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          onClick={() => {}}
          color='inherit'
          aria-label='home'>
          <HomeIcon color='action' />
        </IconButton>
        <div className={classes.spacer}></div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
