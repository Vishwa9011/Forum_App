import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login/Login'
import Signup from './Pages/Auth/Login/Signup'
import Verifypage from './Pages/Auth/verification/Verifypage'
import Home from './Pages/Home/Home'

function Application() {

     return (
          <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/messages' element={<></>} />
               <Route path='/notifications' element={<></>} />
               <Route path='/login' element={<Login />} />
               <Route path='/signup' element={<Signup />} />
               <Route path='/verifyemail' element={<Verifypage />} />
               <Route path='/profile' element={<></>} />
               <Route path='/profile/edit' element={<></>} />
          </Routes>
     )
}

export default Application