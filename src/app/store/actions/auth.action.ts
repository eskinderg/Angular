import { createAction, props } from '@ngrx/store';

/**
 List of auth messages
 **/

export const tokenExpire = createAction('[AUTH] TOKEN_EXPIRE', props<{ message?: string }>());

export const routeToLogin = createAction('[AUTH] ROUTE_TO_LOGIN', props<{ message?: string }>());

export const routeToHome = createAction('[AUTH] ROUTE_TO_HOME');

export const loginEvent = createAction('[AUTH] LOGIN_EVENT', props<{ username: string; password: string }>());

export const loginEventFail = createAction('[AUTH] LOGIN_EVENT_FAIL', props<{ payload: any }>());

export const loginEventSuccess = createAction('[AUTH] LOGIN_EVENT_SUCCESS');

export const authInit = createAction('[AUTH] AUTH_INIT');

export const authInitSuccess = createAction('[AUTH] AUTH_INIT_SUCCESS', props<{ payload: any }>());

export const loadProfile = createAction('[AUTH] LOAD_PROFILE');

export const loadProfileSuccess = createAction('[AUTH] LOAD_PROFILE_SUCCESS', props<{ profile: any }>());

export const loadProfileFail = createAction('[AUTH] LOAD_PROFILE_FAIL', props<{ payload: any }>());

export const logout = createAction('[AUTH] LOGOUT', props<{ message?: string }>());

export const logoutSuccess = createAction('[AUTH] LOGOUT_SUCCESS');

export const logoutFail = createAction('[AUTH] LOGOUT_FAIL');
