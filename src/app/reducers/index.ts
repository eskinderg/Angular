import { ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { notesReducer, NotesState } from './note.reducer';
import { eventsReducer, EventsState } from './events.reducer';
import { authReducer, AuthState } from './auth.reducer';
import { profileReducer, PreferenceState } from './preference.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AppRouterState } from './route.reducer';

export interface IAppState {
  notes      : NotesState;
  events     : EventsState; // append any more states here
  profile    : AuthState;
  preference : PreferenceState;
  router     : RouterReducerState<AppRouterState>;
}

export const appReducer: ActionReducerMap<IAppState> = {
  notes      : notesReducer,         // append any additional reducers here
  events     : eventsReducer,
  profile    : authReducer,
  preference : profileReducer,
  router     : routerReducer
}

export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
  return function(state: IAppState, action: any): IAppState {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<IAppState>[] = !environment.production
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
