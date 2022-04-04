import React from "react";
import Info from "./Info";
import Posts from "./Posts";
import Suggestions from "./Suggestions";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import cookie from "js-cookie";
const Accueil = () => {
  const userData = useSelector((state) => state.userReducer);
  const userId = cookie.get("id");
  return userId ? (
    <section
      class="section instructor-courses"
      style={{ backgroundColor: "#ebebf2" }}
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-3 ">
            <Info />
          </div>
          <div class="col-lg-6 ">
            <Posts />
          </div>
          <div class="col-lg-3 ">
            <Suggestions />
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Navigate to="/notfound" />
  );
};

export default Accueil;
