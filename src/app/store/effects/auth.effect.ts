import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { OAuthService } from 'angular-oauth2-oidc';
import * as AuthActions from '../actions/auth.action';
import * as EventActions from '../actions/event.action';
import * as PreferenceActions from '../actions/preference.action';

@Injectable()
export class AuthEffect {
    constructor(
        private actions$: Actions,
        private oauthService: OAuthService,
        private router: Router
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginEvent),
            switchMap((action) =>
                from(
                    this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(
                        action.username,
                        action.password
                    )
                ).pipe(
                    map(() => AuthActions.loginEventSuccess()),
                    catchError((err) => [AuthActions.loginEventFail({ payload: err })])
                )
            )
        )
    );

    loginEventSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginEventSuccess),
            switchMap(() =>
                from(this.oauthService.loadUserProfile()).pipe(
                    mergeMap((profile) => [
                        AuthActions.loadProfileSuccess({ profile }),
                        PreferenceActions.logInSuccess(),
                        AuthActions.routeToHome()
                    ]),
                    catchError((err) => [AuthActions.loadProfileFail({ payload: err })])
                )
            )
        )
    );

    tokenExpire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.tokenExpire),
            map((action) => AuthActions.logout({ message: action.message }))
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap((action) => {
                this.oauthService.logOut();
                return [EventActions.eventsClear(), AuthActions.routeToLogin({ message: action.message })];
            })
        )
    );

    routeToHome$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.routeToHome),
                switchMap(() => from(this.router.navigate(['/'])))
            ),
        { dispatch: false }
    );

    routeToLogin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.routeToLogin),
                switchMap((action) =>
                    from(
                        this.router.navigate([
                            '/login',
                            { endsession: action.message, skipLocationChange: true }
                        ])
                    )
                )
            ),
        { dispatch: false }
    );
}
