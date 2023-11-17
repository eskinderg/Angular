import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';

export interface PreferenceState {
  isDarkMode: boolean;
  isLoggedIn: boolean;
}

export const initialState: PreferenceState = {
  isDarkMode: false,
  isLoggedIn: false
}

export const profileReducer = createReducer(
  initialState,
  on(
    PreferenceActions.toggleDarkModeSuccess,
    (state, action): PreferenceState => ({
      ...state, isDarkMode: action.isDarkMode
    })
  ),
  on(
    PreferenceActions.getDarkModeSuccess,
    (state, action): PreferenceState => ({
      ...state, isDarkMode: action.isDarkMode
    })
  ),
  on(
    PreferenceActions.logInSuccess,
    (state, _action): PreferenceState => ({
      ...state, isLoggedIn: true
    })
  ),
  on(
    PreferenceActions.getIsLoggedInSuccess,
    (state, action): PreferenceState => ({
      ...state, isLoggedIn: action.isLoggedIn
    })
  )
)

export const getPreferenceState = createFeatureSelector<PreferenceState>('preference');

export const isDarkMode = createSelector(getPreferenceState, (state: PreferenceState) => state.isDarkMode)

export const isLoggedIn = createSelector(getPreferenceState, (state: PreferenceState) => state.isLoggedIn)
