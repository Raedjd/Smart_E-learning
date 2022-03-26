import React from "react";
import Info from "./Info";
import Posts from "./Posts";

const Accueil = () => {
  return (
    <section
      class="section instructor-courses"
      style={{ backgroundColor: "#ebebf2" }}
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 ">
            <Info />
          </div>
          <Posts />
        </div>
      </div>
    </section>
  );
};

export default Accueil;
