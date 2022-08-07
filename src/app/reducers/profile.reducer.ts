import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.action';

export interface ProfileState {
  isDarkMode: boolean;
}

export const initialState: ProfileState = {
  isDarkMode: false
}

export const profileReducer = createReducer(
  initialState,
  on(
    ProfileActions.toggleDarkModeSuccess,
    (state, action): ProfileState => ({
      ...state, isDarkMode: action.isDarkMode
    })
  ),
  on(
    ProfileActions.getDarkModeSuccess,
    (state, action): ProfileState => ({
      ...state, isDarkMode: action.isDarkMode
    })
  )
)

export const getProfileState = createFeatureSelector<ProfileState>('preference');

export const isDarkMode = createSelector(getProfileState, (state: ProfileState) => state.isDarkMode)
