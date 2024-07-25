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
    path: ':courseUrl',
    loadComponent: () =>
      import('./course/course.component').then((c) => c.CourseComponent),
  },
];
