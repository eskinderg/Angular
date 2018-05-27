import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AuthActions from '../actions/auth';
// import { Event } from '../models/event';

export interface State {
  profile: any;
}

export const initialState: State = {
  profile: []
};

export function reducer(state:State = initialState, action: AuthActions.Actions): State {

  switch (action.type) {
    case AuthActions.LOGIN_EVENT_SUCCESS:
      // debugger;
      return {
        profile: action.payload.profile
      };
    case AuthActions.AUTH_INIT_SUCCESS:
      return {
        profile: action.payload.profile
      };

    default:
      return state;
  }
};

export const getAuthState = createFeatureSelector<State>('profile');

export const getProfile = createSelector(getAuthState, (state: State)=> state.profile);
