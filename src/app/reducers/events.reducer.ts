import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as EventsActions from '../actions/event.action';
import { Event } from '../models/event';

export interface EventsState {
  events: Event[];
}

export const initialState: EventsState = {
  events: []
};

export const eventsReducer = createReducer(
  initialState,
  on(
    EventsActions.eventsClear,
    () => ({
      events: []
    })),
  on(
    EventsActions.createEventSuccess,
    (state, action): EventsState => ({
      events: [action.payload, ...state.events]
    })),
  on(
    EventsActions.fetchEventsSuccess,
    (_state, action): EventsState => ({
      events: action.payload.slice().reverse() || [] // reverse array to show the most recent
    })),
  on(
    EventsActions.toggleEventSuccess,
    EventsActions.updateEventSuccess,
    (state, action): EventsState => ({
      events: state.events.map((event) => {
        return (event.id === action.payload.id) ? action.payload : event
      })
    })),
  on(
    EventsActions.deleteEventSuccess,
    (state, action): EventsState => ({
      events: state.events.filter((event: Event) => {
        return event.id !== action.payload.id;
      })
    })),
  on(
    EventsActions.deleteEventsSuccess,
    (state, action): EventsState => ({
      events: state.events.filter((event: Event) => {
        return action.payload.every(e => e.id !== event.id)
      })
    })),

)

export const getEventState = createFeatureSelector<EventsState>('events');

export const getEvents = createSelector(getEventState, (state: EventsState) => state.events);

export const getEventsLength = createSelector(getEventState, (state: EventsState) => state.events.length)

export const getItemById = (id: number) => createSelector(getEventState, (allItems) => {
  if (allItems.events) {
    return allItems.events.find(item => {
      return item.id === id;
    });
  } else {
    return {};
  }
});
