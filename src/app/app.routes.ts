import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/authentication.route').then((m) => m.AuthRoute)
  },
  {
    path: '',
    loadChildren: () =>
      import('./courses/courses.route').then((m) => m.coursesRoute)
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
