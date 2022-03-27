import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../../actions/post.actions";

const DeletePost = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));
  return (
    <span
      onClick={() => {
        if (window.confirm("Do you want to remove this item ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </span>
  );
};

export default DeletePost;
