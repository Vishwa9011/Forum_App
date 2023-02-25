import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import RequiredRoute from "./RequiredRoute";
const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Signup = lazy(() => import("./Pages/Auth/Login/Signup"));
const SinglePostPage = lazy(() => import("./Pages/Post/SinglePostPage"));
const VerifyEmail = lazy(() => import("./Pages/Auth/verification/VerifyEmail"));
const SingleProfilePage = lazy(() => import("./Pages/Profile/SingleProfilePage"));
const SendVerificationEmail = lazy(() => import("./Pages/Auth/verification/SendVerificationEmail"));

function Application() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post/:id" element={<RequiredRoute><SinglePostPage /></RequiredRoute>} />
      <Route path="/user/:id" element={<RequiredRoute><SingleProfilePage /></RequiredRoute>} />
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
