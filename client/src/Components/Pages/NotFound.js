import React from "react";

const NotFound = () => {
  return (
    <div>
      <section class="error-area overflow-hidden">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 text-center text-lg-start order-2 order-lg-0">
              <div class="error-area-start">
                <h2 class="font-title--md">Page Not Found</h2>
                <p class="font-para--lg">
                  Something went wrong. It's look like the link is broken or the
                  page is removed.
                </p>
                <a href="index.html" class="button button-lg button--primary">
                  Go Home
                </a>
              </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-0">
              <div class="image">
                <img
                  src="dist/images/banner/banner-image-04.jpg"
                  alt="img"
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="error-area-shape">
          <img
            src="dist/images/404/shape01.png"
            alt="shape"
            class="img-fluid shape-01"
          />
          <img
            src="dist/images/404/shape02.png"
            alt="shape"
            class="img-fluid shape-02"
          />
        </div>
      </section>
    </div>
  );
};

export default NotFound;
