import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';

export interface IPreferenceState {
    isDarkMode: string;
    isLoggedIn: boolean;
    isLoading: boolean;
}

const initialState: IPreferenceState = {
    isDarkMode: localStorage.getItem('darkmode') ?? String(false),
    isLoggedIn: false,
    isLoading: false
};

export const profileReducer = createReducer<IPreferenceState>(
    initialState,
    on(
        PreferenceActions.toggleDarkModeSuccess,
        (state): IPreferenceState => ({
            ...state,
            isDarkMode: String(!JSON.parse(state.isDarkMode))
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
        PreferenceActions.logOutSuccess,
        (state): IPreferenceState => ({
            ...state,
            isLoggedIn: false
        })
    ),
    on(
        PreferenceActions.getIsLoggedInSuccess,
        (state, action): IPreferenceState => ({
            ...state,
            isLoggedIn: action.isLoggedIn
        })
    ),
    on(
        PreferenceActions.startLoading,
        (state): IPreferenceState => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        PreferenceActions.stopLoading,
        (state): IPreferenceState => ({
            ...state,
            isLoading: false
        })
    )
);

export const getPreferenceState = createFeatureSelector<IPreferenceState>('preference');

export const isDarkMode = createSelector(getPreferenceState, (state: IPreferenceState) => state.isDarkMode);

export const isLoggedIn = createSelector(getPreferenceState, (state: IPreferenceState) => state.isLoggedIn);

export const isLoading = createSelector(getPreferenceState, (state: IPreferenceState) => state.isLoading);
