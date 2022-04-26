import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_COURSE, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, courses: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        courses: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, courses: action.payload.data };
    case FETCH_COURSE:
      return { ...state, course: action.payload.course };
    case LIKE:
      return { ...state, courses: state.courses.map((course) => (course._id === action.payload._id ? action.payload : course)) };
    case COMMENT:
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course._id == +action.payload._id) {
            return action.payload;
          }
          return course;
        }),
      };
    case CREATE:
      return { ...state, courses: [...state.courses, action.payload] };
    case UPDATE:
      return { ...state, courses: state.courses.map((course) => (course._id === action.payload._id ? action.payload : course)) };
    case DELETE:
      return { ...state, courses: state.courses.filter((course) => course._id !== action.payload) };
    default:
      return state;
  }
};

