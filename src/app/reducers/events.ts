import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as EventsActions from '../actions/event';
import { Event } from '../models/event';

export interface State {
  events: Event[];
}

export const initialState: State = {
  events: []
};

export function reducer(state:State = initialState, action: EventsActions.Actions): State {

  switch (action.type) {

    case EventsActions.CREATE_EVENT_SUCCESS:
      return {
        events: [...state.events, action.payload]
      };

 case EventsActions.FETCH_EVENTS_SUCCESS:
   return {
     events: action.payload || []
   };

 case EventsActions.UPDATE_EVENT_SUCCESS:
   return Object.assign({}, state, {
     events: state.events.map((event) => {
       return  (event.id==action.payload.id) ? action.payload: event
     })
   });

 case EventsActions.DELETE_EVENT_SUCCESS:
   return Object.assign({}, state, {
     events: state.events.filter((event: Event) => {
       return event.id !== action.payload.id;
     })
   });

 default:
   return state;
  }
};

export const getEventState = createFeatureSelector<State>('events');

export const getEvents = createSelector(getEventState, (state: State)=> state.events);
