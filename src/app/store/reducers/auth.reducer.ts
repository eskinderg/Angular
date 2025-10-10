import { on, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

export interface IAuthState {
    profile: any;
    isLoggedIn: boolean;
    isLoading: boolean;
}

const initialState: IAuthState = {
    profile: {},
    isLoggedIn: false,
    isLoading: false
};

export const authReducer = createReducer<IAuthState>(
    initialState,
    on(AuthActions.logOutSuccess, (): IAuthState => initialState),
    on(
        AuthActions.loadProfileSuccess,
        (state, action): IAuthState => ({
            ...state,
            isLoggedIn: true,
            profile: action.profile.info
        })
    ),
    on(
        AuthActions.startLoading,
        (state): IAuthState => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        AuthActions.stopLoading,
        (state): IAuthState => ({
            ...state,
            isLoading: false
        })
    )
);

export const getAuthState = createFeatureSelector<IAuthState>('auth');

export const getProfile = createSelector(getAuthState, (state: IAuthState) => state.profile);

export const isLoggedIn = createSelector(getAuthState, (state: IAuthState) => state.isLoggedIn);

export const isLoading = createSelector(getAuthState, (state: IAuthState) => state.isLoading);
