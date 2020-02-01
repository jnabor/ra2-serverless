import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import {
  Drawer,
  CssBaseline,
  Toolbar,
  AppBar,
  List,
  Typography,
  Divider,
  Container,
  IconButton,
  Paper,
  Grid,
  Button
} from '@material-ui/core'

import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import Footer from '../app/AppFooter'
import withAuthenticator from '../auth/components/withAuthenticator'
import { AuthContext } from '../auth/auth-context'

import { mainListItems, secondaryListItems } from './listItems'
import Chart from './Chart'
import Deposits from './Deposits'
import Orders from './Orders'

import {
  useTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'

const drawerWidth = 240

export const useStyles = makeStyles((theme: Theme = useTheme()) =>
  createStyles({
    root: {
      display: 'flex'
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    menuButtonHidden: {
      display: 'none'
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto'
    },
    appBarSpacer: {},
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
    },
    fixedHeight: {
      height: 240
    }
  })
)

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  const authContext = useContext(AuthContext)
  const [open, setOpen] = React.useState(true)
  const history = useHistory()

  useEffect(() => {
    document.title = 'RA2 Dashboard'
  }, [])

  const signOutHandler = () => {
    authContext
      .signOut()
      .then(data => {
        history.push('/')
      })
      .catch(err => {
        console.log('error sign out')
      })
  }

  let authLink = authContext.isAuthenticated() ? (
    <Button color='inherit' onClick={() => signOutHandler()}>
      Sign Out
    </Button>
  ) : null

  const classes = useStyles()

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}>
            <MenuIcon />
          </IconButton>
          <IconButton
            edge='start'
            className={classes.menuButton}
            onClick={() => history.push('/')}
            color='inherit'
            aria-label='home'>
            <HomeIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            Dashboard
          </Typography>
          {authLink}
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </main>
    </div>
  )
}

export default withAuthenticator(Dashboard)
