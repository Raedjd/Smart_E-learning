import React, { useState } from 'react';
import { Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import {  deleteReview } from '../../../actions/reviews';
import useStyles from './styles';
import reviews from '../../../reducers/reviews';

const Review = ({ review,title }) => {



  return (
    <div>
    <div style={{ width: '70%' }}>
        <Typography gutterBottom variant="h6">Write a comment</Typography>
      </div>
      <div>
          <Typography  gutterBottom variant="subtitle1">review</Typography>
          <Typography  gutterBottom variant="h5" component="h2">{title}</Typography>
          <Typography  gutterBottom variant="h5" component="h2"></Typography>
      </div>    
    </div>
  );
};

export default Review;


