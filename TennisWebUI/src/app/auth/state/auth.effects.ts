import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { AuthService } from '../auth.service';
import { map, mergeMap, catchError, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  /* constructor(private actions$: Actions, private authService: AuthService) {}

   login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ user }) =>
        this.authService.authenticate(username, password).pipe(
          map((user) => loginSuccess({ username: user.name })),
          catchError((error) => of(loginFailure({ error: 'Invalid credentials' })))
        )
      )
    )
  ); */
}
