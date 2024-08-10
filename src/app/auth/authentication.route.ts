import { Routes } from "@angular/router";

export const AuthRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)
  },
];