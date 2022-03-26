import React from "react";
import Thread from "./Thread";

const Posts = () => {
  return (
    <div class="col-lg-8 mt-4 mt-lg-0">
      <div class="instructor-tabs">
        <ul
          class="nav nav-pills instructor-tabs-pills mb-3"
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-courses-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-courses"
              type="button"
              role="tab"
              aria-selected="true"
            >
              Courses
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link me-0"
              id="pills-pills-review-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-pills-review"
              type="button"
              role="tab"
              aria-selected="false"
            >
              Review
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-courses"
            role="tabpanel"
            aria-labelledby="pills-courses-tab"
          >
            <div
              class="tab-pane fade"
              id="pills-pills-review"
              role="tabpanel"
              aria-labelledby="pills-pills-review-tab"
            >
              <div class="row">
                <div class="col-lg-9">
                  <div class="feedback-comment">
                    <Thread />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
