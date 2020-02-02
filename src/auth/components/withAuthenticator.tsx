import React, { useContext } from 'react'
import { AuthContext } from '../auth-context'
import AccessDenied from '../../common/AccessDenied'

export interface withAuthenticatorProps {}

const withAuthenticator = (
  WrappedComponent: React.ComponentType
): React.SFC<withAuthenticatorProps> => {
  return () => {
    const authContext = useContext(AuthContext)
    const page = authContext.isAuthenticated() ? (
      <WrappedComponent />
    ) : (
      <AccessDenied />
    )
    return <div>{page}</div>
  }
}

export default withAuthenticator
