import { on, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

export interface AuthState {
  profile: any;
}

export const initialState: AuthState = {
  profile: {}
};

export const reducer = createReducer (
  initialState,
  on(
    AuthActions.loadProfileSuccess,
    (state, action): AuthState => ({
      profile: action.profile
    })
  )
)

export const getAuthState = createFeatureSelector<AuthState>('profile');

export const getProfile = createSelector(getAuthState, (state: AuthState) => state.profile);
