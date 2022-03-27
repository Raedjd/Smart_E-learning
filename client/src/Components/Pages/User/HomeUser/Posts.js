import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../../../actions/post.actions";
import { isEmpty } from "../Utilis";
import Thread from "./Thread";
import "./_card.scss";
const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  const handlePost = async () => {
    if (message) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Enter a message");
    }
  };
  const cancelPost = () => {
    setMessage("");
  };

  return (
    <div class="col-lg-12 mt-4 mt-lg-0">
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
              Posts
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
          <div class="students-feedback col-lg-12">
            <div class="post-container">
              {isLoading ? (
                <i class="spinner-grow text-primary"></i>
              ) : (
                <>
                  <div class="post-form">
                    <textarea
                      name="message"
                      id="message"
                      placeholder="What's new ?"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={handlePost}
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={cancelPost}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          <div
            class="tab-pane fade show active"
            id="pills-courses"
            role="tabpanel"
            aria-labelledby="pills-courses-tab"
          >
            {" "}
            <div class="row">
              <div class="col-lg-12">
                <div class="feedback-comment">
                  <Thread />
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
