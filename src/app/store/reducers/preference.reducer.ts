import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';
import * as AuthActions from '../actions/auth.action';
import { Preference } from 'src/app/models/preference';
import { User } from 'src/app/admin/models/user';

export interface IPreferenceState {
    isDarkMode: string;
    preference: Preference;
    user: User;
}

const initialState: IPreferenceState = {
    isDarkMode: localStorage.getItem('darkmode') ?? String(false),
    preference: null,
    user: null
};

export const profileReducer = createReducer<IPreferenceState>(
    initialState,
    on(
        AuthActions.logOutSuccess,
        (state): IPreferenceState => ({
            ...initialState,
            preference: { ...initialState.preference, language: state.preference.language }
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
    ),
    on(
        PreferenceActions.loadUserInfoSuccess,
        (state, action): IPreferenceState => ({
            ...state,
            user: action.user
        })
    ),
    on(
        PreferenceActions.updateUserInfoSuccess,
        (state, action): IPreferenceState => ({
            ...state,
            user: action.user
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

export const getUser = createSelector(getPreferenceState, (state: IPreferenceState) => state.user);
