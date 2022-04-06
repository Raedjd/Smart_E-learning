import express from 'express';

import { getCourses, getCoursesBySearch, getCourse, createCourse, updateCourse, likeCourse, commentCourse, deleteCourse,getCoursesByCreator } from '../controllers/courses.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getCoursesByCreator);
router.get('/search', getCoursesBySearch);
router.get('/', getCourses);
router.get('/:id', getCourse);

router.post('/', auth,  createCourse);
router.patch('/:id', auth, updateCourse);
router.delete('/:id', deleteCourse);
router.patch('/:id/likeCourse', auth, likeCourse);
router.post('/:id/commentCourse', commentCourse);

export default router;