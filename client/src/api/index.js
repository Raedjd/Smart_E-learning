import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchCourse = (id) => API.get(`/courses/${id}`);
export const fetchCourses = (page) => API.get(`/courses?page=${page}`);
export const fetchCoursesByCreator = (name) => API.get(`/courses/creator?name=${name}`);
export const fetchCoursesBySearch = (searchQuery) => API.get(`/courses/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createCourse = (newCourse) => API.post('/courses', newCourse);
export const likeCourse = (id) => API.patch(`/courses/${id}/likeCourse`);
export const comment = (value, id) => API.post(`/courses/${id}/commentCourse`, { value });
export const updateCourse = (id, updatedCourse) => API.patch(`/courses/${id}`, updatedCourse);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

export const fetchReviews = (page) => API.get(`/reviews?page=${page}`);
export const createReview = (newReview) => API.post('/reviews', newReview);
export const updateReview = (id, updatedReview) => API.patch(`/reviews/${id}`, updatedReview);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
