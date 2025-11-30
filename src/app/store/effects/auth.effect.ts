import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import * as AuthActions from '../actions/auth.action';
import * as PreferenceActions from '../actions/preference.action';
import * as EventActions from '../actions/event.action';
import * as NoteActions from '../actions/note.actions';
import * as MovieActions from '../actions/movie.actions';
import * as AdminAction from '../../admin/store/actions/admin.auth.action';
import { AuthPermission } from 'src/app/auth/auth.permission.service';
import { passwordFlowAuthConfig } from 'src/app/auth/auth.config';
import { Action } from '@ngrx/store';
import { PreferenceDataService } from 'src/app/preference/preference.data.service';

@Injectable()
export class AuthEffect {
    private actions$ = inject(Actions);
    private oauthService = inject(OAuthService);
    private router = inject(Router);

    logIn = createEffect((actions$ = inject(Actions), authService = inject(OAuthService)) =>
        actions$.pipe(
            ofType(AuthActions.logIn),
            switchMap(() => {
                let actions: Action[] = [];
                if (authService.hasValidAccessToken()) {
                    actions = [...actions, AuthActions.loadProfile()];
                }
                return of(...actions);
            })
        )
    );

    loginWithUserNamePassword$ = createEffect((oauthService = inject(OAuthService)) =>
        this.actions$.pipe(
            ofType(AuthActions.loginWithUserNamePassword),
            concatMap((action) => {
                oauthService.configure({ ...passwordFlowAuthConfig, logoutUrl: undefined });

                return from(oauthService.loadDiscoveryDocumentAndTryLogin()).pipe(
                    switchMap(() => {
                        return from(
                            oauthService.fetchTokenUsingPasswordFlow(action.username, action.password)
                        ).pipe(
                            mergeMap(() => of(AuthActions.loginWithUsernamePasswordSuccess())),
                            catchError((err) => of(AuthActions.loginEventFail({ payload: err })))
                        );
                    }),
                    catchError((err) => of(AuthActions.loginEventFail({ payload: err })))
                );
            })
        )
    );

    loginWithUsernamePasswordSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginWithUsernamePasswordSuccess),
            switchMap(() => [AuthActions.loadProfile(), AuthActions.routeActions()])
        )
    );

    loadProfile = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadProfile),
            switchMap(() =>
                from(this.oauthService.loadUserProfile()).pipe(
                    mergeMap((profile) => [AuthActions.loadProfileSuccess({ profile: profile })]),
                    catchError((err) => [AuthActions.loadProfileFail({ payload: err })])
                )
            )
        )
    );

    loadProfileSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadProfileSuccess),
            switchMap(() => of(PreferenceActions.loadUserPreference()))
        )
    );

    loadUserPreference = createEffect(
        (actions$ = inject(Actions), preferenceDataService = inject(PreferenceDataService)) =>
            actions$.pipe(
                ofType(PreferenceActions.loadUserPreference),
                switchMap(() =>
                    preferenceDataService.getPreference().pipe(
                        mergeMap((preference) => [
                            PreferenceActions.loadUserPreferenceSuccess({
                                preference: preference.shift()
                            })
                        ])
                    )
                )
            )
    );

    loadUserPreferenceSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PreferenceActions.loadUserPreferenceSuccess),
            switchMap(() => of(AuthActions.logInSuccess()))
        )
    );

    logInSuccess = createEffect((actions$ = inject(Actions), permission = inject(AuthPermission)) =>
        actions$.pipe(
            ofType(AuthActions.logInSuccess),
            switchMap(() => {
                let actions: Action[] = [
                    NoteActions.syncServer(),
                    EventActions.fetchEvents(),
                    MovieActions.fetchWatchList(),
                    MovieActions.fetchWatchedList()
                ];

                if (permission.IsAdmin) {
                    actions = [...actions, AdminAction.adminFetchUsersInfo(), AdminAction.adminFetchUsers()];
                }
                return of(...actions);
            })
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(() => {
                const idToken = this.oauthService.getIdToken();

                if (idToken) {
                    return from(this.oauthService.revokeTokenAndLogout()).pipe(
                        map(() => AuthActions.logOutSuccess()),
                        catchError((error) => {
                            alert('Logout failed');
                            console.error('Logout error:', error);
                            return EMPTY;
                        })
                    );
                } else {
                    delete this.oauthService.logoutUrl;
                    this.oauthService.logOut(false);
                    return of(AuthActions.logOutSuccess());
                }
            })
        )
    );

    logOutSuccess = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(AuthActions.logOutSuccess),
            switchMap(() => of(AuthActions.routeToLogin({ message: '' })))
        )
    );

    routeActions$ = createEffect((actions$ = inject(Actions), permission = inject(AuthPermission)) =>
        actions$.pipe(
            ofType(AuthActions.routeActions),
            switchMap(() => {
                if (permission.IsAdmin) {
                    return of(AuthActions.routeToDashboard());
                }
                return of(AuthActions.routeToHome());
            })
        )
    );

    tokenExpire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.tokenExpire),
            map((action) => AuthActions.logout({ message: action.message }))
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
