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
    },
    google: {
      marginTop: theme.spacing(2),
      backgroundColor: 'white',
      fontWeight: 500,
      color: theme.palette.grey[600]
    },
    container: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: 'repeat(12, 2fr)'
    },
    fsignLogo: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gridColumnEnd: 'span 2'
    },
    fsignLabel: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      gridColumnEnd: 'span 10',
      textTransform: 'capitalize'
    }
  })
)
