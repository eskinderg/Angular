import { createAction, props } from '@ngrx/store';

/**
 List of profile messages
 **/

export const toggleDarkMode = createAction('[PREFERENCE] TOGGLE_DARK_MODE');

export const toggleDarkModeSuccess = createAction('[PREFERENCE] TOGGLE_DARK_MODE_SUCCESS');

export const getDarkMode = createAction('[PREFERENCE] GET_DARK_MODE');

export const getDarkModeSuccess = createAction(
    '[PREFERENCE] GET_DARK_MODE_SUCCESS',
    props<{ isDarkMode: boolean }>()
);

export const afterLogInSuccess = createAction('[PREFERENCE] AFTER_LOG_IN_SUCCESS');

export const logInSuccess = createAction('[PREFERENCE] LOG_IN_SUCCESS');

export const logOutSuccess = createAction('[PREFERENCE] LOG_OUT_SUCCESS');

export const startLoading = createAction('[PREFERENCE] START_LOADING');

export const stopLoading = createAction('[PREFERENCE] STOP_LOADING');

export const logIn = createAction('[PREFERENCE] LOG_IN');

export const getIsLoggedIn = createAction('[PREFERENCE] GET_IS_LOGGED_IN');

export const getIsLoggedInSuccess = createAction(
    '[PREFERENCE] GET_IS_LOGGED_IN_SUCCESS',
    props<{ isLoggedIn: boolean }>()
);

export const setIsLoggedIn = createAction('[PREFERENCE] SET_IS_LOGGED_IN', props<{ isLoggedIn: boolean }>());

export const setIsLoggedInSuccess = createAction(
    '[PREFERENCE] SET_IS_LOGGED_IN_SUCCESS',
    props<{ isLoggedIn: boolean }>()
);
