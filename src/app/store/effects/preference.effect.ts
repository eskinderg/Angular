import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as PreferenceActions from '../actions/preference.action';
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
}
