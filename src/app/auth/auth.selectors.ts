import { createSelector } from '@ngrx/store';

// memorized function
export const IsLoggedInSelector = createSelector(
  (state: any) => state['auth'],
  (auth) => !!auth.user //negiatable condition
);


export const IsLoggedOutSelector = createSelector(
  IsLoggedInSelector,
  isLogged => !isLogged
)