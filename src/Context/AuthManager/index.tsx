import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PUBLIC_PATHS } from '../../MainRouter/Paths'
import { AuthResponse } from '../../generated'

interface AuthContextType {
  authDetails?: AuthResponse
  setAuthDetails: (details: AuthResponse) => void
}
export const AuthContext = React.createContext<AuthContextType | null>(null)
interface AuthManagerProps {
  children: JSX.Element
}
const AuthManager = ({ children }: AuthManagerProps): JSX.Element => {
  const [authDetails, setAuthDetails] = React.useState<AuthResponse | undefined>(undefined)
  const changeAuthDetails = (auth: AuthResponse): void => {
    setAuthDetails(auth)
  }

  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    if (authDetails === undefined) {
      const localAuthDetailsString = localStorage.getItem('authDetails')
      if (localAuthDetailsString != null) {
        const localAuthDetails = JSON.parse(localAuthDetailsString) as AuthResponse
        return setAuthDetails(localAuthDetails)
      }
      if (PUBLIC_PATHS.find(path => path === location.pathname) == null) {
        return navigate(`/?redirect=${location.pathname}`)
      }
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{ authDetails, setAuthDetails: changeAuthDetails }}
    >{children}
    </AuthContext.Provider>
  )
}

export default AuthManager
