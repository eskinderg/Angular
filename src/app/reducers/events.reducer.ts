import { ActionReducer, Action } from '@ngrx/store';
import { EventsActions } from '../common/actions';
import { Event } from '../theme/components/event/event';

export function events(state: Event[] = [], { payload, type }: Action) {
    switch (type) {

        case EventsActions.CREATE_EVENT_SUCCESS:
            return [...state, payload.event];

        case EventsActions.FETCH_EVENTS_SUCCESS:
            return payload.events || [];

        case EventsActions.UPDATE_EVENT_SUCCESS:
            return state.map((event: Event) => {
                return event.id === payload.event.id ? payload.event : event;
            });

        case EventsActions.DELETE_EVENT:            /* TODO item removed before being removed from the server */
            return state.filter((event: Event) => {
                return event.id !== payload.id;
            });

        default:
            return state;
    }
};
