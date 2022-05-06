import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Course from "./Course/Course";
import useStyles from "./styles";
import axios from "axios";

const Courses = ({ setCurrentId }) => {
  // const { courses, isLoading } = useSelector((state) => state.courses);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/courses").then((data) => {
      setCourses(data.data.data);
    });
  }, []);
  const classes = useStyles();

  if (!courses.length && !isLoading) return "No courses";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {courses?.map((course) => (
        <Grid key={course._id} item xs={12} sm={12} md={6} lg={3}>
          <Course course={course} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Courses;
