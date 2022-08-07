import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { EMPTY } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import * as ProfileActions from '../actions/profile.action'
import { ThemeService } from '../shared/theme.service'

@Injectable()
export class ProfileEffect {

  setTheme = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.setTheme),
      switchMap((action) => {
        this.themeService.current = action.theme;
        this.store.dispatch(ProfileActions.setThemeSuccess({ theme: action.theme }))
        return EMPTY;
      })
    ), { dispatch: false });

  getTheme = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getTheme),
      switchMap(() => {
        console.log('getthemesucc')
        this.store.dispatch(ProfileActions.getThemeSuccess({ theme: this.themeService.current }))
        return EMPTY;
      })
    ), { dispatch: false });
  constructor(
    private actions$     : Actions,
    private store        : Store<any>,
    private themeService : ThemeService
  ) { }
}
