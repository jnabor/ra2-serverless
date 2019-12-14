import React, { useState, useCallback } from 'react'
import { Auth } from 'aws-amplify'
import config from '../aws-exports'
Auth.configure(config)

export interface AuthContextProps {
  isAuth: boolean
  email: string
  user: any
  signUp(username: string, password: string): Promise<any>
  confirmSignUp(userEmail: string, code: string): Promise<any>
  resendSignUp(userEmail: string): Promise<any>
  signIn(username: string, password: string): Promise<any>
  signOut(): Promise<any>
  resetPassword(userEmail: string): Promise<any>
  confirmResetPassword(
    userEmail: string,
    newPassword: string,
    code: string
  ): Promise<any>
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuth: false,
  email: '',
  user: {},
  signUp: () => new Promise(reject => reject(0)),
  confirmSignUp: () => new Promise(reject => reject(0)),
  resendSignUp: () => new Promise(reject => reject(0)),
  signIn: () => new Promise(reject => reject(0)),
  signOut: () => new Promise(reject => reject(0)),
  resetPassword: () => new Promise(reject => reject(0)),
  confirmResetPassword: () => new Promise(reject => reject(0))
})

export interface AuthContextProviderProps {
  children: any
}

const AuthContextProvider: React.SFC<AuthContextProviderProps> = ({
  children
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [user, setUser] = useState<any>({})

  const signUp = useCallback((userEmail: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.signUp({
          username: userEmail,
          password: password
        })
        console.log(user)
        setUser(user)
        setEmail(userEmail)
        resolve(user)
      } catch (err) {
        console.log(err)
        let message: string = 'An internal error occurred.'
        switch (err.code) {
          case 'UserNotConfirmedException':
          case 'PasswordResetRequiredException':
          case 'NotAuthorizedException':
          case 'UserNotFoundException':
          case 'UsernameExistsException':
            message = err.message
            break
          default:
            console.log(err)
            break
        }
        reject(message)
      }
    })
  }, [])

  const confirmSignUp = useCallback((userEmail: string, code: string) => {
    console.log('confirm sign up', userEmail, code)
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.confirmSignUp(userEmail, code)
        resolve(user)
      } catch (err) {
        const message = err.message || 'An internal error occurred.'
        reject(message)
      }
    })
  }, [])

  const signIn = useCallback((userEmail: string, password: string) => {
    console.log('sign in', userEmail, password)
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.signIn({
          username: userEmail,
          password: password
        })
        setEmail(userEmail)
        setIsAuth(true)
        resolve(user)
      } catch (err) {
        const message = err.message || 'An internal error occurred.'
        reject(message)
      }
    })
  }, [])

  const resendSignUp = useCallback((userEmail: string) => {
    console.log('resend sign up', userEmail)
    return new Promise((resolve, reject) => {
      Auth.resendSignUp(userEmail)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'An internal error occurred.'
          reject(message)
        })
    })
  }, [])

  const signOut = useCallback(() => {
    console.log('sign out')
    return new Promise((resolve, reject) => {
      Auth.signOut()
        .then(data => {
          setIsAuth(false)
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'An internal error occurred.'
          reject(message)
        })
    })
  }, [])

  const resetPassword = useCallback((userEmail: string) => {
    console.log('reset password', userEmail)
    return new Promise((resolve, reject) => {
      Auth.forgotPassword(userEmail)
        .then(data => {
          setEmail(userEmail)
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'An internal error occurred.'
          reject(message)
        })
    })
  }, [])

  const confirmResetPassword = useCallback(
    (userEmail: string, newPassword: string, code: string) => {
      console.log('confirm reset password', userEmail, code, newPassword)
      return new Promise((resolve, reject) => {
        Auth.forgotPasswordSubmit(userEmail, code, newPassword)
          .then(data => resolve(data))
          .catch(err => {
            const message = err.message || 'An internal error occurred.'
            reject(message)
          })
      })
    },
    []
  )

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        email: email,
        signUp: signUp,
        user: user,
        confirmSignUp: confirmSignUp,
        resendSignUp: resendSignUp,
        signIn: signIn,
        signOut: signOut,
        resetPassword: resetPassword,
        confirmResetPassword: confirmResetPassword
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
