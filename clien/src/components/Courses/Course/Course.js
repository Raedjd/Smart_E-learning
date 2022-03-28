import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likeCourse, deleteCourse } from '../../../actions/courses';
import useStyles from './styles';

const Course = ({ course, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={course.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={course.title} />
      <div className={classes.overlay}>
        {/* <Typography variant="h6">{course.title}</Typography> */}
        <Typography variant="body2">{moment(course.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(course._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div>
      <div className={classes.details}>
        {/* <Typography variant="body2" color="textSecondary" component="h2">{course.tags.map((tag) => `#${tag} `)}</Typography> */}
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{course.title}</Typography>
      <CardContent className={classes.card_Content} >
        <Typography className={classes.teacher} variant="body2" color="textSecondary" component="p">{course.teacher}</Typography>
        <Typography className={classes.price} gutterBottom variant="h5" component="h2">{course.price}$</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likeCourse(course._id))}><ThumbUpAltIcon fontSize="small" /> Like {course.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteCourse(course._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Course;