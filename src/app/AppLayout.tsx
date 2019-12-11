import React, { useEffect } from 'react'

import Themer from './AppThemer'
import Footer from './AppFooter'
import Header from './AppHeader'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import {
  useTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2)
    }
  })
)

export interface LayoutProps {
  title: string
  children: any
}

const Layout: React.SFC<LayoutProps> = ({ title, children }) => {
  const classes = useStyles(useTheme())

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <Themer>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Container className={classes.main} maxWidth='sm'>
          {children}
        </Container>
        <Footer />
      </div>
    </Themer>
  )
}

export default Layout
