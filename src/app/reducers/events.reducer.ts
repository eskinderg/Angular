import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as EventsActions from '../actions/event.action';
import { Event } from '../models/event';

export interface IEventsState {
  events: Event[];
  isLoading: boolean;
}

export const initialState: IEventsState = {
  events: [],
  isLoading: false
};

export const eventsReducer = createReducer<IEventsState>(
  initialState,
  on(
    EventsActions.eventsClear,
    (state, _action) => ({
      ...state,
      events: []
    })),
  on(
    EventsActions.createEventSuccess,
    (state, action): IEventsState => ({
      ...state,
      events: [action.payload, ...state.events]
    })),
  on(
    EventsActions.fetchEventsSuccess,
    (state, action): IEventsState => ({
      ...state,
      events: action.payload.slice().reverse() || [] // reverse array to show the most recent
    })),
  on(
    EventsActions.toggleEventSuccess,
    EventsActions.updateEventSuccess,
    (state, action): IEventsState => ({
      ...state,
      events: state.events.map((event) => {
        return (event.id === action.payload.id) ? action.payload : event
      })
    })),
  on(
    EventsActions.deleteEventSuccess,
    (state, action): IEventsState => ({
      ...state,
      events: state.events.filter((event: Event) => {
        return event.id !== action.payload.id;
      })
    })),
  on(
    EventsActions.fetchEventsStart,
    (state, _action): IEventsState => ({ ...state, isLoading: true })),
  on(
    EventsActions.fetchEventsComplete,
    (state, _action): IEventsState => ({ ...state, isLoading: false })),
  on(
    EventsActions.deleteEventsSuccess,
    (state, action): IEventsState => ({
      ...state,
      events: state.events.filter((event: Event) => {
        return action.payload.every(e => e.id !== event.id)
      })
    })),

)

export const getEventState = createFeatureSelector<IEventsState>('events');

export const getEvents = createSelector(getEventState, (state: IEventsState) => state.events);

export const getEventsLength = createSelector(getEventState, (state: IEventsState) => state.events.length)

export const getIsLoading = createSelector(getEventState, (state: IEventsState) => state.isLoading)

export const getItemById = (id: number) => createSelector(getEventState, (allItems) => {
  if (allItems.events) {
    return allItems.events.find(item => {
      return item.id === id;
    });
  } else {
    return {};
  }
});
