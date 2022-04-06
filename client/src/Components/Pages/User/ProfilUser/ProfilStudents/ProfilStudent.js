import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import cookie from "js-cookie";

import MyProfil from "./MyProfil";
import Settings from "./Settings";
import BecomeTeacher from "./BecomeTeacher";
import AllQuiz from "../../../Quiz/AllQuizes"
import TeacherQuiz from "../../../Quiz/TeacherQuiz"


const ProfilStudent = () => {
  const userData = useSelector((state) => state.userReducer);
  const userId = cookie.get("id");

  console.log(userData.role);
  console.log(userId);
  return userId ? (
    <div className="profilStudent">
      <div>
        {" "}
        <section
          class="section students-info"
          style={{ backgroundColor: "#ebebf2" }}
        >
          <div class="container">
            <div class="students-info-intro">
              <div class="students-info-intro__profile">
                <div>
                  <div class="students-info-intro-start">
                    <div class="image">
                      <img src={userData.avatar} />
                    </div>
                    <div class="text">
                      <h5>{userData.firstName + " " + userData.lastName}</h5>
                      <p>{userData.role}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="students-info-intro-end">
                    <div class="enrolled-courses">
                      <div class="enrolled-courses-icon">
                        <svg
                          width="28"
                          height="26"
                          viewBox="0 0 28 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1.625H8.8C10.1791 1.625 11.5018 2.15764 12.477 3.10574C13.4521 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 13.5891 22.405 12.8577 21.6939C12.1263 20.9828 11.1343 20.5833 10.1 20.5833H1V1.625Z"
                            stroke="#1089FF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M27 1.625H19.2C17.8209 1.625 16.4982 2.15764 15.523 3.10574C14.5479 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 14.4109 22.405 15.1423 21.6939C15.8737 20.9828 16.8657 20.5833 17.9 20.5833H27V1.625Z"
                            stroke="#1089FF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div class="enrolled-courses-text">
                        <h6 class="font-title--xs">24</h6>
                        <p class="fs-6 mt-1">Enrolled Courses</p>
                      </div>
                    </div>
                    <div class="completed-courses">
                      <div class="completed-courses-icon">
                        <svg
                          width="22"
                          height="26"
                          viewBox="0 0 22 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.1716 3.95235C19.715 4.14258 20.078 4.65484 20.078 5.23051V13.6518C20.078 16.0054 19.2226 18.2522 17.7119 19.9929C16.9522 20.8694 15.9911 21.552 14.9703 22.1041L10.5465 24.4938L6.11516 22.1028C5.09312 21.5508 4.13077 20.8694 3.36983 19.9916C1.85791 18.2509 1 16.0029 1 13.6468V5.23051C1 4.65484 1.36306 4.14258 1.90641 3.95235L10.0902 1.07647C10.3811 0.974511 10.6982 0.974511 10.9879 1.07647L19.1716 3.95235Z"
                            stroke="#00AF91"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.30688 12.4002L9.65931 14.7538L14.5059 9.90723"
                            stroke="#00AF91"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div class="completed-courses-text">
                        <h5 class="font-title--xs">19</h5>
                        <p class="fs-6 mt-1">Completed Courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <nav class="students-info-intro__nav">
                <div class="nav" id="nav-tab" role="tablist">
                  <button
                    class="nav-link active"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="true"
                  >
                    My Profile
                  </button>

                  <button
                    class="nav-link"
                    id="nav-coursesall-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-coursesall"
                    type="button"
                    role="tab"
                    aria-controls="nav-coursesall"
                    aria-selected="false"
                  >
                    All Courses
                  </button>

                  <button
                    class="nav-link"
                    id="nav-activecourses-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-activecourses"
                    type="button"
                    role="tab"
                    aria-controls="nav-activecourses"
                    aria-selected="false"
                  >
                    Active Courses
                  </button>

                  <button hidden={userData.role==="student"}
                    class="nav-link"
                    id="nav-quiz-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-quiz"
                    type="button"
                    role="tab"
                    aria-controls="nav-quiz"
                    aria-selected="false"
                  >
                      All quiz
                  </button>

                  <button
                    class="nav-link"
                    id="nav-purchase-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-purchase"
                    type="button"
                    role="tab"
                    aria-controls="nav-purchase"
                    aria-selected="false"
                    hidden={userData.role === "teacher"}
                  >
                    Become An Instructor
                  </button>

                  <button
                    class="nav-link"
                    id="nav-setting-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-setting"
                    type="button"
                    role="tab"
                    aria-controls="nav-setting"
                    aria-selected="false"
                  >
                    Setting
                  </button>
                </div>
              </nav>
            </div>

            <div class="row students-info-intro d-none">
              <div class="col-lg-6">
                <div class="students-info-intro-start">
                  <div class="image">
                    <img src="dist/images/user/user-img-01.jpg" alt="Student" />
                  </div>
                  <div class="text">
                    <h5>Phillip Bergson</h5>
                    <p>UI/UX Designer</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="students-info-intro-end">
                  <div class="enrolled-courses">
                    <div class="enrolled-courses-icon">
                      <svg
                        width="28"
                        height="26"
                        viewBox="0 0 28 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.625H8.8C10.1791 1.625 11.5018 2.15764 12.477 3.10574C13.4521 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 13.5891 22.405 12.8577 21.6939C12.1263 20.9828 11.1343 20.5833 10.1 20.5833H1V1.625Z"
                          stroke="#1089FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M27 1.625H19.2C17.8209 1.625 16.4982 2.15764 15.523 3.10574C14.5479 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 14.4109 22.405 15.1423 21.6939C15.8737 20.9828 16.8657 20.5833 17.9 20.5833H27V1.625Z"
                          stroke="#1089FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="enrolled-courses-text">
                      <h6 class="font-title--xs">24</h6>
                      <p class="fs-6 mt-1">Enrolled Courses</p>
                    </div>
                  </div>
                  <div class="completed-courses">
                    <div class="completed-courses-icon">
                      <svg
                        width="22"
                        height="26"
                        viewBox="0 0 22 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.1716 3.95235C19.715 4.14258 20.078 4.65484 20.078 5.23051V13.6518C20.078 16.0054 19.2226 18.2522 17.7119 19.9929C16.9522 20.8694 15.9911 21.552 14.9703 22.1041L10.5465 24.4938L6.11516 22.1028C5.09312 21.5508 4.13077 20.8694 3.36983 19.9916C1.85791 18.2509 1 16.0029 1 13.6468V5.23051C1 4.65484 1.36306 4.14258 1.90641 3.95235L10.0902 1.07647C10.3811 0.974511 10.6982 0.974511 10.9879 1.07647L19.1716 3.95235Z"
                          stroke="#00AF91"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.30688 12.4002L9.65931 14.7538L14.5059 9.90723"
                          stroke="#00AF91"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="completed-courses-text">
                      <h5 class="font-title--xs">19</h5>
                      <p class="fs-6 mt-1">Completed Courses</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <nav>
                  <div class="nav" id="nav-tab" role="tablist">
                    <button
                      class="nav-link active"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="true"
                    >
                      My Profile
                    </button>

                    <button
                      class="nav-link"
                      id="nav-coursesall-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-coursesall"
                      type="button"
                      role="tab"
                      aria-controls="nav-coursesall"
                      aria-selected="false"
                    >
                      All Courses
                    </button>

                    <button
                      class="nav-link"
                      id="nav-activecourses-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-activecourses"
                      type="button"
                      role="tab"
                      aria-controls="nav-activecourses"
                      aria-selected="false"
                    >
                      Active Courses
                    </button>

                    <button
                      class="nav-link"
                      id="nav-quiz-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-quiz"
                      type="button"
                      role="tab"
                      aria-controls="nav-quiz"
                      aria-selected="false"
                    >
                      all quiz
                    </button>

                    <button
                      class="nav-link"
                      id="nav-purchase-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-purchase"
                      type="button"
                      role="tab"
                      aria-controls="nav-purchase"
                      aria-selected="false"
                    >
                      Become An Instructor
                    </button>

                    <button
                      class="nav-link"
                      id="nav-setting-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-setting"
                      type="button"
                      role="tab"
                      aria-controls="nav-setting"
                      aria-selected="false"
                    >
                      Setting
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div class="students-info-main">
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"  >
                  <MyProfil />
                </div>

                <div class="tab-pane fade" id="nav-quiz" role="tabpanel" aria-labelledby="nav-quiz-tab">
                  <TeacherQuiz />
                </div>
                {/*----------------------------------------------------------------------*/}
                <div
                  class="tab-pane fade"
                  id="nav-purchase"
                  role="tabpanel"
                  aria-labelledby="nav-purchase-tab"
                >
                  <BecomeTeacher />
                </div>

                {/*----------------------------------------------------------------------*/}
                <div
                  class="tab-pane fade"
                  id="nav-setting"
                  role="tabpanel"
                  aria-labelledby="nav-setting-tab"
                >
                  <Settings />
                </div>
                {/*----------------------------------------------------------------------*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <Navigate to="/notfound" />
  );
};

export default ProfilStudent;
