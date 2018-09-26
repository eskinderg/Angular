import { Action } from '@ngrx/store';
// import { Event } from '../models/event';
/**
 List of auth messages
 **/

export const LOGIN_EVENT = 'LOGIN_EVENT';
export const LOGIN_EVENT_SUCCESS = 'LOGIN_EVENT_SUCCESS';
export const LOGIN_EVENT_FAIL = 'LOGIN_EVENT_FAIL';
export const AUTH_INIT = '@ngrx/store/init';
export const AUTH_INIT_SUCCESS = 'AUTH_INIT_SUCCESS';
export const LOAD_PROFILE = ' LOAD_PROFILE';
export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
export const LOAD_PROFILE_FAIL = 'LOAD_PROFILE_FAIL';
export const ROUTE_TO_HOME = 'ROUTE_TO_HOME'
export const ROUTE_TO_LOGIN = 'ROUTE_TO_LOGIN'
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';


export class TokenExpire implements Action {

  readonly type = TOKEN_EXPIRE;

  constructor (public message?: string) { }
}

export class RouteToLogin implements Action {

  readonly type = ROUTE_TO_LOGIN;

  constructor (public message?: string) { }
}

export class RouteToHome implements Action {

  readonly type = ROUTE_TO_HOME;

  constructor () { }
}


export class LoginEvent implements Action {

  readonly type = LOGIN_EVENT;

  constructor (public username: string, public password: string ) { }
}

export class LoginEventFail implements Action {

  readonly type = LOGIN_EVENT_FAIL;

  constructor (public payload: any) { }
}

export class LoginEventSuccess implements Action {

  readonly type = LOGIN_EVENT_SUCCESS;

  constructor () { }
}

export class AuthInit implements Action {

  readonly type = AUTH_INIT;

  constructor () { }
}

export class AuthInitSuccess implements Action {

  readonly type = AUTH_INIT_SUCCESS;

  constructor (public payload: any) { }
}


export class LoadProfile implements Action {

  readonly type = LOAD_PROFILE;

  constructor () { }
}

export class LoadProfileSuccess implements Action {

  readonly type = LOAD_PROFILE_SUCCESS;

  constructor (public profile: any) { }
}

export class LoadProfileFail implements Action {

  readonly type = LOAD_PROFILE_FAIL;

  constructor (public payload: any) { }
}


export class Logout implements Action {

  readonly type = LOGOUT;

  constructor (public message?: string ) { }
}

export class LogoutSuccess implements Action {

  readonly type = LOGOUT_SUCCESS;

  constructor () { }
}

export class LogoutFail implements Action {

  readonly type = LOGOUT_FAIL;

  constructor () { }
}

export type Actions =
  LoginEvent | LoginEventSuccess | LoginEventFail |
  AuthInit | AuthInitSuccess |
  LoadProfile | LoadProfileSuccess | LoadProfileFail |
  Logout | LogoutSuccess | LogoutFail |
  RouteToHome;

