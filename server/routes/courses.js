
import express from 'express';

import { getCourses, getCourse, createCourse, updateCourse, likeCourse, deleteCourse } from '../controllers/courses.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.get('/:id', getCourse);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.patch('/:id/likeCourse', likeCourse);

export default router;