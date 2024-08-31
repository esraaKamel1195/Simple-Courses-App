import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs";
import { loadAllCoursesAction } from "./course.action";
import { areCoursesLoaded } from "./courses.selector";

@Injectable({
  providedIn: "root"
})

export class CoursesResolver implements Resolve<any> {

  isLoading: boolean = false;
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded) => {
        if(!this.isLoading && !coursesLoaded) {
          this.isLoading = true;
          this.store.dispatch(loadAllCoursesAction());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
