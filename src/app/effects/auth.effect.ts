import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { empty } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as AuthActions from '../actions/auth'
import * as EventActions from '../actions/event'
import { OAuthService } from 'angular-oauth2-oidc'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffect {
  @Effect({ dispatch: false })
  login = this.actions$.pipe(ofType(AuthActions.LOGIN_EVENT),
    switchMap((action: AuthActions.LoginEvent) =>
      this.oauthService
        .fetchTokenUsingPasswordFlowAndLoadUserProfile(
          action.username,
          action.password
        )
        .then(() => this.store.dispatch(new AuthActions.LoginEventSuccess()))
        .catch(err => this.store.dispatch(new AuthActions.LoginEventFail(err)))
    )
  )

  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN_EVENT_SUCCESS),
    switchMap((action: AuthActions.LoginEventSuccess) =>
      this.oauthService
        .loadUserProfile()
        .then(profile => {
          this.store.dispatch(new AuthActions.LoadProfileSuccess(profile))
          this.store.dispatch(new EventActions.FetchEvents())
          this.store.dispatch(new AuthActions.RouteToHome())
        })
        .catch(err => this.store.dispatch(new AuthActions.LoadProfileFail(err)))
    )
  )

  @Effect({ dispatch: false })
  tokenExpire = this.actions$.pipe(ofType(AuthActions.TOKEN_EXPIRE),
    switchMap((action: AuthActions.TokenExpire) => {
      this.store.dispatch(new AuthActions.Logout(action.message))
      return empty()
    })
  )

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(ofType(AuthActions.LOGOUT),
    switchMap((action: AuthActions.Logout) => {
      this.oauthService.logOut()
      this.store.dispatch(new EventActions.EventsClear())
      this.store.dispatch(new AuthActions.RouteToLogin(action.message))
      return empty()
    })
  )

  @Effect({ dispatch: false })
  routeToHome = this.actions$
    .pipe(ofType(AuthActions.ROUTE_TO_HOME),
      switchMap((action: AuthActions.RouteToHome) =>
        this.router.navigate([`/`])
      )
    )

  @Effect({ dispatch: false })
  routeToLogin = this.actions$
    .pipe(ofType(AuthActions.ROUTE_TO_LOGIN),
      switchMap((action: AuthActions.RouteToLogin) =>
        this.router.navigate([
          `/login`,
          { endsession: action.message, skipLocationChange: true },
        ])
      )
    )

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private actions$: Actions,
    private store: Store<any>
  ) { }
}
