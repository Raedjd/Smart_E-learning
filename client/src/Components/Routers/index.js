import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Pages/Header";
import SignUp from "../Pages/User/Auth/SignUp";
import SignIn from "../Pages/User/Auth/SignIn";
import ForgetPassword from "../Pages/User/Auth/ForgetPassword";
import ResetPassword from "../Pages/User/Auth/ResetPassword";
import VerifyEmail from "../Pages/User/Auth/VerifyEmail";
import ProfilStudent from "../Pages/User/ProfilUser/ProfilStudents/ProfilStudent";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Categoryy/pages/home/Home";
import Accueil from "../Pages/User/HomeUser/Accueil";
import AllQuizes from "../Pages/Quiz/AllQuizes";
import AddQuiz from "../Pages/Quiz/AddQuiz";
import QuizDetail from "../Pages/Quiz/QuizDetail";
import Login from "../Pages/Categoryy/pages/login/Login";
import List from "../Pages/Categoryy/pages/list/List";
import Single from "../Pages/Categoryy/pages/single/Single";
import New from "../Pages/Categoryy/pages/new/New";
import { productInputs, userInputs } from "../Pages/Categoryy/formSource";
import "../Pages/Categoryy/style/dark.scss";
import Category from "../Pages/Categoryy/pages/categories/Category";
import Subcategory from "../Pages/Categoryy/pages/subcategories/Subcategory";
import BadgePage from "../Pages/Categoryy/pages/badge/BadgePage";
import SingleBadge from "../Pages/Categoryy/pages/singleBadge/SingleBadge";
import CreatCategory from "../Pages/ForumUser/Category/CreatCategory";
import BrowseCategory from "../Pages/ForumUser/Category/BrowseCategory";
import ShowCategory from "../Pages/ForumUser/Category/ShowCategory";
import ShowForum from "../Pages/ForumUser/Forum/ShowForum";
import CreateForum from "../Pages/ForumUser/Forum/CreateForum";
import BrowseForum from "../Pages/ForumUser/Forum/BrowseForum";
import ShowTopic from "../Pages/ForumUser/Topic/ShowTopic";
import CreateTopic from "../Pages/ForumUser/Topic/CreateTopic";
import SearchCourse from "../Pages/SearchCourse";
import HomeP from "../Pages/HomeP";
import Courses from "../Pages/Courses/Courses/Courses";
import HomeCourse from "../Pages/Courses/HomeCourse/HomeCourse";
import { useContext } from "react";
import cookie from "js-cookie";
import { useSelector } from "react-redux";
import Messenger from "../Pages/Messenger/Messenger";
import PassQuiz from "../Pages/Quiz/PassQuiz";
import VideoChat from "../Pages/VideoChat/VideoChat";
import TopicManag from "../Pages/Categoryy/pages/Topics/TopicManag";

const RRR = () => {
  const userData = useSelector((state) => state.userReducer);
  const userId = cookie.get("id");
  return (
    <div className="routes">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeP />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/user/reset/:token" element={<ResetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />

          <Route path="/notfound" element={<NotFound />} />
          <Route path="/courses" element={<HomeCourse />} />

          <Route path="/homeuser" element={<Accueil />} />
          <Route path="/profilstudent" element={<ProfilStudent />}></Route>
          <Route path="/searchcourse" element={<SearchCourse />}></Route>

          <Route path="/all-quizes" element={<AllQuizes />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/pass-quiz/:id" element={<PassQuiz />} />
          <Route path="/videoChat" element={<VideoChat />} />

          <Route path="/Category/create" element={<CreatCategory />} />
          <Route path="/Category/:id" element={<BrowseCategory />} />
          <Route path="/category/new/:id" element={<ShowCategory />} />
          <Route path="/forum/new/:id" element={<ShowForum />} />

          <Route path="/forum/create/:id" element={<CreateForum />} />
          <Route path="/forum" element={<BrowseForum />} />
          <Route path="/topic/new/:id" element={<ShowTopic />} />
          <Route path="/topic/create/:id" element={<CreateTopic />} />
          <Route path="/messenger">
            <Route
              exact
              path="/messenger"
              element={!userId ? <SignIn /> : <Messenger />}
            />
          </Route>

          <Route path="/dash">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="categories">
              <Route index element={<Category />} />
            </Route>
            <Route path="subcategories">
              <Route index element={<Subcategory />} />
            </Route>
            <Route path="badges">
              <Route index element={<BadgePage />} />
              <Route path=":badgeId" element={<SingleBadge />} />
            </Route>
            <Route path="topics">
              <Route index element={<TopicManag />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RRR;
