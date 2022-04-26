import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import fromRev from '../Reviews/Form/Form'
import { getCourse, getCoursesBySearch } from '../../../../actions/courses';
import CommentSection from './CommentSection';
import useStyles from './styles';
import FormRev from '../Reviews/Form/Form';
import Reviews from '../Reviews/Reviews'
const Course = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { course, courses, isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCourse(id));
  }, [id]);

  useEffect(() => {
    if (course) {
      dispatch(getCoursesBySearch({ search: 'none', tags: course?.tags.join(',') }));
    }
  }, [course]);
console.log(course)
  if (!course) return null;

  const openCourse = (_id) => history.push(`/courses/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedCourses = courses.filter(({ _id }) => _id !== course._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{course.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{course.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{course.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${course.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {course.name}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(course.createdAt).fromNow()}</Typography>
          <Typography variant="body1">{course.description}</Typography>
          <div>
            {course.reviews.map(i=>(
              <div>
               <p>the user :{course.creator} </p> 
              <p>the title :{i.title}</p>
              <p> the text :{i.text}</p>
              </div>
            ))}
          </div>
          {/* <CommentSection course={course} /> */}
          <FormRev/>
          
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={course.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={course.title} />
        </div>
      </div>
      {/* {!!recommendedCourses.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedCourses}>
            {recommendedCourses.map(({ title, price, description, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openCourse(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{price}</Typography>
                <Typography gutterBottom variant="subtitle2">{description}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </Paper>
  );
};

export default Course;
