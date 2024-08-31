import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCourse from './reducers/courses-reducers'

export const selectCourseState = createFeatureSelector<fromCourse.CourseState>("course");

export const selectAllCourses = createSelector(
  selectCourseState,
  fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category == "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category == "ADVANCED")
);

export const selectPromoCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);
