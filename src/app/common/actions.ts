import { Action } from '@ngrx/store';
import { Event } from '../theme/components/event/event';
/*
List of events messages
*/
export class EventsActions {

    static CREATE_EVENT = 'CREATE_EVENT';
    static CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
    static CREATE_EVENT_FAIL = 'CREATE_EVENT_FAIL';

    static UPDATE_EVENT = 'UPDATE_EVENT';
    static UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
    static UPDATE_EVENT_FAIL = 'UPDATE_EVENT_FAIL';

    static DELETE_EVENT = 'DELETE_EVENT';
    static DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
    static DELETE_EVENT_FAIL = 'DELETE_EVENT_FAIL';

    static SAVE_EVENT = 'SAVE_EVENT';
    static SAVE_EVENT_SUCCESS = 'SAVE_EVENT_SUCCESS';
    static SAVE_EVENT_FAILURE = 'SAVE_EVENT_FAILURE';
    static ADD_EVENT_FROMSERVER = 'ADD_EVENT_FROMSERVER';

    static FETCH_EVENTS = 'FETCH_EVENTS';
    static FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
    static FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

    static TOGGLE_EVENT = 'TOGGLE_EVENT';
    static TOGGLE_EVENT_SUCCESS = 'TOGGLE_EVENT_SUCCESS';
    static TOGGLE_EVENT_FAILURE = 'TOGGLE_EVENT_FAILURE';


    // ===================================
    //  CREATE
    // -----------------------------------
    createEvent(event: Event): Action {
        return {
            type: EventsActions.CREATE_EVENT,
            payload: {
                event
            }
        };
    }

    createEventFail(error: any): Action {
        return {
            type: EventsActions.CREATE_EVENT_FAIL,
            payload: error
        };
    }

    createEventSuccess(event: Event): Action {
        return {
            type: EventsActions.CREATE_EVENT_SUCCESS,
            payload: {
                event
            }
        };
    }


    // ===================================
    //  DELETE
    // -----------------------------------
    deleteEvent(id: number): Action {
        return {
            type: EventsActions.DELETE_EVENT,
            payload: {
                id
            }
        };
    }

    deleteEventFail(error: any): Action {
        return {
            type: EventsActions.DELETE_EVENT_FAIL,
            payload: error
        };
    }

    deleteEventSuccess(event: Event): Action {
        return {
            type: EventsActions.DELETE_EVENT_SUCCESS,
            payload: {
                event
            }
        };
    }


    // ===================================
    //  FETCH
    // -----------------------------------

    fetchEvents(): Action {
        return {
            type: EventsActions.FETCH_EVENTS
        };
    }

    fetchEventsFailed(error: any): Action {
        return {
            type: EventsActions.FETCH_EVENTS_FAILURE,
            payload: error
        };
    }

    fetchEventsSuccess(events: Event[]): Action {
        return {
            type: EventsActions.FETCH_EVENTS_SUCCESS,
            payload: {
                events
            }
        };
    }


    // ===================================
    //  UPDATE
    // -----------------------------------

    updateEvent(id: number, changes: Event): Action {
        return {
            type: EventsActions.UPDATE_EVENT,
            payload: {
                changes,
                id
            }
        };
    }

    updateEventFail(error: any): Action {
        return {
            type: EventsActions.UPDATE_EVENT_FAIL,
            payload: error
        };
    }

    updateEventSuccess(event: Event): Action {
        return {
            type: EventsActions.UPDATE_EVENT_SUCCESS,
            payload: {
                event
            }
        };
    }


}
