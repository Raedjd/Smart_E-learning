import React, { useEffect, useState } from "react";
import cookie from "js-cookie";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost } from "../../../../actions/post.actions";
const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userId = cookie.get("id");
  const dispatch = useDispatch();
  const like = () => {
    dispatch(likePost(post._id, userId));
    setLiked(true);
  };

  useEffect(() => {
    if (post.likers.includes(userId)) setLiked(true);
    else setLiked(false);
  }, [userId, post.likers, liked]);
  return (
    <div class="like-container">
      {userId === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}

      {userId && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
    </div>
  );
};

export default LikeButton;
