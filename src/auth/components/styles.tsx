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
    btn: {
      width: '100%',
      maxWidth: '260px',
      marginTop: theme.spacing(2)
    },
    btnFederated: {
      backgroundColor: 'white',
      color: theme.palette.grey[600]
    },
    btnElems: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: 'repeat(12, 2fr)'
    },
    btnIcon: {
      display: 'flex',
      gridColumnEnd: 'span 2'
    },
    btnLabel: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      gridColumnEnd: 'span 10',
      textTransform: 'none'
    },
    container: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: 'repeat(12, 2fr)'
    }
  })
)
