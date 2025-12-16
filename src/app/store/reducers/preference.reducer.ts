import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';
import * as AuthActions from '../actions/auth.action';
import { Preference } from 'src/app/models/preference';

export interface IPreferenceState {
    isDarkMode: string;
    preference: Preference;
}

const initialState: IPreferenceState = {
    isDarkMode: localStorage.getItem('darkmode') ?? String(false),
    preference: null
};

export const profileReducer = createReducer<IPreferenceState>(
    initialState,
    on(
        AuthActions.logOutSuccess,
        (state): IPreferenceState => ({
            ...initialState,
            preference: { ...state.preference, language: state.preference.language }
        })
    ),
    on(
        PreferenceActions.toggleDarkModeSuccess,
        (state): IPreferenceState => ({
            ...state,
            preference: { ...state.preference, dark_mode: !JSON.parse(state.isDarkMode) },
            isDarkMode: String(!JSON.parse(state.isDarkMode))
        })
    ),
    on(
        PreferenceActions.loadUserPreferenceSuccess,
        (state, action): IPreferenceState => ({
            ...state,
            preference: action.preference ?? state.preference
        })
    ),
    on(
        PreferenceActions.saveUserLangSuccess,
        (state, action): IPreferenceState => ({
            ...state,
            preference: { ...state.preference, language: action.lang }
        })
    ),
    on(
        PreferenceActions.saveUserPreferenceSuccess,
        (state, action): IPreferenceState => ({
            ...state,
            preference: action.preference ?? state.preference
        })
    )
);

export const getPreferenceState = createFeatureSelector<IPreferenceState>('preference');

export const isDarkMode = createSelector(getPreferenceState, (state: IPreferenceState) => state.isDarkMode);

export const getUserLang = createSelector(
    getPreferenceState,
    (state: IPreferenceState) => state.preference?.language ?? 'en'
);

export const getUserPreference = createSelector(
    getPreferenceState,
    (state: IPreferenceState) => state.preference
);
