import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./_card.scss";
const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handleComment = () => {};
  return (
    <div class="comments-container">
      {post.comments.map((comment) => {
        return <div key={comment._id}>fdggs</div>;
      })}
    </div>
  );
};

export default CardComments;
