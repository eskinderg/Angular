import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { empty, from, of, Observable, Subject, pipe } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, map, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as  AuthActions from '../actions/auth';
import * as  EventActions from '../actions/event';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {

  @Effect({ dispatch: false })
  login = this.actions$
    .ofType(AuthActions.LOGIN_EVENT)
    .pipe(
      switchMap((action: AuthActions.LoginEvent) =>
        this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(action.username, action.password)
        .then(() => this.store.dispatch(new AuthActions.LoginEventSuccess()))
        .catch( err => this.store.dispatch(new AuthActions.LoginEventFail(err)))
      ));

  @Effect({ dispatch: false })
  loginSuccess = this.actions$
    .ofType(AuthActions.LOGIN_EVENT_SUCCESS)
    .pipe(
      switchMap((action: AuthActions.LoginEventSuccess) =>
        this.oauthService.loadUserProfile()
        .then((profile) => {
          this.store.dispatch(new AuthActions.LoadProfileSuccess(profile));
          this.store.dispatch(new EventActions.FetchEvents());
          this.store.dispatch(new AuthActions.RouteToHome());
        }).catch(err => (this.store.dispatch(new AuthActions.LoadProfileFail(err)))
        )
      ));

  @Effect({ dispatch: false })
  tokenExpire = this.actions$
    .ofType(AuthActions.TOKEN_EXPIRE)
    .pipe(
      switchMap((action: AuthActions.TokenExpire) => {
        this.store.dispatch(new AuthActions.Logout(action.message));
        return empty();
      }
      ));

  @Effect({ dispatch: false })
  logout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .pipe(
      switchMap((action: AuthActions.Logout) => {
        this.oauthService.logOut();
        this.store.dispatch(new EventActions.EventsClear());
        this.store.dispatch(new AuthActions.RouteToLogin(action.message));
        return empty();
      }
      ));

  @Effect({ dispatch: false })
  routeToHome = this.actions$
    .ofType(AuthActions.ROUTE_TO_HOME)
    .pipe(
      switchMap((action: AuthActions.RouteToHome) =>
        this.router.navigate([`/`])
      ));

  @Effect({ dispatch: false })
  routeToLogin = this.actions$
    .ofType(AuthActions.ROUTE_TO_LOGIN)
    .pipe(
      switchMap((action: AuthActions.RouteToLogin) =>
        this.router.navigate([`/login`, {'endsession': action.message, skipLocationChange: true}])
      ));

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private actions$: Actions,
    private store: Store<any>
  ) { }

}
