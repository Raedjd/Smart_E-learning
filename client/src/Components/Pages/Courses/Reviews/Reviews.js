import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Review from './Review/Review';
import useStyles from './styles';
import { useState } from 'react';
import axios from 'axios';

const Reviews = ({ setCurrentId }) => {
  const { reviews, isLoading } = useSelector((state) => state.reviews);
  const classes = useStyles();

  const [dataFetched,setDataFetched] = useState([]);
  useEffect(()=>{
    let result = axios.get('http://localhost:5000/reviews').then(data=>{
      setDataFetched(data.data);
    });
  },[])
  console.log(dataFetched)
  if (!reviews.length && !isLoading) return 'No reviews';

  return (
      
    !isLoading ? (<CircularProgress />) : (
      <Grid  alignItems="stretch" spacing={3}>
        {dataFetched?.map((review) => (
          <Grid key={review._id}>
            <Review review={review} setCurrentId={setCurrentId} title={review.title}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Reviews;
