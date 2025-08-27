import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as MoviesActions from '../actions/movie.actions';
import { Movie } from 'src/app/components/movies/models/movie';

export interface IMovieState {
    watchList: Movie[];
}

export const initialState: IMovieState = {
    watchList: []
};

export const movieReducer = createReducer<IMovieState>(
    initialState,
    on(MoviesActions.fetchWatchListSuccess, (state, action): IMovieState => {
        return {
            ...state,
            watchList: action.payload
        };
    }),
    on(MoviesActions.removeWatchListSuccess, (state, action): IMovieState => {
        return {
            ...state,
            watchList: state.watchList.filter((m) => !action.payload.find(({ id }) => m.id === id))
        };
    }),
    on(MoviesActions.addWatchListSuccess, (state, action): IMovieState => {
        return {
            ...state,
            watchList: [...state.watchList, ...action.payload]
        };
    })
);

export const getMovieState = createFeatureSelector<IMovieState>('movies');

export const getWatchListMovies = createSelector(getMovieState, (state: IMovieState) => {
    return state.watchList;
});

export const isInWatchList = (movie: Movie) =>
    createSelector(getMovieState, (state: IMovieState) => {
        return state.watchList.some((m) => m.id === movie.id);
    });
