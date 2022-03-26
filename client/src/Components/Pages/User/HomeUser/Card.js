import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LikeButton from "./LikeButton";
import "./_card.scss";
const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const updateItem = () => {};

  const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
  };
  return (
    <li class="card-body " key={post._id}>
      {isLoading ? (
        <i class="spinner-grow text-primary"></i>
      ) : (
        <>
          <div class="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.avatar;
                    else return null;
                  })
                  .join("")
              }
            />
          </div>

          <div class="card-right">
            <div class="card-header">
              <div class="username">
                <h5>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.username;
                        else return null;
                      })
                      .join("")}
                </h5>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div class="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div class="button-container">
                  <button class="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
          </div>
          <div class="card-footer">
            <div class="comment-icon">
              <img src="./img/icons/message1.svg" alt="comment" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
