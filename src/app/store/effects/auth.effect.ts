import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Injectable()
export class AuthEffect {
    private actions$ = inject(Actions);
    private oauthService = inject(OAuthService);
    private authPermission = inject(AuthPermission);
    private preferenceDataService = inject(PreferenceDataService);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    logIn = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logIn),
            switchMap(() => {
                let actions: Action[] = [];
                if (this.oauthService.hasValidAccessToken()) {
                    actions = [...actions, AuthActions.loadProfile()];
                }
                return of(...actions);
            })
        )
    );

    loginWithUserNamePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginWithUserNamePassword),
            concatMap((action) => {
                this.oauthService.configure({ ...passwordFlowAuthConfig, logoutUrl: undefined });

                return from(this.oauthService.loadDiscoveryDocumentAndTryLogin()).pipe(
                    switchMap(() => {
                        return from(
                            this.oauthService.fetchTokenUsingPasswordFlow(action.username, action.password)
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
            switchMap(() => [AuthActions.loadProfile()])
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
            switchMap(() => of(PreferenceActions.loadUserInfo()))
            // switchMap(() => of(PreferenceActions.loadUserPreference()))
        )
    );

    loadUserInfo = createEffect(() =>
        this.actions$.pipe(
            ofType(PreferenceActions.loadUserInfo),
            switchMap(() =>
                this.preferenceDataService.getUserInfo().pipe(
                    mergeMap((user) => [PreferenceActions.loadUserInfoSuccess({ user: user.shift() })]),
                    catchError((err) => [PreferenceActions.loadUserInfoFail({ error: err })])
                )
            )
        )
    );

    loadUserInfoSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PreferenceActions.loadUserInfoSuccess),
            switchMap(() => of(PreferenceActions.loadUserPreference()))
        )
    );

    loadUserPreference = createEffect(() =>
        this.actions$.pipe(
            ofType(PreferenceActions.loadUserPreference),
            switchMap(() =>
                this.preferenceDataService.getPreference().pipe(
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
            switchMap(() => of(AuthActions.logInSuccess(), AuthActions.routeActions()))
        )
    );

    logInSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logInSuccess),
            switchMap(() => {
                let actions: Action[] = [
                    NoteActions.syncServer(),
                    EventActions.fetchEvents(),
                    MovieActions.fetchWatchList(),
                    MovieActions.fetchWatchedList()
                ];

                if (this.authPermission.IsAdmin) {
                    actions = [...actions, AdminAction.adminFetchUsersInfo(), AdminAction.adminFetchUsers()];
                }
                if (!this.authPermission.hasPermission('Write'))
                    this.notificationService.showStandard(
                        'Current user does not have a write permisstion and any changes are not synced with the server.',
                        'Permission Info',
                        10000,
                        false
                    );
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

    logOutSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logOutSuccess),
            switchMap(() => of(AuthActions.routeToLogin({ message: '' })))
        )
    );

    routeActions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.routeActions),
            switchMap(() => {
                if (this.authPermission.IsAdmin) {
                    return of(AuthActions.routeToDashboard());
                }

                if (['/login'].find((r) => r === this.router.url)) {
                    return of(AuthActions.routeToHome());
                }

                return EMPTY;
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
                switchMap((_action) => from(this.router.navigate(['/login'])))
            ),
        { dispatch: false }
    );

    updateUserInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PreferenceActions.updateUserInfo),
            switchMap((action) =>
                this.preferenceDataService.updateUserInfo([action.user]).pipe(
                    mergeMap((user) => [PreferenceActions.updateUserInfoSuccess({ user: user.shift() })]),
                    catchError((err) => [PreferenceActions.updateUserInfoFail({ error: err })])
                )
            )
        )
    );

    updateUserInfoSuccess = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PreferenceActions.updateUserInfoSuccess),
                tap(() => this.notificationService.showSuccess('Profile saved', 'Save'))
            ),
        { dispatch: false }
    );
}
