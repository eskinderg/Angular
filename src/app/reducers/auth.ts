import { on, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';
import * as AuthActions from '../actions/auth';

export interface State {
  profile: any;
}

export const initialState: State = {
  profile: {}
};

export const reducer = createReducer (
  initialState,
  on(
    AuthActions.loadProfileSuccess,
    (state, action): State => ({
      profile: action.profile
    })
  )
)

export const getAuthState = createFeatureSelector<State>('profile');

export const getProfile = createSelector(getAuthState, (state: State) => state.profile);
