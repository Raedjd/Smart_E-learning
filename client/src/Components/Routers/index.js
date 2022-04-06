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
import AllQuizes from "../Pages/Quiz/AllQuizes";
import AddQuiz from "../Pages/Quiz/AddQuiz";
import QuizDetail from "../Pages/Quiz/QuizDetail";
import CreatCategory from "../Pages/ForumUser/Category/CreatCategory";
import BrowseCategory from "../Pages/ForumUser/Category/BrowseCategory"
import ShowCategory from "../Pages/ForumUser/Category/ShowCategory";
import ShowForum from "../Pages/ForumUser/Forum/ShowForum";
import CreateForum from "../Pages/ForumUser/Forum/CreateForum"
import BrowseForum from "../Pages/ForumUser/Forum/BrowseForum";
import ShowTopic from "../Pages/ForumUser/Topic/ShowTopic";
import CreateTopic from "../Pages/ForumUser/Topic/CreateTopic";

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

          <Route path="/all-quizes" element={<AllQuizes />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />

          <Route path="/Category/create" element={<CreatCategory/> } />
          <Route path="/Category/:id" element={<BrowseCategory/> } />
          <Route path="/category/new/:id" element={<ShowCategory />} />
          <Route path="/forum/new/:quizId" element={<ShowForum />} />

          <Route path="/forum/create/:id" element={<CreateForum />} />
          <Route path="/forum" element={<BrowseForum/>} />
          <Route path="/topic/new/:id" element={<ShowTopic/>} />
          <Route path="/topic/create/:id" element={<CreateTopic/>} />


         
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RRR;
