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


export class tokenExpire implements Action {

  readonly type = TOKEN_EXPIRE;

  constructor (public message?:string){  }
}

export class routeToLogin implements Action {

  readonly type = ROUTE_TO_LOGIN;

  constructor (public message?:string){  }
}

export class routeToHome implements Action {

  readonly type = ROUTE_TO_HOME;

  constructor (){  }
}


export class loginEvent implements Action {

  readonly type = LOGIN_EVENT;

  constructor (public username: string,public password: string ){  }
}

export class loginEventFail implements Action {

  readonly type = LOGIN_EVENT_FAIL;

  constructor (public payload: any){  }
}

export class loginEventSuccess implements Action {

  readonly type = LOGIN_EVENT_SUCCESS;

  constructor (){  }
}

export class authInit implements Action {

  readonly type = AUTH_INIT;

  constructor (){  }
}

export class authInitSuccess implements Action {

  readonly type = AUTH_INIT_SUCCESS;

  constructor (public payload:any){  }
}


export class loadProfile implements Action {

  readonly type = LOAD_PROFILE;

  constructor (){  }
}

export class loadProfileSuccess implements Action {

  readonly type = LOAD_PROFILE_SUCCESS;

  constructor (public profile: any){  }
}

export class loadProfileFail implements Action {

  readonly type = LOAD_PROFILE_FAIL;

  constructor (public payload: any){  }
}


export class logout implements Action {

  readonly type = LOGOUT;

  constructor (message?: string ){  }
}

export class logoutSuccess implements Action {

  readonly type = LOGOUT_SUCCESS;

  constructor (){  }
}

export class logoutFail implements Action {

  readonly type = LOGOUT_FAIL;

  constructor (){  }
}

export type Actions = loginEvent | loginEventSuccess | loginEventFail |
                      authInit | authInitSuccess |
  loadProfile | loadProfileSuccess | loadProfileFail |
  logout | logoutSuccess | logoutFail |
  routeToHome;

