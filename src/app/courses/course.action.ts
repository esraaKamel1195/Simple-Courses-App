import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";


export const loadAllCoursesAction = createAction(
  "[Courses Resolver] Load All Courses"
);

export const AllCoursesLoadedAction = createAction(
  "[Load Courses Effect] All Courses Loaded",
  props<{courses: Course []}>() //payload
);

export const CoursesUpdate = createAction(
  "[Update Course] Course Data Edited",
  props<{updated: Update<Course>}>()
);
