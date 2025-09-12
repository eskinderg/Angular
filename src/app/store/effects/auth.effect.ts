import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { OAuthService } from 'angular-oauth2-oidc';
import * as AuthActions from '../actions/auth.action';
import * as EventActions from '../actions/event.action';
import * as PreferenceActions from '../actions/preference.action';
// import { AuthPermission } from 'src/app/auth/auth.permission.service';

@Injectable()
export class AuthEffect {
    private actions$ = inject(Actions);
    private oauthService = inject(OAuthService);
    // private authPermission = inject(AuthPermission);
    private router = inject(Router);

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
                        PreferenceActions.logInSuccess()
                    ]),
                    catchError((err) => [AuthActions.loadProfileFail({ payload: err })])
                )
            )
        )
    );

    // afterLoginEventSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActions.loadProfileSuccess, PreferenceActions.logInSuccess),
    //         switchMap(() =>
    //             this.authPermission.IsAdmin
    //                 ? of(AuthActions.routeToDashboard())
    //                 : of(AuthActions.routeToHome())
    //         )
    //     )
    // );

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
                switchMap(() => {
                    return from(this.router.navigate(['/']));
                })
            ),
        { dispatch: false }
    );

    routeToDashboard$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.routeToDashboard),
                switchMap(() => {
                    return from(this.router.navigate(['/admin/dashboard']));
                })
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
