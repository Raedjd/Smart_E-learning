import {
  GET_USER,
  UPLOAD_AVATAR,
  TEACHER_DATA,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/user.actions";
const initialState = {};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case TEACHER_DATA:
      return {
        ...state,
        yourFileData: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
