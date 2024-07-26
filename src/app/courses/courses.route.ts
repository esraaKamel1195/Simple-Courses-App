import { Routes } from '@angular/router';

export const coursesRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'courses/:courseUrl',
    loadComponent: () =>
      import('./course/course.component').then((c) => c.CourseComponent),
  },
];
