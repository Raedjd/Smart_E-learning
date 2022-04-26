import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import cookie from "js-cookie";
import { createCourse, updateCourse } from "../../../../actions/courses";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const userId = cookie.get("id");
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    tags: [],
    price: "",
    selectedFile: "",
  });
  const course = useSelector((state) =>
    currentId
      ? state.courses.courses.find(
          (description) => description._id === currentId
        )
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useNavigate();

  const clear = () => {
    setCurrentId(0);
    setCourseData({
      title: "",
      description: "",
      tags: [],
      price: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (!course?.title) clear();
    if (course) setCourseData(course);
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createCourse({ ...courseData, name: user?.result?.name }, history)
      );
      clear();
      console.log(courseData);
    } else {
      dispatch(
        updateCourse(currentId, { ...courseData, name: user?.result?.name })
      );
      clear();
      console.log(courseData);
    }
  };

  if (!userId) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own courses and like other's courses.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setCourseData({ ...courseData, tags: [...courseData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${course?.title}"` : "Creating a course"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={courseData.title}
          onChange={(e) =>
            setCourseData({ ...courseData, title: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={courseData.description}
          onChange={(e) =>
            setCourseData({ ...courseData, description: e.target.value })
          }
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          type="number"
          value={courseData.price}
          onChange={(e) =>
            setCourseData({ ...courseData, price: e.target.value })
          }
        />

        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={courseData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setCourseData({ ...courseData, selectedFile: base64 })
            }
          />
        </div>
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

export default Form;
