import { createAction, props } from '@ngrx/store';

/**
 List of auth messages
 **/

export const tokenExpire = createAction('[AUTH] TOKEN_EXPIRE', props<{ message?: string }>());

export const routeToLogin = createAction('[AUTH] ROUTE_TO_LOGIN', props<{ message?: string }>());

export const routeToHome = createAction('[AUTH] ROUTE_TO_HOME');

export const routeToDashboard = createAction('[AUTH] ROUTE_TO_DASHBOARD');

export const loginEvent = createAction('[AUTH] LOGIN_EVENT', props<{ username: string; password: string }>());

export const logIn = createAction('[AUTH] LOG_IN');

export const loginWithUserNamePassword = createAction(
    '[AUTH] LOGIN_WITH_USERNAME_PASSWORD',
    props<{ username: string; password: string }>()
);

export const loginEventFail = createAction('[AUTH] LOGIN_EVENT_FAIL', props<{ payload: any }>());

// export const loginEventSuccess = createAction('[AUTH] LOGIN_EVENT_SUCCESS');

export const logInSuccess = createAction('[AUTH] LOG_IN_SUCCESS');

export const logOutSuccess = createAction('[AUTH] LOG_OUT_SUCCESS');

export const adminActions = createAction('[AUTH] ADMIN_USER_ACTIONS', props<{ isAdmin: boolean }>());

export const loginWithUsernamePasswordSuccess = createAction('[AUTH] LOGIN_WITH_PASSWORD_SUCCESS');

export const startLoading = createAction('[AUTH] START_LOADING');

export const stopLoading = createAction('[AUTH] STOP_LOADING');

export const setIsLoggedIn = createAction('[AUTH] SET_IS_LOGGED_IN', props<{ isLoggedIn: boolean }>());

export const getIsLoggedInSuccess = createAction(
    '[AUTH] GET_IS_LOGGED_IN_SUCCESS',
    props<{ isLoggedIn: boolean }>()
);

export const getIsLoggedIn = createAction('[AUTH] GET_IS_LOGGED_IN');

export const authInit = createAction('[AUTH] AUTH_INIT');

export const authInitSuccess = createAction('[AUTH] AUTH_INIT_SUCCESS', props<{ payload: any }>());

export const loadProfile = createAction('[AUTH] LOAD_PROFILE');

export const loadProfileSuccess = createAction('[AUTH] LOAD_PROFILE_SUCCESS', props<{ profile: any }>());

export const loadProfileFail = createAction('[AUTH] LOAD_PROFILE_FAIL', props<{ payload: any }>());

export const logout = createAction('[AUTH] LOGOUT', props<{ message?: string }>());

export const logoutFail = createAction('[AUTH] LOGOUT_FAIL');
