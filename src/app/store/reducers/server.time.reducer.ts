import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { updateTimeDiff } from '../actions';

export interface IServerState {
    timediff: number;
}

const initialState: IServerState = {
    timediff: 0
};

export const serverReducer = createReducer<IServerState>(
    initialState,
    on(
        updateTimeDiff,
        (state, action): IServerState => ({
            ...state,
            timediff: new Date().getTime() - new Date(action.serverTime).getTime()
        })
    )
);

export const getServerState = createFeatureSelector<IServerState>('server');

export const getTimeDiff = createSelector(getServerState, (state: IServerState) => state.timediff);
