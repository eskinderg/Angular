import { storeFreeze } from 'ngrx-store-freeze';
// import {  } from 'reselect';
import { combineReducers, ActionReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import { ActionReducerMap, MetaReducer} from '@ngrx/store';
// import { createSelector } from 'reselect';
import { environment } from '../../environments/environment';

import * as fromNotes from './notes';
import * as fromEvents from './events';

export interface State {
  notes: fromNotes.State;
  events: fromEvents.State; // append more states here
}

export const reducer: ActionReducerMap<State> = {
  notes: fromNotes.reducer,         //append additional reducers here
  events: fromEvents.reducer
}


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> =  combineReducers(reducers);


//   if (environment.production) {
//     return productionReducer( state, action );
//   }
//   else {
//     return productionReducer( state, action );
//     // return developmentReducer( state, action );
//   }

// }

// export const getEventsState = (state: State) => state.events;
// export const getEventsState = (state: fromEvents.State) => state;
// export const getEventsState = createFeatureSelector<fromEvents.State>('events');
// export const getEventEntities = createSelector(getEventsState, ( state: fromEvents.State )=> state.events);

// export const getNotesState = (state: fromNotes.State) => state;
// export const getNoteEntities = createSelector(getNotesState, fromNotes.getNotes);
// export const getNoteEntities = createSelector(getNotesState, ( state: fromNotes.State )=> state.notes);
