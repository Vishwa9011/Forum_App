import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import User from './Pages/Users/User'

function AdminRoutes() {
     return (
          <>
               <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/users' element={<User />} />
               </Routes>
               <Outlet />
          </>
     )
}

export default AdminRoutes