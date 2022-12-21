import React from 'react'
import { AuthContext } from '../../Context/AuthManager'

const Dashboard = (): JSX.Element => {
  const auth = React.useContext(AuthContext)
  return <div>{JSON.stringify(auth?.authDetails)}</div>
}

export default Dashboard
