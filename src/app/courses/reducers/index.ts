import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const courseFeatureKey = 'course';

export interface CourseState {

}

export const reducers: ActionReducerMap<CourseState> = {

};


export const metaReducers: MetaReducer<CourseState>[] = isDevMode() ? [] : [];
