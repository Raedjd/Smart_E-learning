import React, { useMemo, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import countryList from "react-select-country-list";
const ProfilStudent = () => {
  const navigate = useNavigate();
  const userId = cookie.get("id");
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [whatDoUdo, setWhatDoUdo] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (nationality) => {
    setNationality(nationality);
  };
  //console.log(nationality.label);

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        removeCookie("jwt");
        removeCookie("id");
      })
      .catch((err) => console.log(err));
    navigate("/home");
  };
  const handleDisable = async (e) => {
    e.preventDefault();
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/disable`,
      withCredentials: true,
    })
      .then((response) => {
        removeCookie("jwt");
        removeCookie("id");
      })
      .catch((err) => console.log(err));
    navigate("/home");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/delete-user`,
      withCredentials: true,
    })
      .then((response) => {
        removeCookie("jwt");
        removeCookie("id");
      })
      .catch((err) => console.log(err));
    navigate("/home");
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const oldPasswordError = document.querySelector(".refusedold");
    const newPasswordError = document.querySelector(".refusednew");
    const confnewPasswordError = document.querySelector(".refusedconf");
    const successChangePassword = document.querySelector(".successed");

    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/changepass`,
      withCredentials: true,
      data: {
        old_password: old_password,
        lastName: new_password,
        confirm_password: confirm_password,
      },
    })
      .then((response) => {
        console.log(response);
        successChangePassword.innerHTML = response.data.msg.successed;

        oldPasswordError.innerHTML = response.data.msg.old_password;
        newPasswordError.innerHTML = response.data.msg.new_password;
        confnewPasswordError.innerHTML = response.data.msg.confirm_password;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/modify-user`,
      withCredentials: true,
      data: {
        firstName: firstName,
        lastName: lastName,

        gender: gender,
        birthdate: birthdate,
        whatDoUdo: whatDoUdo,
        phone: phone,
        nationality: nationality.label,
        aboutMe: aboutMe,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                      <img
                        src="dist/images/user/user-img-01.jpg"
                        alt="Student"
                      />
                    </div>
                    <div class="text">
                      <h5>Phillip Bergson</h5>
                      <p>UI/UX Designer</p>
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

                  <button
                    class="nav-link"
                    id="nav-completedcourses-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-completedcourses"
                    type="button"
                    role="tab"
                    aria-controls="nav-completedcourses"
                    aria-selected="false"
                  >
                    Completed Courses
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

                  <button
                    class="nav-link"
                    id="nav-logout-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-logout"
                    type="button"
                    role="tab"
                    aria-controls="nav-logout-tab"
                    aria-selected="false"
                    onClick={handleLogout}
                  >
                    Logout
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
                      id="nav-completedcourses-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-completedcourses"
                      type="button"
                      role="tab"
                      aria-controls="nav-completedcourses"
                      aria-selected="false"
                    >
                      Completed Courses
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

                    <button
                      class="nav-link"
                      id="nav-logout-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-logout"
                      type="button"
                      role="tab"
                      aria-controls="nav-logout-tab"
                      aria-selected="false"
                    >
                      Logout
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div class="students-info-main">
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div class="tab-content__profile">
                    <div class="tab-content__profile-content">
                      <div class="about-student">
                        <h6 class="font-title--card">About Me</h6>
                        <p class="font-para--md">
                          Hello my name is Tanya. I am a designer. My personal
                          qualities are responsibility, as I bring everything to
                          its logical conclusion, determination, never rest on
                          my laurels, always open to change and something new.
                          In my arsenal there are such programs as Adobe
                          Photoshop, Illustrator, InDesign, Figma, also some
                          Maya, 3ds Max ZBrush, Substance Painter, Marvelous
                          Designer. Lorem ipsum dolor sit amet consectetur,
                          adipisicing elit. Animi, voluptatum.
                        </p>
                      </div>
                    </div>
                    <div class="tab-content__profile-content">
                      <div class="info-student">
                        <h6 class="font-title--card">Philip Information</h6>
                        <dl class="row my-0 info-student-topic">
                          <dt class="col-sm-4">
                            <span>Name</span>
                          </dt>
                          <dd class="col-sm-8">
                            <p>Phillip Bergson</p>
                          </dd>
                        </dl>
                        <dl class="row my-0 info-student-topic">
                          <dt class="col-sm-4">
                            <span>E-mail</span>
                          </dt>
                          <dd class="col-sm-8">
                            <p>phillip.bergson@gmail.com</p>
                          </dd>
                        </dl>
                        <dl class="row my-0 info-student-topic">
                          <dt class="col-sm-4">
                            <span>What do you do</span>
                          </dt>
                          <dd class="col-sm-8">
                            <p>UI/UX Designer</p>
                          </dd>
                        </dl>
                        <dl class="row my-0 info-student-topic">
                          <dt class="col-sm-4">
                            <span>Phone Number</span>
                          </dt>
                          <dd class="col-sm-8">
                            <p>+8801236 968966</p>
                          </dd>
                        </dl>
                        <dl class="row my-0 info-student-topic">
                          <dt class="col-sm-4">
                            <span>Nationality</span>
                          </dt>
                          <dd class="col-sm-8">
                            <p>Bangladesh</p>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/*----------------------------------------------------------------------*/}
                <div
                  class="tab-pane fade"
                  id="nav-purchase"
                  role="tabpanel"
                  aria-labelledby="nav-purchase-tab"
                >
                  <div class="col-lg ">
                    <div class="main-become-instructor-item me-12">
                      <div class="main-text">
                        <h6 class="font-title--sm">Become an Instructor</h6>

                        <div>
                          <div class="students-info-form">
                            <form action="#">
                              <div class="col-12">
                                <div class="my-5 js-school">
                                  <label
                                    class="d-block mb-2 required-asterisked"
                                    id="schools-label"
                                  >
                                    What is the name of your school?
                                  </label>
                                  <p class="f6 color-fg-muted">
                                    <strong class="color-fg-default">
                                      Note:
                                    </strong>{" "}
                                    If your school is not listed, then enter the
                                    full school name and continue.
                                  </p>

                                  <input
                                    type="text"
                                    id="wdu"
                                    class="form-control"
                                    placeholder="School name ... "
                                  />
                                </div>
                                <div class="my-5 js-school">
                                  <label
                                    class="d-block mb-2 required-asterisked"
                                    id="schools-label"
                                  >
                                    Give us some documents related to your
                                    profession!
                                  </label>
                                  <p class="f6 color-fg-muted">
                                    (diploma, work certificate...)
                                  </p>
                                  <input
                                    type="file"
                                    id="wdu"
                                    class="form-control"
                                    placeholder="School name ... "
                                  />
                                </div>
                                <div class="row g-3">
                                  <label
                                    class="d-block mb-2 required-asterisked"
                                    id="schools-label"
                                  >
                                    How do you plan to use Studently?
                                  </label>
                                  <div class="form-floating">
                                    <textarea
                                      class="form-control"
                                      placeholder="Leave a comment here"
                                      id="floatingTextarea2"
                                      style={{ height: "100px" }}
                                    ></textarea>
                                    <label for="floatingTextarea2">
                                      Enter here...
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <input
                                class="btn btn-outline-primary"
                                value="Apply as Instructor"
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      class="text-center text-primary font-weight-bold"
                      style={{ color: "#42414b !important" }}
                    >
                      Yay! Wishing you a successful business. &#128525;
                      &#x1F499;
                    </p>
                  </div>
                </div>

                {/*----------------------------------------------------------------------*/}
                <div
                  class="tab-pane fade"
                  id="nav-setting"
                  role="tabpanel"
                  aria-labelledby="nav-setting-tab"
                >
                  <div class="row">
                    <div class="col-lg-9 order-2 order-lg-0">
                      <div class="white-bg">
                        <div class="students-info-form">
                          <h6 class="font-title--card">Your Information</h6>
                          <form action="#">
                            <div class="row g-3">
                              <div class="col-lg-6">
                                <label for="fname">First Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Enter here..."
                                  id="fname"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  value={firstName}
                                />
                              </div>
                              <div class="col-lg-6">
                                <label for="lname">Last Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Enter here..."
                                  id="lname"
                                  onChange={(e) => setLastName(e.target.value)}
                                  value={lastName}
                                />
                              </div>
                            </div>

                            <div class="row">
                              <div class="col-12">
                                <label for="gender">Gender</label>
                                <select
                                  class="form-control"
                                  aria-label="Default select example"
                                  onChange={(e) => setGender(e.target.value)}
                                  value={gender}
                                >
                                  <option value="Men">Men</option>
                                  <option value="Women">Women</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <label for="birthdate">Birthdate</label>
                                <input
                                  type="date"
                                  id="birthdate"
                                  class="form-control"
                                  onChange={(e) => setBirthdate(e.target.value)}
                                  value={birthdate}
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <label for="wdu">What Do You Do</label>
                                <input
                                  type="text"
                                  id="wdu"
                                  class="form-control"
                                  placeholder="UI/UX Designer"
                                  onChange={(e) => setWhatDoUdo(e.target.value)}
                                  value={whatDoUdo}
                                />
                              </div>
                            </div>
                            <div class="row g-3">
                              <div class="col-lg-6">
                                <label for="pnumber">Phone Number</label>
                                <PhoneInput
                                  class="form-control"
                                  placeholder="Enter phone number"
                                  value={phone}
                                  onChange={setPhone}
                                  style={{ color: "blue" }}
                                />
                              </div>
                              <div class="col-lg-6">
                                <label for="nationality">Nationality</label>
                                <Select
                                  options={options}
                                  value={nationality}
                                  onChange={changeHandler}
                                />
                              </div>
                              <div class="form-floating">
                                <textarea
                                  class="form-control"
                                  placeholder="Leave a comment here"
                                  id="floatingTextarea2"
                                  style={{ height: "100px" }}
                                  onChange={(e) => setAboutMe(e.target.value)}
                                  value={aboutMe}
                                ></textarea>
                                <label for="floatingTextarea2">About me</label>
                              </div>
                            </div>

                            <div class="d-flex justify-content-lg-end justify-content-center mt-2">
                              <button
                                class="btn btn-outline-primary"
                                type="submit"
                                onClick={handleUpdateInfo}
                                disabled={
                                  !firstName ||
                                  !lastName ||
                                  !gender ||
                                  !birthdate ||
                                  !phone ||
                                  !nationality ||
                                  !aboutMe
                                }
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/*----------------------------------------------------------------------*/}
                      <div class="white-bg mt-4">
                        <div class="students-info-form">
                          <h6 class="font-title--card">Change Password</h6>
                          <form action="#" onSubmit={handleChangePassword}>
                            <div class="row">
                              <div class="col-12">
                                <label for="cpass">Current Password</label>
                                <div class="input-with-icon">
                                  <input
                                    class="form-control"
                                    type="password"
                                    placeholder="Enter Password"
                                    id="old_password"
                                    onChange={(e) =>
                                      setOld_password(e.target.value)
                                    }
                                    value={old_password}
                                  />
                                  <div className="refusedold text-danger"></div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <label for="npass">New Password</label>
                                <div class="input-with-icon">
                                  <input
                                    class="form-control"
                                    type="password"
                                    placeholder="Enter Password"
                                    id="new_password"
                                    onChange={(e) =>
                                      setNew_password(e.target.value)
                                    }
                                    value={new_password}
                                  />
                                  <div className="refusednew text-danger"></div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <label for="cnpass">Confirm New Password</label>
                                <div class="input-with-icon">
                                  <input
                                    class="form-control"
                                    type="password"
                                    placeholder="Enter Password"
                                    id="confirm_password"
                                    onChange={(e) =>
                                      setConfirm_password(e.target.value)
                                    }
                                    value={confirm_password}
                                  />
                                  <div className="refusedconf text-danger"></div>
                                </div>
                              </div>
                            </div>
                            <div className="successed bg-success"></div>
                            <div class="d-flex justify-content-lg-end justify-content-center mt-2">
                              <button
                                class="btn btn-outline-primary"
                                type="submit"
                                disabled={
                                  !old_password ||
                                  !new_password ||
                                  !confirm_password
                                }
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/*----------------------------------------------------------------------*/}
                      <div class="white-bg mt-4">
                        <div class="students-info-form">
                          <div class="d-grid gap-2">
                            <button
                              class="btn btn-outline-info"
                              type="button"
                              onClick={handleDisable}
                            >
                              Disable Account
                            </button>
                            <button
                              class="btn btn-outline-danger"
                              type="button"
                              onClick={handleDelete}
                            >
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*----------------------------------------------------------------------*/}
                    <div class="col-lg-3 order-1 order-lg-0 mt-4 mt-lg-0">
                      <div class="white-bg">
                        <div class="change-image-wizard">
                          <div class="image mx-auto">
                            <img
                              src="dist/images/user/user-img-01.jpg"
                              alt="User"
                            />
                          </div>
                          <form action="#">
                            <div class="d-flex justify-content-center">
                              <button
                                type="submit"
                                class="button button--primary-outline"
                              >
                                CHANGE iMAGE
                              </button>
                            </div>
                          </form>
                          <p>
                            Image size should be under 1MB image ratio 200px.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
