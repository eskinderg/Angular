import { createAction, props } from '@ngrx/store';
import { Event } from '../../models/event';

/*
 List of events messages
 */

// ===================================
//  CREATE
// -----------------------------------

export const createEvent = createAction('[EVENT] CREATE_EVENT', props<{ payload: Event }>());

export const createEventFail = createAction('[EVENT] CREATE_EVENT_FAIL', props<{ payload: Event }>());

export const createEventSuccess = createAction('[EVENT] CREATE_EVENT_SUCCESS', props<{ payload: Event }>());

// ===================================
//  DELETE
// -----------------------------------

export const deleteEvent = createAction('[EVENT] DELETE_EVENT', props<{ payload: Event }>());

export const deleteEventFail = createAction('[EVENT] DELETE_EVENT_FAIL', props<{ payload: Event }>());

export const deleteEventSuccess = createAction('[EVENT] DELETE_EVENT_SUCCESS', props<{ payload: Event }>());

export const deleteEvents = createAction('[EVENT] DELETE_EVENTS', props<{ payload: Event[] }>());

export const deleteEventsFail = createAction('[EVENT] DELETE_EVENTS_FAIL', props<{ payload: Event[] }>());

export const deleteEventsSuccess = createAction('[EVENT] DELETE_EVENTS_SUCCESS', props<{ payload: Event[] }>());

// ===================================
//  FETCH
// -----------------------------------

export const fetchEvents = createAction('[EVENT] FETCH_EVENTS');

export const fetchEventsFailed = createAction('[EVENT] FETCH_EVENTS_FAILURE', props<{ payload: Event }>());

export const fetchEventsSuccess = createAction('[EVENT] FETCH_EVENTS_SUCCESS', props<{ payload: Event[] }>());

// ===================================
//  UPDATE
// -----------------------------------

export const updateEvent = createAction('[EVENT] UPDATE_EVENT', props<{ payload: any }>());

export const updateEventFail = createAction('[EVENT] UPDATE_EVENT_FAIL', props<{ payload: Event }>());

export const updateEventSuccess = createAction('[EVENT] UPDATE_EVENT_SUCCESS', props<{ payload: Event }>());

// ===================================
//  TOGGLE
// -----------------------------------

export const toggleEvent = createAction('[EVENT] TOGGLE_EVENT', props<{ payload: any }>());

export const toggleEventFail = createAction('[EVENT] TOGGLE_EVENT_FAIL', props<{ payload: Event }>());

export const toggleEventSuccess = createAction('[EVENT] TOGGLE_EVENT_SUCCESS', props<{ payload: Event }>());

// ===================================
//  CLEAR
// -----------------------------------

export const fetchEventsStart = createAction('[EVENT] FETCH_EVENTS_START');

export const fetchEventsComplete = createAction('[EVENT] FETCH_EVENTS_COMPLETE');

export const eventsClear = createAction('[EVENT] EVENTS_CLEAR');
