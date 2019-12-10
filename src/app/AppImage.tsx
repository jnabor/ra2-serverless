import React from 'react'
import { Grid } from '@material-ui/core'

import {
  useTheme,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.grey[50],
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  })
)

export interface RandomImageProps {}

const RandomImage: React.SFC<RandomImageProps> = () => {
  const classes = useStyles(useTheme())
  return <Grid item xs={false} sm={4} md={7} className={classes.image} />
}

export default RandomImage
