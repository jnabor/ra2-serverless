import React, { useState } from 'react'
import Auth from '@aws-amplify/auth'
import config from '../aws-exports'
Auth.configure(config)

export interface AuthContextProps {
  isAuth: boolean
  email: string
  signUp(username: string, password: string): Promise<any>
  confirmSignUp(code: string): Promise<any>
  signIn(username: string, password: string): Promise<any>
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuth: false,
  email: '',
  signUp: () => new Promise(reject => reject(0)),
  confirmSignUp: () => new Promise(reject => reject(0)),
  signIn: () => new Promise(reject => reject(0))
})

export interface AuthContextProviderProps {
  children: any
}

const AuthContextProvider: React.SFC<AuthContextProviderProps> = ({
  children
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const signUp = (email: string, password: string) => {
    setEmail(email)
    return new Promise((resolve, reject) => {
      Auth.signUp({ username: email, password: password })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'An internal error occurred.'
          reject(message)
        })
    })
  }

  const confirmSignUp = (code: string) => {
    return new Promise((resolve, reject) => {
      Auth.confirmSignUp(email, code)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          const message = err.message || 'An internal error occurred.'
          reject(message)
        })
    })
  }

  const signIn = (email: string, password: string) => {
    setEmail(email)
    return new Promise((resolve, reject) => {
      Auth.signIn({ username: email, password: password })
        .then(data => {
          setIsAuth(true)
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
        confirmSignUp: confirmSignUp,
        signIn: signIn
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
