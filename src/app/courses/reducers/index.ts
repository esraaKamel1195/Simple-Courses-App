import { isDevMode } from '@angular/core';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { Course } from '../model/course';
import { CourseActions } from '../course-actions-types';

export const courseFeatureKey = 'course';

export interface CourseState extends EntityState<Course> {
  courses: Course[];
  entities: { [Key: number]: Course };
  ids: number[];
}

// let state!: CourseState;
// state.ids;
// state.entities;

export const adapter = createEntityAdapter<Course>();

export const courseInitialState = adapter.getInitialState();

export const coursesReducer = createReducer(
  courseInitialState,
  on(CourseActions.AllCoursesLoadedAction,
    (state, action) => adapter.addMany(action.courses, state)
  )
);

// export const reducers: ActionReducerMap<CourseState> = {
// };

export const metaReducers: MetaReducer<CourseState>[] = isDevMode() ? [] : [];
