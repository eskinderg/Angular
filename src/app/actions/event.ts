import { Action } from '@ngrx/store';
import { Event } from '../models/event';

export const CREATE_EVENT         = 'CREATE_EVENT';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAIL    = 'CREATE_EVENT_FAIL';

export const UPDATE_EVENT         = 'UPDATE_EVENT';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAIL    = 'UPDATE_EVENT_FAIL';

export const DELETE_EVENT         = 'DELETE_EVENT';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAIL    = 'DELETE_EVENT_FAIL';

export const SAVE_EVENT           = 'SAVE_EVENT';
export const SAVE_EVENT_SUCCESS   = 'SAVE_EVENT_SUCCESS';
export const SAVE_EVENT_FAILURE   = 'SAVE_EVENT_FAILURE';
export const ADD_EVENT_FROMSERVER = 'ADD_EVENT_FROMSERVER';

export const FETCH_EVENTS         = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const TOGGLE_EVENT         = 'TOGGLE_EVENT';
export const TOGGLE_EVENT_SUCCESS = 'TOGGLE_EVENT_SUCCESS';
export const TOGGLE_EVENT_FAIL    = 'TOGGLE_EVENT_FAIL';

export const EVENTS_CLEAR         = 'EVENTS_CLEAR';

// ===================================
//  CREATE
// -----------------------------------

export class CreateEvent implements Action {

  readonly type = CREATE_EVENT;

  constructor (public payload: Event) { }
}

export class CreateEventFail implements Action {

  readonly type = CREATE_EVENT_FAIL;

  constructor (public payload: Event) { }
}

export class CreateEventSuccess implements Action {

  readonly type = CREATE_EVENT_SUCCESS;

/**
* @param { Event } payload - The new created event
*/
  constructor (public payload: Event) { }
}

// ===================================
//  DELETE
// -----------------------------------
export class DeleteEvent implements Action {

  readonly type = DELETE_EVENT;

  constructor (public payload: Event) { }
}

export class DeleteEventFail implements Action {

  readonly type = DELETE_EVENT_FAIL;

  constructor (public payload: Event) { }
}

export class DeleteEventSuccess implements Action {

  readonly type = DELETE_EVENT_SUCCESS;

  constructor (public payload: Event) { }
}

// ===================================
//  FETCH
// -----------------------------------

export class FetchEvents implements Action {

  readonly type = FETCH_EVENTS;

  constructor () { }
}

export class FetchEventsFailed implements Action {

  readonly type = FETCH_EVENTS_FAILURE;

  constructor (public payload: Event) { }
}

export class FetchEventsSuccess implements Action {

  readonly type = FETCH_EVENTS_SUCCESS;

  constructor (public payload: Event[]) { }
}

// ===================================
//  UPDATE
// -----------------------------------

export class UpdateEvent implements Action {

  readonly type = UPDATE_EVENT;

  constructor (public payload: any) { }
}

export class UpdateEventFail implements Action {

  readonly type = UPDATE_EVENT_FAIL;

  constructor (public payload: Event) { }
}

export class UpdateEventSuccess implements Action {

  readonly type = UPDATE_EVENT_SUCCESS;

/**
* @param { Event } payload - Updated event
*/
  constructor (public payload: Event) { }
}


// ===================================
//  TOGGLE
// -----------------------------------

export class ToggleEvent implements Action {

  readonly type = TOGGLE_EVENT;

  constructor (public payload: any) { }
}

export class ToggleEventFail implements Action {

  readonly type = TOGGLE_EVENT_FAIL;

  constructor (public payload: Event) { }
}

export class ToggleEventSuccess implements Action {

  readonly type = TOGGLE_EVENT_SUCCESS;

  constructor (public payload: Event) { }
}

export class EventsClear implements Action {

  readonly type = EVENTS_CLEAR;

  constructor () { }
}

export type Actions =
  CreateEvent | CreateEventSuccess | CreateEventFail |
  UpdateEvent| UpdateEventSuccess | UpdateEventFail |
  FetchEvents | FetchEventsSuccess | FetchEventsFailed |
  ToggleEvent | ToggleEventSuccess | ToggleEventFail |
  DeleteEvent| DeleteEventSuccess | DeleteEventFail |
  EventsClear;

