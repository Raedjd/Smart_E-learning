import React from "react";

const Home = () => {
  return (
    <div>
      {" "}
      <section
        class="main-banner"
        style="background-image: url(/dist/images/banner/banner.jpg);"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-7 mb-lg-0 order-2 order-lg-0">
              <div class="banner-two-start">
                <h1 class="font-title--lg">
                  Learn with Expert Anytime Anywhere.
                </h1>
                <p>
                  Our mision is to help people to find the best course online
                  and learn with expert anytime, anywhere.
                </p>
                <form>
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
                      <button class="button button-lg button--primary">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-0">
              <div class="main-banner-end">
                <img
                  src="/dist/images/banner/banner-image-01.png"
                  alt="image"
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section browse-categories">
        <div class="container">
          <h2 class="font-title--md text-center mb-0">
            Browse Course with Top Categories
          </h2>
          <div class="browse-categories__wrapper position-relative">
            <div class="categories--box">
              <div class="browse-categories-item default-item-one">
                <div class="browse-categories-item-icon">
                  <div class="categories-one default-categories">
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
                      class="feather feather-camera"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <div class="browse-categories-item-text">
                  <h6 class="font-title--card">
                    <a href="#">Photography</a>
                  </h6>
                  <p>587 Courses</p>
                </div>
              </div>
              <div class="browse-categories-item default-item-two">
                <div class="browse-categories-item-icon">
                  <div class="categories-two default-categories">
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
                      class="feather feather-monitor"
                    >
                      <rect
                        x="2"
                        y="3"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                </div>
                <div class="browse-categories-item-text">
                  <h6 class="font-title--card">
                    <a href="#">Development</a>
                  </h6>
                  <p>17k Courses</p>
                </div>
              </div>
              <div class="browse-categories-item default-item-three">
                <div class="browse-categories-item-icon">
                  <div class="categories-three default-categories">
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
                      class="feather feather-pen-tool"
                    >
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                  </div>
                </div>
                <div class="browse-categories-item-text">
                  <h6 class="font-title--card">
                    <a href="#">Design</a>
                  </h6>
                  <p>23k Courses</p>
                </div>
              </div>
              <div class="browse-categories-item default-item-four">
                <div class="browse-categories-item-icon">
                  <div class="categories-four default-categories">
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
                      class="feather feather-headphones"
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </div>
                </div>
                <div class="browse-categories-item-text">
                  <h6 class="font-title--card">
                    <a href="#">Music</a>
                  </h6>
                  <p>297 Courses</p>
                </div>
              </div>
              <div class="browse-categories-item default-item-five">
                <div class="browse-categories-item-icon">
                  <div class="categories-five default-categories">
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
                      class="feather feather-box"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                </div>
                <div class="browse-categories-item-text">
                  <h6 class="font-title--card">
                    <a href="#">Marketing</a>
                  </h6>
                  <p>2k Courses</p>
                </div>
              </div>
              <div class="browse-categories-item default-item-four">
                <div class="browse-categories-item-icon">
                  <div class="categories-four default-categories">
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
                      class="feather feather-headphones"
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </div>
                </div>
                <div class="browse-categories-item-text">
                  <h6 class="font-title--card">
                    <a href="#">Music</a>
                  </h6>
                  <p>297 Courses</p>
                </div>
              </div>
              <div class="browse-categories-item default-item-five">
                <div class="browse-categories-item-icon">
                  <div class="categories-five default-categories">
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
                      class="feather feather-box"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                </div>
                <div class="browse-categories-item-text">
                  <h6 class="font-title--card">
                    <a href="#">Marketing</a>
                  </h6>
                  <p>2k Courses</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 text-center">
              <a
                href="course-search.html"
                class="button button-lg button--primary mt-lg-3 mt-5"
              >
                Browse all Courses
              </a>
            </div>
          </div>
        </div>
        <div class="browse-categories-shape">
          <img
            src="/dist/images/shape/dots/dots-img-11.png"
            alt="shape"
            class="img-fluid shape-01"
          />
          <img
            src="/dist/images/shape/line01.png"
            alt="shape"
            class="img-fluid shape-02"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
