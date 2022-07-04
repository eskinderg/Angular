import { createAction, props } from '@ngrx/store';
import { Event } from '../models/event';

// ===================================
//  CREATE
// -----------------------------------

export const createEvent = createAction(
  'CREATE_EVENT',
  props<{ payload: Event }>()
)

export const createEventFail = createAction(
  'CREATE_EVENT_FAIL',
  props<{ payload: Event }>()
)

export const createEventSuccess = createAction(
  'CREATE_EVENT_SUCCESS',
  props<{ payload: Event }>()
)

// ===================================
//  DELETE
// -----------------------------------

export const deleteEvent = createAction(
  'DELETE_EVENT',
  props<{ payload: Event }>()
)

export const deleteEventFail = createAction(
  'DELETE_EVENT_FAIL',
  props<{ payload: Event }>()
)

export const deleteEventSuccess = createAction(
  'DELETE_EVENT_SUCCESS',
  props<{ payload: Event }>()
)
// ===================================
//  FETCH
// -----------------------------------

export const fetchEvents = createAction(
  'FETCH_EVENTS'
)

export const fetchEventsFailed = createAction(
  'FETCH_EVENTS_FAILURE',
  props<{ payload: Event }>()
)

export const fetchEventsSuccess = createAction(
  'FETCH_EVENTS_SUCCESS',
  props<{ payload: Event[] }>()
)

// ===================================
//  UPDATE
// -----------------------------------

export const updateEvent = createAction(
  'UPDATE_EVENT',
  props<{ payload: any }>()
)

export const updateEventFail = createAction(
  'UPDATE_EVENT_FAIL',
  props<{ payload: Event }>()
)

export const updateEventSuccess = createAction(
  'UPDATE_EVENT_SUCCESS',
  props<{ payload: Event }>()
)

// ===================================
//  TOGGLE
// -----------------------------------

export const toggleEvent = createAction(
  'TOGGLE_EVENT',
  props<{ payload: any }>()
)

export const toggleEventFail = createAction(
  'TOGGLE_EVENT_FAIL',
  props<{ payload: Event }>()
)

export const toggleEventSuccess = createAction(
  'TOGGLE_EVENT_SUCCESS',
  props<{ payload: Event }>()
)

// ===================================
//  CLEAR
// -----------------------------------

export const eventsClear = createAction(
  'EVENTS_CLEAR'
)
