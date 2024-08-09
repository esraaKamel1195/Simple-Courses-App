import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/authentication.route').then((m) => m.AuthRoute)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./courses/courses.route').then((m) => m.coursesRoute)
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
