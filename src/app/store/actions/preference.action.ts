import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/admin/models/user';
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

export const saveUserPreference = createAction(
    '[PREFERENCE] SAVE_USER_PREFERENCE',
    props<{ preference: Preference }>()
);

export const saveUserPreferenceSuccess = createAction(
    '[PREFERENCE] SAVE_USER_PREFERENCE_SUCCESS',
    props<{ preference: Preference }>()
);

export const saveUserPreferenceFail = createAction(
    '[PREFERENCE] SAVE_USER_PREFERENCE_FAIL',
    props<{ error: any }>()
);

export const saveUserLang = createAction('[PREFERENCE] SAVE_USER_LANGUAGE', props<{ lang: string }>());

export const saveUserLangSuccess = createAction(
    '[PREFERENCE] SAVE_USER_LANGUAGE_SUCCESS',
    props<{ lang: string }>()
);

export const saveUserLangFail = createAction('[PREFERENCE] SAVE_USER_LANGUAGE_FAIL', props<{ error: any }>());

export const loadUserInfo = createAction('[PREFERENCE] LOAD_USER_INFO');

export const loadUserInfoSuccess = createAction(
    '[PREFERENCE] LOAD_USER_INFO_SUCCESS',
    props<{ user: User }>()
);

export const loadUserInfoFail = createAction('[PREFERENCE] LOAD_USER_INFO_FAIL', props<{ error: any }>());

export const updateUserInfo = createAction('[PREFERENCE] UPDATE_USER_INFO', props<{ user: User }>());

export const updateUserInfoSuccess = createAction(
    '[PREFERENCE] UPDATE_USER_INFO_SUCCESS',
    props<{ user: User }>()
);

export const updateUserInfoFail = createAction('[PREFERENCE] UPDATE_USER_INFO_FAIL', props<{ error: any }>());
