import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages'
import Dashboard from './protected/Dashboard'
import AuthManager from '../Context/AuthManager'

const MainRouter = (): JSX.Element => {
  return <BrowserRouter>
        <AuthManager>
            <Routes>
                <Route path={'/*'} element={<HomePage/>} />
                <Route path={'/app/*'} element={<Dashboard/>}/>
            </Routes>
        </AuthManager>
    </BrowserRouter>
}

export default MainRouter
