import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Login/Signup";
import SendVerificationEmail from "./Pages/Auth/verification/SendVerificationEmail";
import VerifyEmail from "./Pages/Auth/verification/VerifyEmail";
import Home from "./Pages/Home/Home";
import SinglePostPage from "./Pages/Post/SinglePostPage";
import Profile from "./Pages/Profile/Profile";
import RequiredRoute from "./RequiredRoute";

function Application() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post/:id" element={<RequiredRoute><SinglePostPage /></RequiredRoute>} />
      <Route path="/messages" element={<RequiredRoute><Home /></RequiredRoute>} />
      <Route path="/notifications" element={<RequiredRoute><Home /></RequiredRoute>} />
      <Route path="/profile" element={<RequiredRoute><Profile /></RequiredRoute>} />
      <Route path="/sendverifyemail" element={<RequiredRoute><SendVerificationEmail /></RequiredRoute>} />
      <Route path="/verifyemail" element={<RequiredRoute><VerifyEmail /></RequiredRoute>} />
      <Route path="/profile/edit" element={<RequiredRoute><></></RequiredRoute>} />
    </Routes>
  );
}

export default Application;
