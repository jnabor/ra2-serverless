import React, { useState, useCallback, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { useHistory } from 'react-router-dom'

export interface AuthContextProps {
  user: any
  provider: string
  name: string
  email: string
  isAuthenticated(): boolean
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
  user: null,
  provider: '',
  name: '',
  email: '',
  isAuthenticated: () => false,
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
  const [user, setUser] = useState<any>(null)
  const [provider, setProvider] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const history = useHistory()

  useEffect(() => {
    console.log('checking for authenticated user...')
    getUserData()
  }, [])

  useEffect(() => {
    Hub.listen('auth', data => {
      const { payload } = data
      switch (payload.event) {
        case 'signIn':
          getUserData()
          history.push('/')
          break
        case 'signOut':
          setUser(null)
          setProvider('')
          localStorage.setItem('provider', '')
          setEmail('')
          setName('')
          history.push('/')
          break
      }
    })
  }, [])

  const getUserData = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        console.log('current', data)
        setUser(data)
        const email = data.email || data.attributes.email || ''
        const name = data.name || data.attributes.email || ''
        const provider = localStorage.getItem('provider') || ''

        console.log('email:', email)
        console.log('name:', name)
        console.log('provider:', provider)

        setEmail(email)
        setName(name)
        setProvider(provider)
      })
      .catch(err => {
        console.log('no current authenticated user')
      })
  }

  const isAuthenticated = (): boolean => user !== null

  const signUp = useCallback((userEmail: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await Auth.signUp({
          username: userEmail,
          password: password
        })
        console.log(user)
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
        const data = await Auth.signIn({
          username: userEmail,
          password: password
        })
        localStorage.setItem('provider', 'email')
        console.log(data)
        resolve(data)
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
        user: user,
        provider: provider,
        name: name,
        email: email,
        isAuthenticated: isAuthenticated,
        signUp: signUp,
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
