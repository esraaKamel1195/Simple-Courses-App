import { Routes } from '@angular/router';
import { CoursesResolver } from './course.resolver';

export const coursesRoute: Routes = [
  {
    path: '',
    resolve: {courses: CoursesResolver},
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'courses',
    resolve: {courses: CoursesResolver},
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'courses/:courseUrl/:id',
    loadComponent: () =>
      import('./course/course.component').then((c) => c.CourseComponent),
  },
  // {
  //   path: 'courses/:id',
  //   loadComponent: () =>
  //     import('./course/course.component').then((c) => c.CourseComponent),
  // },
];
