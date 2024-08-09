import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { IsLoggedInSelector } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
class AuthGuardClass {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> | boolean | Promise<boolean> {
    return this.store.pipe(
      select(IsLoggedInSelector),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean | Promise<boolean> => {
  return inject(AuthGuardClass).canActivate();
};
