import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';

export const LoginAction = createAction(
  '[Login Page] User Login',
  props<{ user: User }>()
);

export const LogoutAction = createAction(
  "[Logout] Logout"
)