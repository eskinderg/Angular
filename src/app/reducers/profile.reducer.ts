import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.action';

export interface ProfileState {
  theme: string;
}

export const initialState: ProfileState = {
  theme: "light"
}

export const profileReducer = createReducer(
  initialState,
  on(
    ProfileActions.setThemeSuccess,
    (state, action): ProfileState => ({
      theme: action.theme
    })
  ),
  on(
    ProfileActions.getThemeSuccess,
    (state, action): ProfileState => ({
      theme: action.theme
    })
  )
)


export const getProfileState = createFeatureSelector<ProfileState>('preference');

export const getTheme = createSelector(getProfileState, (state: ProfileState) => state.theme)
