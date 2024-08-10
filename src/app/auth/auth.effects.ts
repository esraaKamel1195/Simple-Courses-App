import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthActions } from '../actions-types';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {

  // handle login action side effects by createEffect() function
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginAction),
      tap((action) => {
        localStorage.setItem('User', JSON.stringify(action.user));
      })
    ), { dispatch: false }
  );

  // handle logout action side effects by createEffect() function
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogoutAction),
      tap((action) => {
        localStorage.removeItem('User');
        this.router.navigateByUrl('/auth/login');
      })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {
    // handle login action side effects by action type
    // this.actions$.subscribe((action: any) => {
    //   if (action.type === '[Login Page] User Login') {
    //     localStorage.setItem('User', action['user']);
    //   }
    // });

    // handle login action side effects by ofType()
    // const login$ = this.actions$.pipe(
    //   ofType(AuthActions.LoginAction),
    //   tap((action) => {
    //     localStorage.setItem('User', JSON.stringify(action.user));
    //   })
    // );
    // login$.subscribe();
  }
}
