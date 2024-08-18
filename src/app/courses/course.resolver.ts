import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { finalize, first, tap } from "rxjs";
import { loadAllCoursesAction } from "./course.action";

@Injectable({
  providedIn: "root"
})

export class CoursesResolver implements Resolve<any> {

  isLoading: boolean = false;
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // throw new Error("Method Not Implemented yet.");
    return this.store.pipe(
      tap(() => {
        if(!this.isLoading) {
          this.isLoading = true;
          this.store.dispatch(loadAllCoursesAction());
        }
      }),
      first(),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
