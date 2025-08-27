import { createAction, props } from '@ngrx/store';
import { Event } from '../../fragments/components/event/event';

/*
 List of events messages
 */

// ===================================
//  CREATE
// -----------------------------------

export const createEvent = createAction('[EVENT] CREATE_EVENT', props<{ event: Event }>());

export const createEventFail = createAction('[EVENT] CREATE_EVENT_FAIL', props<{ event: Event }>());

export const createEventSuccess = createAction('[EVENT] CREATE_EVENT_SUCCESS', props<{ event: Event }>());

// ===================================
//  DELETE
// -----------------------------------

export const deleteEvent = createAction('[EVENT] DELETE_EVENT', props<{ event: Event }>());

export const deleteEventFail = createAction('[EVENT] DELETE_EVENT_FAIL', props<{ event: Event }>());

export const deleteEventSuccess = createAction('[EVENT] DELETE_EVENT_SUCCESS', props<{ event: Event }>());

export const deleteEvents = createAction('[EVENT] DELETE_EVENTS', props<{ events: Event[] }>());

export const deleteEventsFail = createAction('[EVENT] DELETE_EVENTS_FAIL', props<{ events: Event[] }>());

export const deleteEventsSuccess = createAction(
    '[EVENT] DELETE_EVENTS_SUCCESS',
    props<{ events: Event[] }>()
);

// ===================================
//  FETCH
// -----------------------------------

export const fetchEvents = createAction('[EVENT] FETCH_EVENTS');

export const fetchEventsFailed = createAction('[EVENT] FETCH_EVENTS_FAILURE', props<{ event: Event }>());

export const fetchEventsSuccess = createAction('[EVENT] FETCH_EVENTS_SUCCESS', props<{ events: Event[] }>());

// ===================================
//  UPDATE
// -----------------------------------

export const updateEvent = createAction('[EVENT] UPDATE_EVENT', props<{ payload: any }>());

export const updateEventFail = createAction('[EVENT] UPDATE_EVENT_FAIL', props<{ event: Event }>());

export const updateEventSuccess = createAction('[EVENT] UPDATE_EVENT_SUCCESS', props<{ event: Event }>());

// ===================================
//  TOGGLE
// -----------------------------------

export const toggleEvent = createAction('[EVENT] TOGGLE_EVENT', props<{ payload: any }>());

export const toggleEventFail = createAction('[EVENT] TOGGLE_EVENT_FAIL', props<{ event: Event }>());

export const toggleEventSuccess = createAction('[EVENT] TOGGLE_EVENT_SUCCESS', props<{ event: Event }>());

// ===================================
//  CLEAR
// -----------------------------------

export const fetchEventsStart = createAction('[EVENT] FETCH_EVENTS_START');

export const fetchEventsComplete = createAction('[EVENT] FETCH_EVENTS_COMPLETE');

export const eventsClear = createAction('[EVENT] EVENTS_CLEAR');
