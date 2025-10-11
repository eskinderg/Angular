import { on, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

export interface IAuthState {
    profile: any;
    isLoggedIn: boolean;
    isLoading: boolean;
    loggingIn: boolean;
    error: any;
}

const initialState: IAuthState = {
    profile: {},
    isLoggedIn: false,
    isLoading: false,
    loggingIn: false,
    error: null
};

export const authReducer = createReducer<IAuthState>(
    initialState,
    on(AuthActions.logOutSuccess, (): IAuthState => initialState),
    on(
        AuthActions.loginWithUserNamePassword,
        (state, _action): IAuthState => ({
            ...state,
            loggingIn: true,
            error: null
        })
    ),
    on(
        AuthActions.routeToHome,
        AuthActions.routeToDashboard,
        (state, _action): IAuthState => ({
            ...state,
            loggingIn: false
        })
    ),
    on(
        AuthActions.loginEventFail,
        (state, action): IAuthState => ({
            ...state,
            loggingIn: false,
            error: action.payload
        })
    ),
    on(
        AuthActions.loadProfileSuccess,
        (state, action): IAuthState => ({
            ...state,
            profile: action.profile.info
        })
    ),
    on(
        AuthActions.logInSuccess,
        (state, _action): IAuthState => ({
            ...state,
            isLoggedIn: true
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

export const isLoggingIn = createSelector(getAuthState, (state: IAuthState) => state.loggingIn);

export const getError = createSelector(getAuthState, (state: IAuthState) =>
    state.error ? state.error.error.error_description : null
);

export const showLogging = createSelector(getAuthState, (state: IAuthState) => {
    return state.loggingIn && !state.isLoggedIn;
});
