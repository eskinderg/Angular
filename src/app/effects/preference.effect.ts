import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { EMPTY } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import {
  logIn,
  logInSuccess,
  getIsLoggedIn,
  getIsLoggedInSuccess,
  setIsLoggedIn,
  setIsLoggedInSuccess,
  toggleDarkMode,
  toggleDarkModeSuccess,
  getDarkMode,
  getDarkModeSuccess,
  fetchEvents,
  fetchNotes
} from "../actions";

import { ThemeService } from '../shared/theme.service'

@Injectable()
export class PreferenceEffect {

  toggleDarkMode = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleDarkMode),
      switchMap(() => {
        this.themeService.toggleDarkMode()
        this.store.dispatch(toggleDarkModeSuccess({ isDarkMode: this.themeService.DarkMode }))
        return EMPTY;
      })
    ), { dispatch: false });

  getDarkMode = createEffect(() =>
    this.actions$.pipe(
      ofType(getDarkMode),
      switchMap(() => {
        this.store.dispatch(getDarkModeSuccess({ isDarkMode: this.themeService.DarkMode }))
        return EMPTY;
      })
    ), { dispatch: false });

  getIsLoggedIn = createEffect(() =>
    this.actions$.pipe(
      ofType(getIsLoggedIn),
      switchMap(() => {
        this.store.dispatch(getIsLoggedInSuccess({ isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false }))
        return EMPTY;
      })
    ), { dispatch: false });

  setIsLoggedIn = createEffect(() =>
    this.actions$.pipe(
      ofType(setIsLoggedIn),
      switchMap((action) => {
        localStorage.setItem('isLoggedIn', action.isLoggedIn.toString())
        this.store.dispatch(getIsLoggedInSuccess({ isLoggedIn: action.isLoggedIn }))
        return EMPTY;
      })
    ), { dispatch: false });

  logIn = createEffect(() =>
    this.actions$.pipe(
      ofType(logIn),
      switchMap(() => {
        this.store.dispatch(logInSuccess())
        this.store.dispatch(fetchNotes())
        this.store.dispatch(fetchEvents())
        return EMPTY;
      })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private themeService: ThemeService
  ) { }
}
