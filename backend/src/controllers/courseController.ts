import { Request, Response } from 'express';
import Course from '../models/Course';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ user: req.userId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  const courseData = { ...req.body, user: req.userId };
  
  try {
    const course = await Course.create(courseData);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await Course.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};