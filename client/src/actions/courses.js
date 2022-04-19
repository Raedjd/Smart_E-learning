import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_COURSE,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  FETCH_BY_CREATOR,
} from "../constants/actionTypes";
import * as api from "../Components/Pages/Courses/api/index";

export const getCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchCourse(id);

    dispatch({ type: FETCH_COURSE, payload: { course: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getCourses = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchCourses(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error, "fqfqsfqsf");
  }
};

export const getCoursesByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchCoursesByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchCoursesBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = (course, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCourse(course);

    dispatch({ type: CREATE, payload: data });
    history.push(`/courses/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = (id, course) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(id, course);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeCourse = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likeCourse(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentCourse = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.deleteCourse(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
