import { FETCH_ALL_REVIEWS, FETCH_REVIEW, CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from '../constants/actionTypes';

export default (state = { isLoading: true, reviews: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING_REVIEW':
      return { ...state, isLoading: true };
    case 'END_LOADING_REVIEW':
      return { ...state, isLoading: false };
    case FETCH_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.payload.data,
      };
      case FETCH_REVIEW:
        return { ...state, review: action.payload.review };

    case CREATE_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case UPDATE_REVIEW:
      return { ...state, reviews: state.reviews.map((review) => (review._id === action.payload._id ? action.payload : review)) };
    case DELETE_REVIEW:
      return { ...state, reviews: state.reviews.filter((review) => review._id !== action.payload) };
    default:
      return state;
  }
};

