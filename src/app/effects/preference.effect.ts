import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { EMPTY } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import * as ProfileActions from '../actions/preference.action'
import { ThemeService } from '../shared/theme.service'

@Injectable()
export class PreferenceEffect {

  toggleDarkMode = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.toggleDarkMode),
      switchMap(() => {
        this.themeService.toggleDarkMode()
        this.store.dispatch(ProfileActions.toggleDarkModeSuccess({ isDarkMode: this.themeService.DarkMode }))
        return EMPTY;
      })
    ), { dispatch: false });

  getDarkMode = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getDarkMode),
      switchMap(() => {
        this.store.dispatch(ProfileActions.getDarkModeSuccess({ isDarkMode: this.themeService.DarkMode }))
        return EMPTY;
      })
    ), { dispatch: false });

  logIn = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.logIn),
      switchMap(() => {
        this.store.dispatch(ProfileActions.logInSuccess())
        return EMPTY;
      })
    ), { dispatch: false });

  constructor(
    private actions$     : Actions,
    private store        : Store<any>,
    private themeService : ThemeService
  ) { }
}
