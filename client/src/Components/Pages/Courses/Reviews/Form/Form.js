import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReview, updateReview } from "../../../../../actions/courses";
import useStyles from "./styles";
import { useParams } from "react-router-dom";

const FormRev = ({ currentId, setCurrentId }) => {
  const [reviewData, setReviewsData] = useState({
    title: "",
    text: "",
    rate: null,
  });
  const review = useSelector((state) =>
    currentId
      ? state.reviews.reviews.find((text) => text._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setReviewsData({ title: "", text: "", price: null });
    //setCurrentId(0);
  };
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (!review?.title) clear();
    if (review) setReviewsData(review);
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (currentId === 0) {
    dispatch(
      createReview(
        { ...reviewData, course: id, name: user?.result?.name },
        history
      )
    );
    clear();
    window.location.reload();
    // } else {
    //   dispatch(updateReview(currentId, { ...reviewData, name: user?.result?.name }));
    //   clear();
    // }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In so that you can make a review.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? `Editing "${review?.title}"` : "Creating a review"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={reviewData.title}
          onChange={(e) =>
            setReviewsData({ ...reviewData, title: e.target.value })
          }
        />
        <TextField
          name="text"
          variant="outlined"
          label="Text"
          fullWidth
          multiline
          rows={4}
          value={reviewData.text}
          onChange={(e) =>
            setReviewsData({ ...reviewData, text: e.target.value })
          }
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default FormRev;
