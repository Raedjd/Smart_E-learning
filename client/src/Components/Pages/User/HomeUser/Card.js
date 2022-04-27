import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../../actions/post.actions";
import { dateParser, isEmpty } from "../Utilis";
import CardComments from "./CardComments";
import DeletePost from "./DeletePost";
import { AiTwotoneEdit } from "react-icons/ai";
import "./_card.scss";
const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  return (
    <div>
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
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}>
                      update!
                    </button>
                  </div>
                </div>
              )}
              <div className="card-footer">
                <div className="comment-icon">
                  {/*      <img
                    onClick={() => setShowComments(!showComments)}
                    src="./img/icons/message1.svg"
                    alt="comment"
                  />

                  <span>{post.comments.length}</span> */}
                </div>
                {userData._id === post.posterId && (
                  <div className="button-container">
                    <span onClick={() => setIsUpdated(!isUpdated)}>
                      <AiTwotoneEdit />
                    </span>

                    <DeletePost id={post._id} />
                  </div>
                )}
              </div>
              {showComments && <CardComments post={post} />}
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
