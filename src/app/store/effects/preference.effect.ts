import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as PreferenceActions from '../actions/preference.action';
import * as NoteActions from '../actions/note.actions';
import * as AuthActions from '../actions/auth.action';
import * as EventActions from '../actions/event.action';
import { ThemeService } from '../../theme/theme.service';

@Injectable()
export class PreferenceEffect {
    toggleDarkMode = createEffect((actions$ = inject(Actions), themeService = inject(ThemeService)) =>
        actions$.pipe(
            ofType(PreferenceActions.toggleDarkMode),
            switchMap(() =>
                of(themeService.toggleDarkMode()).pipe(map(() => PreferenceActions.toggleDarkModeSuccess()))
            )
        )
    );

    getIsLoggedIn = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(PreferenceActions.getIsLoggedIn),
            switchMap(() =>
                of(
                    PreferenceActions.getIsLoggedInSuccess({
                        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false
                    })
                )
            )
        )
    );

    setIsLoggedIn = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(PreferenceActions.setIsLoggedIn),
            switchMap((action) =>
                of(localStorage.setItem('isLoggedIn', action.isLoggedIn.toString())).pipe(
                    map(() => PreferenceActions.getIsLoggedInSuccess({ isLoggedIn: action.isLoggedIn }))
                )
            )
        )
    );

    getIsLoggedInSuccess = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(PreferenceActions.getIsLoggedInSuccess),
            switchMap((action) =>
                of(PreferenceActions.getIsLoggedInSuccess({ isLoggedIn: action.isLoggedIn }))
            )
        )
    );

    logInSuccess = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(PreferenceActions.logIn, PreferenceActions.logInSuccess),
            switchMap(() => of(NoteActions.fetchNotes(), EventActions.fetchEvents()))
        )
    );

    logOutSuccess = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(PreferenceActions.logOutSuccess),
            switchMap(() => of(AuthActions.routeToLogin({ message: '' })))
        )
    );
}
