import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { from, of,Observable, Subject, pipe } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged,switchMap, map, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as  AuthActions from '../actions/auth';
import { AuthService } from '../components/shared/services/auth/auth.service';

@Injectable()
export class AuthEffect {

  @Effect({ dispatch: false })
  login = this.actions$
    .ofType(AuthActions.LOGIN_EVENT)
    .pipe(
      switchMap((action: AuthActions.loginEvent) =>
        from(this.authService.mgr.signinRedirect())
        .pipe(
          map(data => new AuthActions.loginEventSuccess(data)),
          catchError(err => of(new AuthActions.loginEventFail(err)))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private authService: AuthService) { }


}
