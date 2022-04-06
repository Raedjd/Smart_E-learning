import { START_LOADING_REVIEW, END_LOADING_REVIEW, FETCH_ALL_REVIEWS,  CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getReviews = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_REVIEW });
    const { data: { data}} = await api.fetchReviews(page);

    dispatch({ type: FETCH_ALL_REVIEWS, payload: { data  }});
    dispatch({ type: END_LOADING_REVIEW });
  } catch (error) {
    console.log(error);
  }
};

export const createReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_REVIEW });
    const { data } = await api.createReview(review);

    dispatch({ type: CREATE_REVIEW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = (id, review) => async (dispatch) => {
  try {
    const { data } = await api.updateReview(id, review);

    dispatch({ type: UPDATE_REVIEW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    await await api.deleteReview(id);

    dispatch({ type: DELETE_REVIEW, payload: id });
  } catch (error) {
    console.log(error);
  }
};
