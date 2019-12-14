import {
  useTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme = useTheme()) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    textfield: {
      margin: theme.spacing(2, 0, 0)
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    links: {
      padding: '0px 5px'
    }
  })
)
