import express from 'express';
import { protect } from '../middleware/auth';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:id')
  .put(updateCourse)
  .delete(deleteCourse);

export default router;