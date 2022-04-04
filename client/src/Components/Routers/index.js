import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Pages/Header";
import SignUp from "../Pages/User/Auth/SignUp";
import SignIn from "../Pages/User/Auth/SignIn";
import ForgetPassword from "../Pages/User/Auth/ForgetPassword";
import ResetPassword from "../Pages/User/Auth/ResetPassword";
import VerifyEmail from "../Pages/User/Auth/VerifyEmail";
import Dashbord from "../Pages/User/Dashbord";
import ProfilStudent from "../Pages/User/ProfilUser/ProfilStudents/ProfilStudent";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";
import Accueil from "../Pages/User/HomeUser/Accueil";

const RRR = () => {
  return (
    <div className="routes">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/user/reset/:token" element={<ResetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />

          <Route path="/notfound" element={<NotFound />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/homeuser" element={<Accueil />} />
          <Route path="/profilstudent" element={<ProfilStudent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RRR;
