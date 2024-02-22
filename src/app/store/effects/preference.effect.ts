import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as PreferenceActions from '../actions/preference.action';
import * as NoteActions from '../actions/note.actions';
import * as EventActions from '../actions/event.action';
import { ThemeService } from '../../shared/theme.service';

@Injectable()
export class PreferenceEffect {
  toggleDarkMode = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.toggleDarkMode),
      switchMap((_action) => of(this.themeService.toggleDarkMode()).pipe(map(() => PreferenceActions.toggleDarkModeSuccess())))
    )
  );

  getIsLoggedIn = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.getIsLoggedIn),
      switchMap(() => of(PreferenceActions.getIsLoggedInSuccess({ isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false })))
    )
  );

  setIsLoggedIn = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.setIsLoggedIn),
      switchMap((action) => of(localStorage.setItem('isLoggedIn', action.isLoggedIn.toString())).pipe(map((_) => PreferenceActions.getIsLoggedInSuccess({ isLoggedIn: action.isLoggedIn }))))
    )
  );

  getIsLoggedInSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.getIsLoggedInSuccess),
      switchMap((action) => of(PreferenceActions.getIsLoggedInSuccess({ isLoggedIn: action.isLoggedIn })))
    )
  );

  logInSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.logIn, PreferenceActions.logInSuccess),
      switchMap(() => of(NoteActions.fetchNotes(), EventActions.fetchEvents()))
    )
  );

  constructor(
    private actions$: Actions,
    private themeService: ThemeService
  ) {}
}
