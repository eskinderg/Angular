import { createAction, props } from '@ngrx/store';
import { Preference } from 'src/app/models/preference';

/**
 List of preference messages
 **/

export const toggleDarkMode = createAction('[PREFERENCE] TOGGLE_DARK_MODE');

export const toggleDarkModeSuccess = createAction('[PREFERENCE] TOGGLE_DARK_MODE_SUCCESS');

export const getDarkMode = createAction('[PREFERENCE] GET_DARK_MODE');

export const getDarkModeSuccess = createAction(
    '[PREFERENCE] GET_DARK_MODE_SUCCESS',
    props<{ isDarkMode: boolean }>()
);

export const loadUserPreference = createAction('[PREFERENCE] LOAD_USER_PREFERENCE');

export const loadUserPreferenceSuccess = createAction(
    '[PREFERENCE] LOAD_USER_PREFERENCE_SUCCESS',
    props<{ preference: Preference }>()
);

export const loadUserPreferenceFail = createAction(
    '[PREFERENCE] LOAD_USER_PREFERENCE_FAIL',
    props<{ error: any }>()
);
