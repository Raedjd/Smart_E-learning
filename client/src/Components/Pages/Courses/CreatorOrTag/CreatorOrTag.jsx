import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Course from '../Courses/Course/Course';
import { getCoursesByCreator, getCoursesBySearch } from'../../../../actions/courses';;

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.courses);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getCoursesBySearch({ tags: name }));
    } else {
      dispatch(getCoursesByCreator(name));
    }
  }, []);

  if (!courses.length && !isLoading) return 'No courses';

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {courses?.map((course) => (
            <Grid key={course._id} item xs={12} sm={12} md={6} lg={3}>
              <Course course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
