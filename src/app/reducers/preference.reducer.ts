import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';
import { ThemeService } from '../shared/theme.service';

export interface PreferenceState {
  isDarkMode: boolean;
  isLoggedIn: boolean;
}

export const initialState: PreferenceState = {
  isDarkMode: localStorage.getItem('darkmode') === 'true' || ThemeService.isDarkMode,
  isLoggedIn: false
}

export const profileReducer = createReducer<PreferenceState>(
  initialState,
  on(
    PreferenceActions.toggleDarkModeSuccess,
    (state, _action): PreferenceState => ({
      ...state, isDarkMode: !state.isDarkMode
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
