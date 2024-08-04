import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../../actions-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user?: User;
}

const initialAuthState: AuthState = { user: undefined };

// export const reducers: ActionReducerMap<AuthState> = {
//   user: undefined,
// };

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.LoginAction, (state, action) => {return {user: action.user}})
);

export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];
