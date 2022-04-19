import React from "react";

const Cardour = ({ name, image, creatorName, creatorImage, price }) => {
  return (
    <div class="col-md-6 mb-4">
      <div class="contentCard contentCard--course">
        <div class="contentCard-top">
          <a href="course-details.html">
            <img src={image} alt="images" class="img-fluid" />
          </a>
        </div>
        <div class="contentCard-bottom">
          <h5>
            <a href="course-details.html" class="font-title--card">
              {name}
            </a>
          </h5>
          <div class="contentCard-info d-flex align-items-center justify-content-between">
            <a
              href="instructor-profile.html"
              class="contentCard-user d-flex align-items-center"
            >
              <img
                src={creatorImage}
                alt="client-image"
                class="rounded-circle"
              />
              <p class="font-para--md">{creatorName}</p>
            </a>
            <div class="price">
              <span>{price}</span>
              {/* <del>$95</del> */}
            </div>
          </div>
          <div class="contentCard-more d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <div class="icon">
                <img src="dist/images/icon/star.png" alt="star" />
              </div>
              <span>4.5</span>
            </div>
            <div class="eye d-flex align-items-center">
              <div class="icon">
                <img src="dist/images/icon/eye.png" alt="eye" />
              </div>
              <span>24,517</span>
            </div>
            <div class="book d-flex align-items-center">
              <div class="icon">
                <img src="dist/images/icon/book.png" alt="location" />
              </div>
              <span>37 Lesson</span>
            </div>
            <div class="clock d-flex align-items-center">
              <div class="icon">
                <img src="dist/images/icon/Clock.png" alt="clock" />
              </div>
              <span>3 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardour;
