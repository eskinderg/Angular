import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { OAuthService } from 'angular-oauth2-oidc';
import * as AuthActions from '../actions/auth.action';
import * as EventActions from '../actions/event.action';
import * as NotesActions from '../actions/note.actions';

@Injectable()
export class AuthEffect {
    login = createEffect(
        (actions$ = inject(Actions), oauthService = inject(OAuthService), store = inject(Store)) =>
            actions$.pipe(
                ofType(AuthActions.loginEvent),
                switchMap((action) =>
                    oauthService
                        .fetchTokenUsingPasswordFlowAndLoadUserProfile(action.username, action.password)
                        .then(() => store.dispatch(AuthActions.loginEventSuccess()))
                        .catch((err) => store.dispatch(AuthActions.loginEventFail({ payload: err })))
                )
            ),
        { dispatch: false }
    );

    loginEventSuccess = createEffect(
        (actions$ = inject(Actions), oauthService = inject(OAuthService), store = inject(Store)) =>
            actions$.pipe(
                ofType(AuthActions.loginEventSuccess),
                switchMap(() =>
                    oauthService
                        .loadUserProfile()
                        .then((profile) => {
                            store.dispatch(AuthActions.loadProfileSuccess({ profile: profile }));
                            store.dispatch(EventActions.fetchEvents());
                            store.dispatch(NotesActions.fetchNotes());
                            store.dispatch(AuthActions.routeToHome());
                        })
                        .catch((err) => store.dispatch(AuthActions.loadProfileFail({ payload: err })))
                )
            ),
        { dispatch: false }
    );

    tokenExpire = createEffect(
        (actions$ = inject(Actions), store = inject(Store)) =>
            actions$.pipe(
                ofType(AuthActions.tokenExpire),
                switchMap((action) => {
                    store.dispatch(AuthActions.logout({ message: action.message }));
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    logout = createEffect(
        (actions$ = inject(Actions), oauthService = inject(OAuthService), store = inject(Store)) =>
            actions$.pipe(
                ofType(AuthActions.logout),
                switchMap((action) => {
                    oauthService.logOut();
                    store.dispatch(EventActions.eventsClear());
                    store.dispatch(AuthActions.routeToLogin({ message: action.message }));
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    routeToHome = createEffect(
        (actions$ = inject(Actions), router = inject(Router)) =>
            actions$.pipe(
                ofType(AuthActions.routeToHome),
                switchMap(() => router.navigate([`/`]))
            ),
        { dispatch: false }
    );

    routeToLogin = createEffect(
        (actions$ = inject(Actions), router = inject(Router)) =>
            actions$.pipe(
                ofType(AuthActions.routeToLogin),
                switchMap((action) =>
                    router.navigate([`/login`, { endsession: action.message, skipLocationChange: true }])
                )
            ),
        { dispatch: false }
    );
}
