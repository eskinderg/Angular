import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';

export interface IPreferenceState {
    isDarkMode: string;
}

const initialState: IPreferenceState = {
    isDarkMode: localStorage.getItem('darkmode') ?? String(false)
};

export const profileReducer = createReducer<IPreferenceState>(
    initialState,
    on(
        PreferenceActions.toggleDarkModeSuccess,
        (state): IPreferenceState => ({
            ...state,
            isDarkMode: String(!JSON.parse(state.isDarkMode))
        })
    )
);

export const getPreferenceState = createFeatureSelector<IPreferenceState>('preference');

export const isDarkMode = createSelector(getPreferenceState, (state: IPreferenceState) => state.isDarkMode);
