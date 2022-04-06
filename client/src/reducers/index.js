import { combineReducers } from 'redux';

import courses from './courses';
import auth from './auth';
import reviews from './reviews';


export const reducers = combineReducers({ courses, auth, reviews });
