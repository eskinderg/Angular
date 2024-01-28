import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { EMPTY } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import * as PreferenceActions from '../actions/preference.action';
import * as NoteActions from '../actions/note.actions';
import * as EventActions from '../actions/event.action';
import { ThemeService } from '../shared/theme.service'

@Injectable()
export class PreferenceEffect {

  toggleDarkMode = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.toggleDarkMode),
      switchMap(() => {
        this.themeService.toggleDarkMode()
        this.store.dispatch(PreferenceActions.toggleDarkModeSuccess({ isDarkMode: this.themeService.DarkMode }))
        return EMPTY;
      })
    ), { dispatch: false });

  getDarkMode = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.getDarkMode),
      switchMap(() => {
        this.store.dispatch(PreferenceActions.getDarkModeSuccess({ isDarkMode: this.themeService.DarkMode }))
        return EMPTY;
      })
    ), { dispatch: false });

  getIsLoggedIn = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.getIsLoggedIn),
      switchMap(() => {
        this.store.dispatch(PreferenceActions.getIsLoggedInSuccess({ isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false }))
        return EMPTY;
      })
    ), { dispatch: false });

  setIsLoggedIn = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.setIsLoggedIn),
      switchMap((action) => {
        localStorage.setItem('isLoggedIn', action.isLoggedIn.toString())
        this.store.dispatch(PreferenceActions.getIsLoggedInSuccess({ isLoggedIn: action.isLoggedIn }))
        return EMPTY;
      })
    ), { dispatch: false });

  logIn = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.logIn),
      switchMap(() => {
        this.store.dispatch(NoteActions.fetchNotes())
        this.store.dispatch(EventActions.fetchEvents())
        return EMPTY;
      })
    ), { dispatch: false });

  logInSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.logInSuccess),
      switchMap(() => {
        this.store.dispatch(NoteActions.fetchNotes())
        this.store.dispatch(EventActions.fetchEvents())
        return EMPTY;
      })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private themeService: ThemeService
  ) { }
}
