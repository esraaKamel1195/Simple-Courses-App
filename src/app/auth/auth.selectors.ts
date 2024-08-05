import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector("auth");

// memorized function
export const IsLoggedInSelector = createSelector(
  selectAuthState,
  (auth: any) => 
    !!auth.user    //negiatable condition
);

export const IsLoggedOutSelector = createSelector(
  IsLoggedInSelector,
  isLogged => !isLogged
)