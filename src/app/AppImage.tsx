import React from 'react'
import { Grid } from '@material-ui/core'

import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  })
)

export interface RandomImageProps {}

const RandomImage: React.SFC<RandomImageProps> = () => {
  const classes = useStyles()
  return <Grid item xs={false} sm={4} md={6} className={classes.image} />
}

export default RandomImage
