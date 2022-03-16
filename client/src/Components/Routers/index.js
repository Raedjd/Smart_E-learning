import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Pages/Header";
import Home from "../Pages/Home";
import SignUp from "../Pages/User/SignUp";
import SignIn from "../Pages/User/SignIn";
import ForgetPassword from "../Pages/User/ForgetPassword";
import ResetPassword from "../Pages/User/ResetPassword";
import VerifyEmail from "../Pages/User/VerifyEmail";
const index = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/user/reset/:token" element={<ResetPassword />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
