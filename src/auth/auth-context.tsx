import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import config from '../aws-exports'
Auth.configure(config)

export interface AuthContextProps {
  isAuth: boolean
  email: string
  user: any
  signUp(username: string, password: string): Promise<any>
  confirmSignUp(code: string): Promise<any>
  signIn(username: string, password: string): Promise<any>
  signOut(): Promise<any>
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuth: false,
  email: '',
  user: {},
  signUp: () => new Promise(reject => reject(0)),
  confirmSignUp: () => new Promise(reject => reject(0)),
  signIn: () => new Promise(reject => reject(0)),
  signOut: () => new Promise(reject => reject(0))
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

  useEffect(() => {
    console.log('Checking auth')
  })

  const signUp = (email: string, password: string) => {
    setEmail(email)
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.signUp({
          username: email,
          password: password
        })
        console.log(user)
        setUser(user)
        resolve(user)
      } catch (err) {
        console.log(err)
        let message: string = 'An internal error occurred.'
        switch (err.code) {
          case 'UserNotConfirmedException':
          case 'PasswordResetRequiredException':
          case 'NotAuthorizedException':
          case 'UserNotFoundException':
            message = err.message
            break
          default:
            console.log(err)
            break
        }
        reject(message)
      }
    })
  }

  const confirmSignUp = (code: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.confirmSignUp(email, code)
        resolve(user)
      } catch (err) {
        const message = err.message || 'An internal error occurred.'
        reject(message)
      }
    })
  }

  const signIn = (email: string, password: string) => {
    setEmail(email)
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.signIn({
          username: email,
          password: password
        })
        setIsAuth(true)
        resolve(user)
      } catch (err) {
        const message = err.message || 'An internal error occurred.'
        reject(message)
      }
    })
  }

  const signOut = () => {
    setEmail(email)
    return new Promise((resolve, reject) => {
      Auth.signOut()
        .then(data => {
          setIsAuth(false)
          console.log('auth')
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'An internal error occurred.'
          reject(message)
        })
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        email: email,
        signUp: signUp,
        user: user,
        confirmSignUp: confirmSignUp,
        signIn: signIn,
        signOut: signOut
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
