import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as PreferenceActions from '../actions/preference.action';
import * as fromRoot from '../reducers';
import { ThemeService } from '../../theme/theme.service';
import { PreferenceDataService } from 'src/app/preference/preference.data.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { Preference } from 'src/app/models/preference';
import { concatLatestFrom } from '@ngrx/operators';

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

    toggleDarkModeSuccess$ = createEffect(
        (
            actions$ = inject(Actions),
            preferenceDataService = inject(PreferenceDataService),
            store = inject<Store<fromRoot.IAppState>>(Store),
            authService = inject(AuthService)
        ) =>
            actions$.pipe(
                ofType(PreferenceActions.toggleDarkModeSuccess),
                concatLatestFrom(() => [
                    store.select(fromRoot.getUserPreference),
                    store.select(fromRoot.isDarkMode),
                    store.select(fromRoot.getUserLang)
                ]),
                switchMap(([_action, preference, isDarkMode, language]) =>
                    preferenceDataService.bulkUpdatePreference([
                        {
                            ...preference,
                            language: language,
                            user_id: authService.getUserId(),
                            dark_mode: JSON.parse(isDarkMode)
                        }
                    ])
                )
            ),
        { dispatch: false }
    );

    saveUserPreference$ = createEffect(
        (actions$ = inject(Actions), preferenceDataService = inject(PreferenceDataService)) =>
            actions$.pipe(
                ofType(PreferenceActions.saveUserPreference),
                switchMap((action) =>
                    preferenceDataService.bulkUpdatePreference([action.preference]).pipe(
                        switchMap((preference: Preference[]) =>
                            of(
                                PreferenceActions.saveUserPreferenceSuccess({
                                    preference: preference.shift()
                                })
                            )
                        ),
                        catchError((err) => of(PreferenceActions.saveUserPreferenceFail({ error: err })))
                    )
                )
            )
    );

    saveUserLang$ = createEffect(
        (
            actions$ = inject(Actions),
            preferenceDataService = inject(PreferenceDataService),
            store = inject<Store<fromRoot.IAppState>>(Store),
            authService = inject(AuthService)
        ) =>
            actions$.pipe(
                ofType(PreferenceActions.saveUserLang),
                withLatestFrom(store.select(fromRoot.getUserPreference)),
                exhaustMap(([action, preference]) =>
                    preferenceDataService
                        .bulkUpdatePreference([
                            {
                                ...preference,
                                language: action.lang,
                                user_id: authService.getUserId()
                            }
                        ])
                        .pipe(
                            switchMap((preference: Preference[]) =>
                                of(
                                    PreferenceActions.saveUserLangSuccess({
                                        lang: preference.shift().language
                                    })
                                )
                            )
                        )
                )
            )
    );
}
