import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from '../../../pages/Dashboard'
const Dashboard = (): JSX.Element => {
  return <Routes>
      <Route path={'/'} element={<DashboardPage/>} />
  </Routes>
}

export default Dashboard
