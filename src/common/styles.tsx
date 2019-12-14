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
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })
)
