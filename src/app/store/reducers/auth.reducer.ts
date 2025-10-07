import { on, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import * as PreferenceActions from '../actions/preference.action';

export interface IAuthState {
    profile: any;
}

const initialState: IAuthState = {
    profile: {}
};

export const authReducer = createReducer<IAuthState>(
    initialState,
    on(PreferenceActions.logOutSuccess, (): IAuthState => initialState),
    on(
        AuthActions.loadProfileSuccess,
        (_state, action): IAuthState => ({
            profile: action.profile
        })
    )
);

export const getAuthState = createFeatureSelector<IAuthState>('auth');

export const getProfile = createSelector(getAuthState, (state: IAuthState) => state.profile);
