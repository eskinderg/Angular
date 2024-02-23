import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';
import { ThemeService } from '../../shared/theme.service';

export interface IPreferenceState {
  isDarkMode: boolean;
  isLoggedIn: boolean;
}

export const initialState: IPreferenceState = {
  isDarkMode: localStorage.getItem('darkmode') === 'true' || ThemeService.isDarkMode,
  isLoggedIn: false
};

export const profileReducer = createReducer<IPreferenceState>(
  initialState,
  on(
    PreferenceActions.toggleDarkModeSuccess,
    (state): IPreferenceState => ({
      ...state,
      isDarkMode: !state.isDarkMode
    })
  ),
  on(
    PreferenceActions.logInSuccess,
    (state): IPreferenceState => ({
      ...state,
      isLoggedIn: true
    })
  ),
  on(
    PreferenceActions.getIsLoggedInSuccess,
    (state, action): IPreferenceState => ({
      ...state,
      isLoggedIn: action.isLoggedIn
    })
  )
);

export const getPreferenceState = createFeatureSelector<IPreferenceState>('preference');

export const isDarkMode = createSelector(getPreferenceState, (state: IPreferenceState) => state.isDarkMode);

export const isLoggedIn = createSelector(getPreferenceState, (state: IPreferenceState) => state.isLoggedIn);
