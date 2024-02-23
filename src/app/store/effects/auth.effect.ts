import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
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
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginEvent),
        switchMap((action) =>
          this.oauthService
            .fetchTokenUsingPasswordFlowAndLoadUserProfile(action.username, action.password)
            .then(() => this.store.dispatch(AuthActions.loginEventSuccess()))
            .catch((err) => this.store.dispatch(AuthActions.loginEventFail({ payload: err })))
        )
      ),
    { dispatch: false }
  );

  loginEventSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginEventSuccess),
        switchMap(() =>
          this.oauthService
            .loadUserProfile()
            .then((profile) => {
              this.store.dispatch(AuthActions.loadProfileSuccess({ profile: profile }));
              this.store.dispatch(EventActions.fetchEvents());
              this.store.dispatch(NotesActions.fetchNotes());
              this.store.dispatch(AuthActions.routeToHome());
            })
            .catch((err) => this.store.dispatch(AuthActions.loadProfileFail({ payload: err })))
        )
      ),
    { dispatch: false }
  );

  tokenExpire = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.tokenExpire),
        switchMap((action) => {
          this.store.dispatch(AuthActions.logout({ message: action.message }));
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap((action) => {
          this.oauthService.logOut();
          this.store.dispatch(EventActions.eventsClear());
          this.store.dispatch(AuthActions.routeToLogin({ message: action.message }));
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  routeToHome = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.routeToHome),
        switchMap(() => this.router.navigate([`/`]))
      ),
    { dispatch: false }
  );

  routeToLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.routeToLogin),
        switchMap((action) =>
          this.router.navigate([`/login`, { endsession: action.message, skipLocationChange: true }])
        )
      ),
    { dispatch: false }
  );

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private actions$: Actions,
    private store: Store<any>
  ) {}
}
