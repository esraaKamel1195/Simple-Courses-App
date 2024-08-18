import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";


export const loadAllCoursesAction = createAction(
  "[Courses Resolver] Load All Courses"
);

export const AllCoursesLoadedAction = createAction(
  "[Load Courses Effect] All Courses Loaded",
  props<{courses: Course []}>() //payload
);
