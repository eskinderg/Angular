import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { notesReducer, INotesState } from './note.reducer';
import { eventsReducer, IEventsState } from './events.reducer';
import { authReducer, IAuthState } from './auth.reducer';
import { profileReducer, IPreferenceState } from './preference.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { IAppRouterState } from './route.reducer';
import { INotificationState, notificationReducer } from './notification.reducer';
import { IMovieState, movieReducer } from './movie.reducer';
import { adminReducer, IAdminNotesState } from 'src/app/admin/store/reducers/admin.reducer';

export interface IAppState {
    notes: INotesState;
    events: IEventsState; // append any more states here
    auth: IAuthState;
    preference: IPreferenceState;
    movies: IMovieState;
    notifications: INotificationState;
    admin: IAdminNotesState;
    router: RouterReducerState<IAppRouterState>;
}

export const appReducer: ActionReducerMap<IAppState> = {
    notes: notesReducer, // append any additional reducers here
    events: eventsReducer,
    auth: authReducer,
    preference: profileReducer,
    movies: movieReducer,
    notifications: notificationReducer,
    admin: adminReducer,
    router: routerReducer
};

export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
    return function (state: IAppState, action: any): IAppState {
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [logger] : [];

export * from './note.reducer';
export * from './events.reducer';
export * from './auth.reducer';
export * from './preference.reducer';
export * from './movie.reducer';
export * from './notification.reducer';
export * from '../../admin/store/reducers/admin.reducer';
export * from './route.reducer';
