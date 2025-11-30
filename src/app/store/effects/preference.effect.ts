import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as PreferenceActions from '../actions/preference.action';
import * as fromRoot from '../reducers';
import { ThemeService } from '../../theme/theme.service';
import { PreferenceDataService } from 'src/app/preference/preference.data.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';

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

    savePreference = createEffect(
        (
            actions$ = inject(Actions),
            preferenceDataService = inject(PreferenceDataService),
            store = inject<Store<fromRoot.IAppState>>(Store),
            authService = inject(AuthService)
        ) =>
            actions$.pipe(
                ofType(PreferenceActions.toggleDarkModeSuccess),
                withLatestFrom(store.select(fromRoot.getUserPreference)),
                withLatestFrom(store.select(fromRoot.isDarkMode)),
                exhaustMap(([[_action, preference], isDarkMode]) =>
                    preferenceDataService.bulkUpdatePreference([
                        { ...preference, user_id: authService.getUserId(), dark_mode: JSON.parse(isDarkMode) }
                    ])
                )
            ),
        { dispatch: false }
    );
}
