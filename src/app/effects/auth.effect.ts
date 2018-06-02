import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { from, of,Observable, Subject, pipe } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged,switchMap, map, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as  AuthActions from '../actions/auth';
// import { AuthService } from '../components/shared/services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router,} from '@angular/router';

@Injectable()
export class AuthEffect {

  @Effect({ dispatch: false })
  login = this.actions$
    .ofType(AuthActions.LOGIN_EVENT)
    .pipe(
      switchMap((action: AuthActions.loginEvent) =>
        this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(action.username, action.password)
        .then(() => 
          this.store.dispatch(new AuthActions.loginEventSuccess())
        )
        .catch( err =>
          this.store.dispatch(new AuthActions.loginEventFail(err))
        )
      ));

  @Effect({ dispatch: false })
  loginSuccess = this.actions$
    .ofType(AuthActions.LOGIN_EVENT_SUCCESS)
    .pipe(
      switchMap((action: AuthActions.loginEventSuccess) =>
        this.oauthService.loadUserProfile()
        .then((profile) => {
          this.store.dispatch(new AuthActions.loadProfileSuccess(profile));
          this.store.dispatch(new AuthActions.routeToHome());
        }
        ).catch(err => (this.store.dispatch(new AuthActions.loadProfileFail(err)))
        )
      ));

  @Effect({ dispatch: false })
  routeToHome = this.actions$
    .ofType(AuthActions.ROUTE_TO_HOME)
    .pipe(
      switchMap((action: AuthActions.routeToHome) =>
        this.router.navigate([`/`])

      ));


  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private actions$: Actions,
    private store: Store<any>,
    ) { }


}
