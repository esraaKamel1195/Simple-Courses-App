import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesHttpService } from './services/courses-http.service';
import { CourseActions } from './course-actions-types';
import { concatMap, map } from 'rxjs';
import { AllCoursesLoadedAction } from './course.action';

@Injectable({
  providedIn: 'root',
})
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private courseHttpService: CoursesHttpService
  ) {}

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadAllCoursesAction),
      concatMap((action) => this.courseHttpService.findAllCourses()),
      map((courses) => AllCoursesLoadedAction({ courses }))
    )
  );
}
