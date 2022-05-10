import axios from "axios";
import "./HomeP.scss";
import React, { useEffect, useState } from "react";
import Chatbot from "../Pages/chatbot/Chatbot";
import Cardour from "./Cardour";

const HomeP = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories").then((data) => {
      setCategories(data.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/courses").then((data) => {
      setCourses(data.data.data);
    });
  }, []);
  return (
    <div>
      {/* <!-- Banner Starts Here --> */}
      <section class="section banner-two overflow-hidden">
        <div class="container">
          <div class="row">
            <div class="col-lg-7 mb-4 mb-lg-0 order-2 order-lg-0">
              <div class="banner-two-start">
                <h1 class="font-title--lg">
                  Learn with Expert Anytime Anywhere.
                </h1>
                <p>
                  Our mision is to help people to find the best course online
                  and learn with expert anytime, anywhere.
                </p>
                <form action="#">
                  <div class="banner-input">
                    <div class="main-input">
                      <input
                        type="text"
                        placeholder="what do you want do learn today..."
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-search"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                    <div class="search-button">
                      <button
                        class="button button-lg button--primary"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-0">
              <div class="banner-two-end">
                <div class="image">
                  <img
                    src="dist/images/banner/banner-image-02.png"
                    alt="Instructor"
                    class="img-fluid"
                  />
                </div>
                <div class="image-shapes">
                  <img
                    src="dist/images/shape/dots/dots-img-01.png"
                    alt="shape"
                    class="img-fluid shape01"
                  />
                  <img
                    src="dist/images/shape/rec07.png"
                    alt="shape"
                    class="img-fluid shape02"
                  />
                  <img
                    src="dist/images/shape/rec06.png"
                    alt="shape"
                    class="img-fluid shape03"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Intro Featured Starts Here --> */}

      <section class="section pb-0 home-top-feature">
        <svg
          class="shape"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,192L60,165.3C120,139,240,85,360,106.7C480,128,600,224,720,224C840,224,960,128,1080,117.3C1200,107,1320,181,1380,218.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <div class="container">
          <div class="row feature">
            <div class="col-lg-4 col-md-6">
              <div class="cardFeature cardFeature--center">
                <div class="cardFeature__icon cardFeature__icon--bg-g">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4H10.4C11.8852 4 13.3096 4.5619 14.3598 5.5621C15.41 6.56229 16 7.91885 16 9.33333V28C16 26.9391 15.5575 25.9217 14.7699 25.1716C13.9822 24.4214 12.9139 24 11.8 24H2V4Z"
                      stroke="#00AF91"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M30 4H21.6C20.1148 4 18.6904 4.5619 17.6402 5.5621C16.59 6.56229 16 7.91885 16 9.33333V28C16 26.9391 16.4425 25.9217 17.2302 25.1716C18.0178 24.4214 19.0861 24 20.2 24H30V4Z"
                      stroke="#00AF91"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h5 class="font-title--xs">Alot of Online Courses.</h5>
                <p class="font-para--lg">
                  You can browse our diverse and multiple courses about almost
                  anything you want to learn.
                </p>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="cardFeature cardFeature--center">
                <div class="cardFeature__icon cardFeature__icon--bg-b">
                  <svg
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.3854 14.2241C24.8741 14.2241 26.8914 12.2068 26.8914 9.71806C26.8914 7.23066 24.8741 5.21204 22.3854 5.21204"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M24.4575 19.121C25.2009 19.1715 25.939 19.2781 26.6674 19.4394C27.6774 19.6403 28.8938 20.0544 29.3257 20.9606C29.6017 21.5414 29.6017 22.2179 29.3257 22.7988C28.8951 23.7049 27.6774 24.119 26.6674 24.3268"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.5993 20.0912C18.6424 20.0912 22.9503 20.8552 22.9503 23.907C22.9503 26.9602 18.6697 27.7502 13.5993 27.7502C8.55612 27.7502 4.24963 26.9876 4.24963 23.9344C4.24963 20.8811 8.52879 20.0912 13.5993 20.0912Z"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.5992 15.7349C10.2727 15.7349 7.6076 13.0684 7.6076 9.74188C7.6076 6.41669 10.2727 3.75024 13.5992 3.75024C16.9258 3.75024 19.5922 6.41669 19.5922 9.74188C19.5922 13.0684 16.9258 15.7349 13.5992 15.7349Z"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h5 class="font-title--xs">Expert Instructors</h5>
                <p class="font-para--lg">
                  We have a very good expert instructors that can help you learn
                  and advance your knowledge .
                </p>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="cardFeature cardFeature--center">
                <div class="cardFeature__icon cardFeature__icon--bg-r">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-clock"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h5 class="font-title--xs">Lifetime Access</h5>
                <p class="font-para--lg">
                  Once you make an account , you have a limitless access to our
                  App and all of its features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Featured Categories Ends Here --> */}
      <div>
        <section class="section featured-categories">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <h2 class="text-center font-title--md">
                  Find Course with Top Categories
                </h2>
              </div>
            </div>
          </div>
          <section id="feature" class="section-p1">
            {categories.map((e) => (
              <div class="fe-box">
                <img src="./img/features/f1.png" alt="" />
                <h6>{e.name}</h6>
              </div>
            ))}
          </section>
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex justify-content-center my-5 mb-0">
                <a href="searchcourse" class="button button-lg button--primary">
                  Browse all Courses
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <!--  Popular Courses Starts Here --> */}
      <section class="section section--bg-offwhite-three featured-popular-courses main-popular-course">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="featured-popular-courses-heading d-flex align-content-center justify-content-between">
                <div class="main-heading">
                  <h3 class="font-title--md">Our Popular Courses</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-all"
                role="tabpanel"
                aria-labelledby="pills-all-tab"
              ></div>
              <div
                class="tab-pane fade"
                id="pills-dev"
                role="tabpanel"
                aria-labelledby="pills-dev-tab"
              ></div>
            </div>
            <div class="row event-search-content d-flex justify-content-center my-5 mb-0">
              {courses.map((e, index) => (
                <Cardour
                  name={e.title}
                  image={e.selectedFile}
                  //  creatorImage={e.creator.image}
                  // creatorImage={e.creator.image}
                  creatorName={e.name}
                  price={e.price + "$"}
                />
              ))}
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="d-flex justify-content-center my-5 mb-0">
                  <a
                    href="searchcourse"
                    class="button button-lg button--primary"
                  >
                    Browse all Courses
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="featured-popular-courses-shape">
          <img
            src="dist/images/shape/dots/dots-img-12.png"
            alt="Shape"
            class="img-fluid dot-06"
          />
          <img
            src="dist/images/shape/triangel.png"
            alt="Shape"
            class="img-fluid dot-07"
          />
        </div>
      </section>
      <section id="newsletter" class="section-p1 section-m1">
        <div class="newstext">
          <h4>Sign Up To Get Access</h4>
          <p>
            Get E-mail updates about our latest courses and{" "}
            <span>special offers.</span>
          </p>
        </div>
        <div class="form">
          <input type="text" placeholder="Your email address" />
          <button class="normal">Sign Up</button>
        </div>
      </section>
      {/* <!--  Join Area Starts Here --> */}
      <section class="section section--bg-offwhite-two join">
        <div class="container">
          <div class="row">
            <div class="col-lg-7 mx-auto text-center">
              <h2>Start Learning with Lots Of Students Around the World.</h2>
              <p>
                Vivamus finibus, est id sodales imperdiet, ex dolor varius nibh,
                a luctus erat risus sed velit. Phasellus scelerisque.
              </p>
              <a
                href="signup.html"
                class="button button-lg button--primary mt-lg-4 mt-2"
              >
                Join Today
              </a>
            </div>
          </div>
        </div>
        <div class="join__overlay">
          <div class="join__overlay-img join__overlay-img--1">
            <img src="dist/images/join/01.png" alt="image" class="img-fluid" />
            <span>
              <img
                src="dist/images/join/shape03.svg"
                alt="Shape"
                class="img-fluid"
              />
            </span>
          </div>
          <div class="join__overlay-img join__overlay-img--2">
            <img src="dist/images/join/02.png" alt="image" class="img-fluid" />
            <span>
              <img
                src="dist/images/join/shape04.svg"
                alt="Shape"
                class="shape-04 img-fluid"
              />
            </span>
          </div>
          <div class="join__overlay-img join__overlay-img--3">
            <img
              src="dist/images/join/shape06.svg"
              alt="Shape"
              class="shape-06 img-fluid"
            />
          </div>
          <div class="join__overlay-img join__overlay-img--4">
            <img
              src="dist/images/join/shape05.svg"
              alt="Shape"
              class="img-fluid"
            />
          </div>
          <div class="join__overlay-img join__overlay-img--5">
            <img
              src="dist/images/join/shape07.svg"
              alt="Shape"
              class="img-fluid"
            />
          </div>
          <div class="join__overlay-img join__overlay-img--6">
            <img src="dist/images/join/03.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--7">
            <img src="dist/images/join/07.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--8">
            <img src="dist/images/join/01.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--9">
            <img src="dist/images/join/06.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--10">
            <img src="dist/images/join/07.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--11">
            <img src="dist/images/join/08.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--12">
            <img src="dist/images/join/09.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--13">
            <img src="dist/images/join/10.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--14">
            <img src="dist/images/join/11.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--15">
            <img
              src="dist/images/join/shape03.svg"
              alt="Shape"
              class="img-fluid"
            />
          </div>
          <div class="join__overlay-img join__overlay-img--16">
            <img src="dist/images/join/13.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--17">
            <img src="dist/images/join/01.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--18">
            <img src="dist/images/join/14.png" alt="image" class="img-fluid" />
          </div>
          <div class="join__overlay-img join__overlay-img--19">
            <img src="dist/images/join/01.png" alt="image" class="img-fluid" />
          </div>
        </div>
      </section>
      <div className="horoor"></div>
      {/* <!--  Get Started Starts Here --> */}
      <section class="section get-started">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="get-started-area">
                <div class="get-started-item mb-4 mb-lg-0">
                  <h6 class="font-title--sm">Become an Instructor</h6>
                  <p class="font-para--lg">
                    You can apply to become an instructor at our plateform , all
                    you have to do is click the button below .
                  </p>
                  <a
                    href="become-instructor.html"
                    class="green-btn d-inline-block"
                  >
                    Apply as Instructor
                  </a>
                </div>
                <div class="get-started-item">
                  <h6 class="font-title--sm">Use Studently For Business</h6>
                  <p class="font-para--lg">
                    You can use our Application to improve the quality of your
                    workers/teams.
                  </p>
                  <a href="#" class="green-btn d-inline-block">
                    Get Studently For Business
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- News Letter Starts Here --> */}
      <section style={{ backgroundColor: "rgba(235, 235, 242, 0.6)" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="newsletter-area text-center">
                <h4 class="font-title--md">Subscribe our Newsletter</h4>
                <p class="mt-2 mb-lg-4 mb-3">
                  Subscribe to our newsletter to know every update and every new
                  features that we have .
                </p>
                <form>
                  <div class="input-group">
                    <input
                      type="email"
                      class="form-control border-lowBlack"
                      placeholder="Your email"
                    />

                    <button
                      class="button button-lg button--primary"
                      type="button"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer Starts Here --> */}
      {/* <!-- Footer Starts Here --> */}
      <footer class="footer footer--two">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="footer__wrapper">
                <div class="footer__wrapper_logo">
                  {/* <img
                    src="dist/images/logo/footerlogo.png"
                    alt="logo"
                    class="img-fluid"
                  /> */}
                </div>
                <p>
                  With Studently you can improve alot , improve your knowledge ,
                  skills and even carreer.
                </p>
                <div class="footer__wrapper_social d-none d-lg-block">
                  <ul>
                    <li>
                      <a href="#">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.9507 5.29205C17.9086 4.33564 17.7539 3.67812 17.5324 3.10836C17.3038 2.50359 16.9522 1.96213 16.4915 1.51201C16.0414 1.05489 15.4963 0.699691 14.8986 0.474702C14.3255 0.253147 13.6714 0.0984842 12.715 0.0563159C11.7515 0.0105764 11.4456 0 9.00174 0C6.55791 0 6.25202 0.0105764 5.29204 0.0527447C4.33563 0.0949129 3.67811 0.249713 3.1085 0.471131C2.50358 0.699691 1.96213 1.05132 1.51201 1.51201C1.05489 1.96213 0.699827 2.50716 0.474701 3.10493C0.253147 3.67812 0.098484 4.33207 0.0563158 5.28848C0.0105764 6.25203 0 6.55792 0 9.00176C0 11.4456 0.0105764 11.7515 0.0527446 12.7115C0.0949128 13.6679 0.249713 14.3254 0.471267 14.8952C0.699827 15.4999 1.05489 16.0414 1.51201 16.4915C1.96213 16.9486 2.50715 17.3038 3.10493 17.5288C3.67811 17.7504 4.33206 17.905 5.28861 17.9472C6.24845 17.9895 6.55448 17.9999 8.99831 17.9999C11.4421 17.9999 11.748 17.9895 12.708 17.9472C13.6644 17.905 14.3219 17.7504 14.8916 17.5288C16.1012 17.0611 17.0577 16.1047 17.5254 14.8952C17.7468 14.322 17.9016 13.6679 17.9437 12.7115C17.9859 11.7515 17.9965 11.4456 17.9965 9.00176C17.9965 6.55792 17.9929 6.25203 17.9507 5.29205ZM16.3298 12.6411C16.2911 13.5202 16.1434 13.9949 16.0203 14.3114C15.7179 15.0956 15.0955 15.7179 14.3114 16.0204C13.9949 16.1434 13.5168 16.2911 12.6411 16.3297C11.6917 16.372 11.407 16.3824 9.00531 16.3824C6.60365 16.3824 6.31534 16.372 5.36937 16.3297C4.4903 16.2911 4.01559 16.1434 3.69913 16.0204C3.3089 15.8761 2.9537 15.6476 2.66539 15.3487C2.3665 15.0568 2.13794 14.7052 1.99372 14.315C1.87065 13.9985 1.72299 13.5202 1.68439 12.6447C1.64209 11.6953 1.63165 11.4104 1.63165 9.00876C1.63165 6.60709 1.64209 6.31878 1.68439 5.37295C1.72299 4.49387 1.87065 4.01917 1.99372 3.7027C2.13794 3.31234 2.3665 2.95727 2.66896 2.66883C2.9607 2.36994 3.31233 2.14138 3.7027 1.99729C4.01917 1.87422 4.49744 1.72656 5.37294 1.68783C6.32235 1.64566 6.60722 1.63508 9.00875 1.63508C11.414 1.63508 11.6987 1.64566 12.6447 1.68783C13.5238 1.72656 13.9985 1.87422 14.3149 1.99729C14.7052 2.14138 15.0604 2.36994 15.3487 2.66883C15.6476 2.96071 15.8761 3.31234 16.0203 3.7027C16.1434 4.01917 16.2911 4.49731 16.3298 5.37295C16.372 6.32236 16.3826 6.60709 16.3826 9.00876C16.3826 11.4104 16.372 11.6917 16.3298 12.6411Z"
                            fill="white"
                          ></path>
                          <path
                            d="M9.00188 4.37744C6.44912 4.37744 4.37793 6.44849 4.37793 9.00139C4.37793 11.5543 6.44912 13.6253 9.00188 13.6253C11.5548 13.6253 13.6258 11.5543 13.6258 9.00139C13.6258 6.44849 11.5548 4.37744 9.00188 4.37744ZM9.00188 12.0008C7.34578 12.0008 6.00244 10.6576 6.00244 9.00139C6.00244 7.34515 7.34578 6.00195 9.00188 6.00195C10.6581 6.00195 12.0013 7.34515 12.0013 9.00139C12.0013 10.6576 10.6581 12.0008 9.00188 12.0008Z"
                            fill="white"
                          ></path>
                          <path
                            d="M14.8876 4.19521C14.8876 4.79133 14.4043 5.27469 13.808 5.27469C13.2119 5.27469 12.7285 4.79133 12.7285 4.19521C12.7285 3.59894 13.2119 3.11572 13.808 3.11572C14.4043 3.11572 14.8876 3.59894 14.8876 4.19521Z"
                            fill="white"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.9955 18.0002V17.9994H18V11.3979C18 8.16841 17.3047 5.68066 13.5292 5.68066C11.7142 5.68066 10.4962 6.67666 9.99896 7.62091H9.94646V5.98216H6.3667V17.9994H10.0942V12.0489C10.0942 10.4822 10.3912 8.96716 12.3315 8.96716C14.2432 8.96716 14.2717 10.7552 14.2717 12.1494V18.0002H17.9955Z"
                            fill="white"
                          ></path>
                          <path
                            d="M0.296875 5.98291H4.02888V18.0002H0.296875V5.98291Z"
                            fill="white"
                          ></path>
                          <path
                            d="M2.1615 0C0.96825 0 0 0.96825 0 2.1615C0 3.35475 0.96825 4.34325 2.1615 4.34325C3.35475 4.34325 4.323 3.35475 4.323 2.1615C4.32225 0.96825 3.354 0 2.1615 0V0Z"
                            fill="white"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          width="18"
                          height="15"
                          viewBox="0 0 18 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.73137C17.3306 2.025 16.6174 2.21962 15.8737 2.31412C16.6388 1.85737 17.2226 1.13962 17.4971 0.2745C16.7839 0.69975 15.9964 1.00013 15.1571 1.16775C14.4799 0.446625 13.5146 0 12.4616 0C10.4186 0 8.77387 1.65825 8.77387 3.69113C8.77387 3.98363 8.79862 4.26487 8.85938 4.53262C5.7915 4.383 3.07687 2.91263 1.25325 0.67275C0.934875 1.22513 0.748125 1.85738 0.748125 2.538C0.748125 3.816 1.40625 4.94887 2.38725 5.60475C1.79437 5.5935 1.21275 5.42138 0.72 5.15025C0.72 5.1615 0.72 5.17613 0.72 5.19075C0.72 6.984 1.99912 8.4735 3.6765 8.81662C3.37612 8.89875 3.04875 8.93812 2.709 8.93812C2.47275 8.93812 2.23425 8.92463 2.01038 8.87512C2.4885 10.3365 3.84525 11.4109 5.4585 11.4457C4.203 12.4279 2.60888 13.0196 0.883125 13.0196C0.5805 13.0196 0.29025 13.0061 0 12.969C1.63462 14.0231 3.57188 14.625 5.661 14.625C12.4515 14.625 16.164 9 16.164 4.12425C16.164 3.96112 16.1584 3.80363 16.1505 3.64725C16.8829 3.1275 17.4982 2.47837 18 1.73137Z"
                            fill="white"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.0427 0.885481C16.8137 1.09312 17.4216 1.70094 17.6291 2.47204C18.0148 3.88048 17.9999 6.81629 17.9999 6.81629C17.9999 6.81629 17.9999 9.73713 17.6293 11.1457C17.4216 11.9167 16.8138 12.5246 16.0427 12.7321C14.6341 13.1029 8.99996 13.1029 8.99996 13.1029C8.99996 13.1029 3.38048 13.1029 1.95721 12.7174C1.18611 12.5098 0.57829 11.9018 0.37065 11.1309C0 9.73713 0 6.80146 0 6.80146C0 6.80146 0 3.88048 0.37065 2.47204C0.578153 1.70108 1.20094 1.07829 1.95707 0.870787C3.36565 0.5 8.99983 0.5 8.99983 0.5C8.99983 0.5 14.6341 0.5 16.0427 0.885481ZM11.8913 6.80154L7.20605 9.50006V4.10303L11.8913 6.80154Z"
                            fill="white"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          width="9"
                          height="18"
                          viewBox="0 0 9 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.3575 2.98875H9.00075V0.12675C8.71725 0.08775 7.74225 0 6.60675 0C4.2375 0 2.6145 1.49025 2.6145 4.22925V6.75H0V9.9495H2.6145V18H5.82V9.95025H8.32875L8.727 6.75075H5.81925V4.5465C5.82 3.62175 6.069 2.98875 7.3575 2.98875Z"
                            fill="white"
                          ></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="footer__list">
                <h6>Company</h6>
                <ul>
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="course-search.html">Courses</a>
                  </li>
                  <li>
                    <a href="#">career</a>
                  </li>
                  <li>
                    <a href="#">Affiliate</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="footer__list">
                <h6>Support</h6>
                <ul>
                  <li>
                    <a href="#">Help &amp; Supports </a>
                  </li>
                  <li>
                    <a href="#">Pravacy Polocy</a>
                  </li>
                  <li>
                    <a href="faq.html">FAQs</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="footer__list">
                <h6>Quick Links</h6>
                <ul>
                  <li>
                    <a href="event-search.html">Events</a>
                  </li>
                  <li>
                    <a href="become-instructor.html">Become a Instructor</a>
                  </li>
                  <li>
                    <a href="#">Partnerships</a>
                  </li>
                  <li>
                    <a href="#">Get the app</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12 d-block d-lg-none">
              <div class="footer__wrapper_social d-flex my-4">
                <ul>
                  <li>
                    <a href="#">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.9507 5.29205C17.9086 4.33564 17.7539 3.67812 17.5324 3.10836C17.3038 2.50359 16.9522 1.96213 16.4915 1.51201C16.0414 1.05489 15.4963 0.699691 14.8986 0.474702C14.3255 0.253147 13.6714 0.0984842 12.715 0.0563159C11.7515 0.0105764 11.4456 0 9.00174 0C6.55791 0 6.25202 0.0105764 5.29204 0.0527447C4.33563 0.0949129 3.67811 0.249713 3.1085 0.471131C2.50358 0.699691 1.96213 1.05132 1.51201 1.51201C1.05489 1.96213 0.699827 2.50716 0.474701 3.10493C0.253147 3.67812 0.098484 4.33207 0.0563158 5.28848C0.0105764 6.25203 0 6.55792 0 9.00176C0 11.4456 0.0105764 11.7515 0.0527446 12.7115C0.0949128 13.6679 0.249713 14.3254 0.471267 14.8952C0.699827 15.4999 1.05489 16.0414 1.51201 16.4915C1.96213 16.9486 2.50715 17.3038 3.10493 17.5288C3.67811 17.7504 4.33206 17.905 5.28861 17.9472C6.24845 17.9895 6.55448 17.9999 8.99831 17.9999C11.4421 17.9999 11.748 17.9895 12.708 17.9472C13.6644 17.905 14.3219 17.7504 14.8916 17.5288C16.1012 17.0611 17.0577 16.1047 17.5254 14.8952C17.7468 14.322 17.9016 13.6679 17.9437 12.7115C17.9859 11.7515 17.9965 11.4456 17.9965 9.00176C17.9965 6.55792 17.9929 6.25203 17.9507 5.29205ZM16.3298 12.6411C16.2911 13.5202 16.1434 13.9949 16.0203 14.3114C15.7179 15.0956 15.0955 15.7179 14.3114 16.0204C13.9949 16.1434 13.5168 16.2911 12.6411 16.3297C11.6917 16.372 11.407 16.3824 9.00531 16.3824C6.60365 16.3824 6.31534 16.372 5.36937 16.3297C4.4903 16.2911 4.01559 16.1434 3.69913 16.0204C3.3089 15.8761 2.9537 15.6476 2.66539 15.3487C2.3665 15.0568 2.13794 14.7052 1.99372 14.315C1.87065 13.9985 1.72299 13.5202 1.68439 12.6447C1.64209 11.6953 1.63165 11.4104 1.63165 9.00876C1.63165 6.60709 1.64209 6.31878 1.68439 5.37295C1.72299 4.49387 1.87065 4.01917 1.99372 3.7027C2.13794 3.31234 2.3665 2.95727 2.66896 2.66883C2.9607 2.36994 3.31233 2.14138 3.7027 1.99729C4.01917 1.87422 4.49744 1.72656 5.37294 1.68783C6.32235 1.64566 6.60722 1.63508 9.00875 1.63508C11.414 1.63508 11.6987 1.64566 12.6447 1.68783C13.5238 1.72656 13.9985 1.87422 14.3149 1.99729C14.7052 2.14138 15.0604 2.36994 15.3487 2.66883C15.6476 2.96071 15.8761 3.31234 16.0203 3.7027C16.1434 4.01917 16.2911 4.49731 16.3298 5.37295C16.372 6.32236 16.3826 6.60709 16.3826 9.00876C16.3826 11.4104 16.372 11.6917 16.3298 12.6411Z"
                          fill="white"
                        ></path>
                        <path
                          d="M9.00188 4.37744C6.44912 4.37744 4.37793 6.44849 4.37793 9.00139C4.37793 11.5543 6.44912 13.6253 9.00188 13.6253C11.5548 13.6253 13.6258 11.5543 13.6258 9.00139C13.6258 6.44849 11.5548 4.37744 9.00188 4.37744ZM9.00188 12.0008C7.34578 12.0008 6.00244 10.6576 6.00244 9.00139C6.00244 7.34515 7.34578 6.00195 9.00188 6.00195C10.6581 6.00195 12.0013 7.34515 12.0013 9.00139C12.0013 10.6576 10.6581 12.0008 9.00188 12.0008Z"
                          fill="white"
                        ></path>
                        <path
                          d="M14.8876 4.19521C14.8876 4.79133 14.4043 5.27469 13.808 5.27469C13.2119 5.27469 12.7285 4.79133 12.7285 4.19521C12.7285 3.59894 13.2119 3.11572 13.808 3.11572C14.4043 3.11572 14.8876 3.59894 14.8876 4.19521Z"
                          fill="white"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.9955 18.0002V17.9994H18V11.3979C18 8.16841 17.3047 5.68066 13.5292 5.68066C11.7142 5.68066 10.4962 6.67666 9.99896 7.62091H9.94646V5.98216H6.3667V17.9994H10.0942V12.0489C10.0942 10.4822 10.3912 8.96716 12.3315 8.96716C14.2432 8.96716 14.2717 10.7552 14.2717 12.1494V18.0002H17.9955Z"
                          fill="white"
                        ></path>
                        <path
                          d="M0.296875 5.98291H4.02888V18.0002H0.296875V5.98291Z"
                          fill="white"
                        ></path>
                        <path
                          d="M2.1615 0C0.96825 0 0 0.96825 0 2.1615C0 3.35475 0.96825 4.34325 2.1615 4.34325C3.35475 4.34325 4.323 3.35475 4.323 2.1615C4.32225 0.96825 3.354 0 2.1615 0V0Z"
                          fill="white"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        width="18"
                        height="15"
                        viewBox="0 0 18 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 1.73137C17.3306 2.025 16.6174 2.21962 15.8737 2.31412C16.6388 1.85737 17.2226 1.13962 17.4971 0.2745C16.7839 0.69975 15.9964 1.00013 15.1571 1.16775C14.4799 0.446625 13.5146 0 12.4616 0C10.4186 0 8.77387 1.65825 8.77387 3.69113C8.77387 3.98363 8.79862 4.26487 8.85938 4.53262C5.7915 4.383 3.07687 2.91263 1.25325 0.67275C0.934875 1.22513 0.748125 1.85738 0.748125 2.538C0.748125 3.816 1.40625 4.94887 2.38725 5.60475C1.79437 5.5935 1.21275 5.42138 0.72 5.15025C0.72 5.1615 0.72 5.17613 0.72 5.19075C0.72 6.984 1.99912 8.4735 3.6765 8.81662C3.37612 8.89875 3.04875 8.93812 2.709 8.93812C2.47275 8.93812 2.23425 8.92463 2.01038 8.87512C2.4885 10.3365 3.84525 11.4109 5.4585 11.4457C4.203 12.4279 2.60888 13.0196 0.883125 13.0196C0.5805 13.0196 0.29025 13.0061 0 12.969C1.63462 14.0231 3.57188 14.625 5.661 14.625C12.4515 14.625 16.164 9 16.164 4.12425C16.164 3.96112 16.1584 3.80363 16.1505 3.64725C16.8829 3.1275 17.4982 2.47837 18 1.73137Z"
                          fill="white"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.0427 0.885481C16.8137 1.09312 17.4216 1.70094 17.6291 2.47204C18.0148 3.88048 17.9999 6.81629 17.9999 6.81629C17.9999 6.81629 17.9999 9.73713 17.6293 11.1457C17.4216 11.9167 16.8138 12.5246 16.0427 12.7321C14.6341 13.1029 8.99996 13.1029 8.99996 13.1029C8.99996 13.1029 3.38048 13.1029 1.95721 12.7174C1.18611 12.5098 0.57829 11.9018 0.37065 11.1309C0 9.73713 0 6.80146 0 6.80146C0 6.80146 0 3.88048 0.37065 2.47204C0.578153 1.70108 1.20094 1.07829 1.95707 0.870787C3.36565 0.5 8.99983 0.5 8.99983 0.5C8.99983 0.5 14.6341 0.5 16.0427 0.885481ZM11.8913 6.80154L7.20605 9.50006V4.10303L11.8913 6.80154Z"
                          fill="white"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        width="9"
                        height="18"
                        viewBox="0 0 9 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.3575 2.98875H9.00075V0.12675C8.71725 0.08775 7.74225 0 6.60675 0C4.2375 0 2.6145 1.49025 2.6145 4.22925V6.75H0V9.9495H2.6145V18H5.82V9.95025H8.32875L8.727 6.75075H5.81925V4.5465C5.82 3.62175 6.069 2.98875 7.3575 2.98875Z"
                          fill="white"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="container">
            <div class="footer__bottom-content">
              <div class="footer__bottom_copyright">
                <p>© 2021 - Eduguard. All rights reserved</p>
              </div>
              <div class="footer__bottom_topbutton">
                <a href="#">
                  Go To Top
                  <div class="icon ms-2">
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L5 1L1 5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
};

export default HomeP;
