<<<<<<< HEAD
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
=======
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Login/Signup";
import SendVerificationEmail from "./Pages/Auth/verification/SendVerificationEmail";
import VerifyEmail from "./Pages/Auth/verification/VerifyEmail";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";

function Application() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/messages" element={<></>} />
      <Route path="/notifications" element={<></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sendverifyemail" element={<SendVerificationEmail />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/profile/edit" element={<></>} />
    </Routes>
  );
>>>>>>> 4c1834cab8f29bae74ea5f79e5ba6fa865b3b589
}

export default Application;
