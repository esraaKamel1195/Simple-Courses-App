import { Request, Response } from 'express';
import { COURSES } from './db-data';

export function getAllCourses(req: Request, res: Response) {
  console.log('Retrieving courses data ...');

  setTimeout(() => {
    res.status(200).json({ payload: Object.values(COURSES) });
  }, 1000);
}

export function getCourseByUrl(req: Request, res: Response) {
  const courseUrl = req.params['courseUrl'];

  const courses: any = Object.values(COURSES);

  const course = courses.find((course: any) => course.url == courseUrl);

  setTimeout(() => {
    res.status(200).json(course);
  }, 1000);
}

export function getCourseById(req: Request, res: Response) {

  const courseId = req.params['courseId'];

  const courses: any = Object.values(COURSES);

  const course = courses.find((course: any) => course.id == courseId);

  setTimeout(() => {
    res.status(200).json(course);
  }, 1000);
}
