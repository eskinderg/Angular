import { ActionReducer} from '@ngrx/store';
import { ActionReducerMap, MetaReducer} from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as fromNotes from './notes.reducer';
import * as fromEvents from './events.reducer';
import * as fromAuth from './auth.reducer';

export interface AppState {
  notes   : fromNotes.NotesState;
  events  : fromEvents.EventsState; // append more states here
  profile : fromAuth.AuthState;
}

export const reducer: ActionReducerMap<AppState> = {
  notes: fromNotes.reducer,         // append additional reducers here
  events: fromEvents.reducer,
  profile: fromAuth.reducer
}

// tslint:disable-next-line:no-shadowed-variable
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
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
