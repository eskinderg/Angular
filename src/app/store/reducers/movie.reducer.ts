import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as MoviesActions from '../actions/movie.actions';
import { Movie } from 'src/app/components/movies/models/movie';
import { MovieResults } from 'src/app/components/movies/models/movie-results';

export interface IMovieState {
    watchList: Movie[];
    discover: {
        movies: Movie[];
        moviesResult: MovieResults;
        loading: boolean;
    };
    genre: {
        movieResult: MovieResults;
        genreId: number;
        page: number;
    };
    preferedLanguage: string;
}

const initialState: IMovieState = {
    watchList: [],
    discover: {
        movies: [],
        moviesResult: null,
        loading: false
    },
    genre: {
        movieResult: null,
        genreId: null,
        page: null
    },
    preferedLanguage: null
};

export const movieReducer = createReducer<IMovieState>(
    initialState,
    on(MoviesActions.fetchWatchListSuccess, (state, action): IMovieState => {
        return {
            ...state,
            watchList: action.movies
        };
    }),
    on(MoviesActions.removeWatchListSuccess, (state, action): IMovieState => {
        return {
            ...state,
            watchList: state.watchList.filter(
                (m) => !action.moviesRemoved.find((movie) => m.id === Number(movie[1]))
            )
        };
    }),
    on(MoviesActions.addWatchListSuccess, (state, action): IMovieState => {
        return {
            ...state,
            watchList: [...state.watchList, ...action.movies]
        };
    }),
    on(MoviesActions.setPreferedMovieLanguage, (state, action): IMovieState => {
        return {
            ...state,
            preferedLanguage: action.lang
        };
    }),
    on(MoviesActions.getDiscoverMovies, (state): IMovieState => {
        return {
            ...state,
            discover: {
                ...state.discover,
                loading: true
            }
        };
    }),
    on(MoviesActions.getDiscoverMoviesSuccess, (state, action): IMovieState => {
        return {
            ...state,
            discover: {
                ...state.discover,
                movies: [...state.discover.movies, ...action.movieResults.movies],
                moviesResult: action.movieResults,
                loading: false
            }
        };
    }),
    on(MoviesActions.discoverMoviesReset, (state): IMovieState => {
        return {
            ...state,
            discover: {
                ...state.discover,
                movies: [],
                moviesResult: null,
                loading: false
            }
        };
    }),
    on(MoviesActions.getDiscoverMoviesNoResult, (state): IMovieState => {
        return {
            ...state,
            discover: {
                ...state.discover,
                loading: false
            }
        };
    }),
    on(MoviesActions.fetchMoviesByGenreSuccess, (state, action): IMovieState => {
        return {
            ...state,
            genre: {
                movieResult: action.movieResult,
                genreId: action.genreId,
                page: action.page
            }
        };
    })
);

export const getMovieState = createFeatureSelector<IMovieState>('movies');

export const getWatchListMovies = createSelector(getMovieState, (state: IMovieState) => state.watchList);

export const getPreferedMovieLanguage = createSelector(
    getMovieState,
    (state: IMovieState) => state.preferedLanguage
);

export const getDiscoverdMovies = createSelector(
    getMovieState,
    (state: IMovieState) => state.discover.movies
);

export const getDiscoverdMoviesLoading = createSelector(
    getMovieState,
    (state: IMovieState) => state.discover.loading
);

export const getDiscoverdMoviesResults = createSelector(
    getMovieState,
    (state: IMovieState) => state.discover.moviesResult
);

export const isInWatchList = (movie: Movie) =>
    createSelector(getMovieState, (state: IMovieState) => {
        return state.watchList.some((m) => m.id === movie.id);
    });

export const getWatchListCount = createSelector(getMovieState, (state: IMovieState) => {
    return state.watchList.length;
});

export const getMoviesByGenre = (genreId: number, page: number) =>
    createSelector(getMovieState, (state: IMovieState) => {
        return state.genre.genreId === genreId && state.genre.page === page ? state.genre.movieResult : null;
    });
