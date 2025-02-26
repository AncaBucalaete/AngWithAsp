import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { AuthService } from '../auth.service';
import { map, mergeMap, catchError, of, tap } from 'rxjs';
import { AuthActions } from './actions-type';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
        private router: Router) { }

    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user',
                    JSON.stringify(action.user))
                )
            )
        ,
        { dispatch: false });

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/login');
                })
            )
        , { dispatch: false });
}

