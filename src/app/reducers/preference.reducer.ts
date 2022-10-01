import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';

export interface PreferenceState {
  isDarkMode: boolean;
}

export const initialState: PreferenceState = {
  isDarkMode: false
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
  )
)

export const getPreferenceState = createFeatureSelector<PreferenceState>('preference');

export const isDarkMode = createSelector(getPreferenceState, (state: PreferenceState) => state.isDarkMode)
