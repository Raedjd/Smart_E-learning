import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";
export const TEACHER_DATA = "TEACHER_DATA ";
export const getUser = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/get-user`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadAvatar = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/upload/upload_avatar`,
      data,
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: UPLOAD_AVATAR, payload: res.data });
      })
      .catch((err) => console.log(err.message));
  };
};
