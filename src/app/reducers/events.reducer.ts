import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as EventsActions from '../actions/event.action';
import { Event } from '../models/event';

export interface State {
  events: Event[];
}

export const initialState: State = {
  events: []
};

export const reducer = createReducer(
  initialState,
  on(
    EventsActions.eventsClear,
    () => ({
      events: []
    })),
  on(
    EventsActions.createEventSuccess,
    (state, action): State => ({
      events: [action.payload, ...state.events]
    })),
  on(
    EventsActions.fetchEventsSuccess,
    (state, action): State => ({
      events: action.payload.slice().reverse() || [] // reverse array to show the most recent
    })),
  on(
    EventsActions.toggleEventSuccess,
    EventsActions.updateEventSuccess,
    (state, action): State => ({
      events: state.events.map((event) => {
        return (event.id === action.payload.id) ? action.payload : event
      })
    })),
  on(
    EventsActions.deleteEventSuccess,
    (state, action): State => ({
      events: state.events.filter((event: Event) => {
        return event.id !== action.payload.id;
      })
    })),

)

export const getEventState = createFeatureSelector<State>('events');

export const getEvents = createSelector(getEventState, (state: State) => state.events);
