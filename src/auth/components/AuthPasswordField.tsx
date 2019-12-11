import React, { useState } from 'react'

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@material-ui/core'

import { Visibility, VisibilityOff } from '@material-ui/icons'

import {
  useTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      margin: theme.spacing(2, 0, 0)
    }
  })
)

export interface AuthPasswordFieldProps {
  setPassword: (password: string) => void
}

const AuthPasswordField: React.SFC<AuthPasswordFieldProps> = ({
  setPassword
}) => {
  const classes = useStyles(useTheme())

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(true)
  const [hint, setHint] = useState<string>('')

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  let delay: any = null
  const validate = (password: string): any => {
    if (delay !== null) {
      clearTimeout(delay)
    }
    delay = setTimeout(() => {
      const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)
      setValid(isValid)
      setHint(password.length > 0 ? 'Invalid password.' : 'Enter password.')
      setPassword(isValid ? password : '')
      delay = null
    }, 200)
  }

  const hintString = valid ? null : (
    <FormHelperText error={!valid} id='standard-weight-helper-text'>
      {hint}
    </FormHelperText>
  )

  return (
    <FormControl
      required
      variant='outlined'
      fullWidth
      className={classes.textfield}>
      <InputLabel htmlFor='outlined-adornment-password' error={!valid}>
        Password
      </InputLabel>
      <OutlinedInput
        required
        error={!valid}
        id='outlined-adornment-password'
        type={showPassword ? 'text' : 'password'}
        onChange={e => validate(e.target.value)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={80}
      />
      <FormHelperText error={!valid} id='standard-weight-helper-text'>
        {hintString}
      </FormHelperText>
    </FormControl>
  )
}

export default AuthPasswordField
