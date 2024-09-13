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
import { compareCourses, Course } from '../model/course';
import { CourseActions } from '../course-actions-types';

export const courseFeatureKey = 'course';

export interface CourseState extends EntityState<Course> {
  courses: Course[];
  entities: { [Key: number]: Course };
  ids: number[];
  allCoursesLoaded: boolean;
}

// let state!: CourseState;
// state.ids;
// state.entities;

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: (course) => course.id,
});

export const courseInitialState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  courseInitialState,
  on(CourseActions.AllCoursesLoadedAction, (state, action) =>
    adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.CoursesUpdate, (state, action) =>
    adapter.updateOne(action.updated, state)
  )
);

export const { selectAll } = adapter.getSelectors();

// export const reducers: ActionReducerMap<CourseState> = {
// };

export const metaReducers: MetaReducer<CourseState>[] = isDevMode() ? [] : [];
