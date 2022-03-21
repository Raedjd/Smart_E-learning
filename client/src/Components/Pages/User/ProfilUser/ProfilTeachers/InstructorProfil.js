import React from "react";
import InstructorInfo from "./InstructorInfo";

const InstructorProfil = () => {
  return (
    <section
      class="section instructor-courses"
      style={{ backgroundColor: "#ebebf2" }}
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <InstructorInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorProfil;
