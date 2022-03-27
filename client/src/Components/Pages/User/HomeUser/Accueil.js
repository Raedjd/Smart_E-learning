import React from "react";
import Info from "./Info";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

const Accueil = () => {
  return (
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
  );
};

export default Accueil;
