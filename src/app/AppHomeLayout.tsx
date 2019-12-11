import React, { useEffect } from 'react'

import Themer from './AppThemer'
import Footer from './AppFooter'

import Container from '@material-ui/core/Container'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    main: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center'
    }
  })
)

export interface HomeLayoutProps {
  title: string
  children: any
}

const HomeLayout: React.SFC<HomeLayoutProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title
  })

  const classes = useStyles()
  return (
    <Themer>
      <div className={classes.root}>
        <Container className={classes.main}>{children}</Container>
        <Footer />
      </div>
    </Themer>
  )
}

export default HomeLayout
