import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as AuthActions from '../actions/auth'
import * as EventActions from '../actions/event'
import { OAuthService } from 'angular-oauth2-oidc'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffect {
  login = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.LOGIN_EVENT),
      switchMap((action: AuthActions.LoginEvent) =>
        this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(
          action.username,
          action.password
        )
          .then(() => this.store.dispatch(new AuthActions.LoginEventSuccess()))
          .catch(err => this.store.dispatch(new AuthActions.LoginEventFail(err)))
      )
    ), { dispatch: false })

  loginSuccess = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.LOGIN_EVENT_SUCCESS),
      switchMap(() =>
        this.oauthService
          .loadUserProfile()
          .then(profile => {
            this.store.dispatch(new AuthActions.LoadProfileSuccess(profile))
            this.store.dispatch(new EventActions.FetchEvents())
            this.store.dispatch(new AuthActions.RouteToHome())
          })
          .catch(err => this.store.dispatch(new AuthActions.LoadProfileFail(err)))
      )
    ), { dispatch: false })

  tokenExpire = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.TOKEN_EXPIRE),
      switchMap((action: AuthActions.TokenExpire) => {
        this.store.dispatch(new AuthActions.Logout(action.message))
        return EMPTY
      })
    ), { dispatch: false })

  logout = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.LOGOUT),
      switchMap((action: AuthActions.Logout) => {
        this.oauthService.logOut()
        this.store.dispatch(new EventActions.EventsClear())
        this.store.dispatch(new AuthActions.RouteToLogin(action.message))
        return EMPTY
      })
    ), { dispatch: false })

  routeToHome = createEffect(() =>
    this.actions$
      .pipe(ofType(AuthActions.ROUTE_TO_HOME),
        switchMap(() =>
          this.router.navigate([`/`])
        )
      ), { dispatch: false })

  routeToLogin = createEffect(() =>
    this.actions$
      .pipe(ofType(AuthActions.ROUTE_TO_LOGIN),
        switchMap((action: AuthActions.RouteToLogin) =>
          this.router.navigate([
            `/login`,
            { endsession: action.message, skipLocationChange: true },
          ])
        )
      ), { dispatch: false })

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private actions$: Actions,
    private store: Store<any>
  ) { }
}
