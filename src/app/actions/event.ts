import { Action } from '@ngrx/store';
import { Event } from '../models/event';
/**
 List of events messages
 **/

 export const CREATE_EVENT = 'CREATE_EVENT';
 export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
 export const CREATE_EVENT_FAIL = 'CREATE_EVENT_FAIL';

 export const UPDATE_EVENT = 'UPDATE_EVENT';
 export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
 export const UPDATE_EVENT_FAIL = 'UPDATE_EVENT_FAIL';

 export const DELETE_EVENT = 'DELETE_EVENT';
 export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
 export const DELETE_EVENT_FAIL = 'DELETE_EVENT_FAIL';

 export const SAVE_EVENT = 'SAVE_EVENT';
 export const SAVE_EVENT_SUCCESS = 'SAVE_EVENT_SUCCESS';
 export const SAVE_EVENT_FAILURE = 'SAVE_EVENT_FAILURE';
 export const ADD_EVENT_FROMSERVER = 'ADD_EVENT_FROMSERVER';

 export const FETCH_EVENTS = 'FETCH_EVENTS';
 export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
 export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

 export const TOGGLE_EVENT = 'TOGGLE_EVENT';
 export const TOGGLE_EVENT_SUCCESS = 'TOGGLE_EVENT_SUCCESS';
 export const TOGGLE_EVENT_FAIL = 'TOGGLE_EVENT_FAIL';

 // ===================================
 //  CREATE
 // -----------------------------------

 export class createEvent implements Action {

   readonly type = CREATE_EVENT;

   constructor (public payload: Event){  }
 }

 export class createEventFail implements Action {

   readonly type = CREATE_EVENT_FAIL;

   constructor (public payload: Event){  }
 }

 export class createEventSuccess implements Action {

   readonly type = CREATE_EVENT_SUCCESS;

   constructor (public payload: Event){  }
 }

 // ===================================
 //  DELETE
 // -----------------------------------
 export class deleteEvent implements Action {

   readonly type = DELETE_EVENT;

   constructor (public payload: Event){  }
 }

 export class deleteEventFail implements Action {

   readonly type = DELETE_EVENT_FAIL;

   constructor (public payload: Event){  }
 }

 export class deleteEventSuccess implements Action {

   readonly type = DELETE_EVENT_SUCCESS;

   constructor (public payload: Event){  }
 }

 // ===================================
 //  FETCH
 // -----------------------------------

 export class fetchEvents implements Action {

   readonly type = FETCH_EVENTS;

   constructor (){  }
 }

 export class fetchEventsFailed implements Action {

   readonly type = FETCH_EVENTS_FAILURE;

   constructor (public payload: Event){  }
 }

 export class fetchEventsSuccess implements Action {

   readonly type = FETCH_EVENTS_SUCCESS;

   constructor (public payload: Event[]){  }
 }

 // ===================================
 //  UPDATE
 // -----------------------------------

 export class updateEvent implements Action {

   readonly type = UPDATE_EVENT;

   constructor (public payload: any){  }
 }

 export class updateEventFail implements Action {

   readonly type = UPDATE_EVENT_FAIL;

   constructor (public payload: Event){  }
 }

 export class updateEventSuccess implements Action {

   readonly type = UPDATE_EVENT_SUCCESS;

   constructor (public payload: Event){  }
 }


 // ===================================
 //  TOGGLE Complete
 // -----------------------------------

 export class toggleEvent implements Action {

   readonly type = TOGGLE_EVENT;

   constructor (public payload: any){  }
 }

 export class toggleEventFail implements Action {

   readonly type = TOGGLE_EVENT_FAIL;

   constructor (public payload: Event){  }
 }

 export class toggleEventSuccess implements Action {

   readonly type = TOGGLE_EVENT_SUCCESS;

   constructor (public payload: Event){  }
 }

 export type Actions = createEvent | createEventSuccess | createEventFail |
   updateEvent| updateEventSuccess | updateEventFail |
   fetchEvents | fetchEventsSuccess | fetchEventsFailed |
   toggleEvent | toggleEventSuccess | toggleEventFail |
   deleteEvent| deleteEventSuccess | deleteEventFail;

