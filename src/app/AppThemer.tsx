import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import NoSsr from '@material-ui/core/NoSsr'

const defaultTheme = {
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(',')
  }
}
const theme = createMuiTheme(defaultTheme)

export interface ThemerProps {
  children: any
}

const Themer: React.SFC<ThemerProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NoSsr>{children}</NoSsr>
    </ThemeProvider>
  )
}

export default Themer
