import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/components/movies/models/movie';
import { MovieResults } from 'src/app/components/movies/models/movie-results';
import { MovieQueryParams } from 'src/app/components/movies/service/movies.data.service';

export const fetchWatchList = createAction('[MOVIE] FETCH_WATCH_LIST');
export const fetchWatchListFailed = createAction(
    '[MOVIE] FETCH_WATCH_LIST_FAILURE',
    props<{ payload: string }>()
);
export const fetchWatchListSuccess = createAction(
    '[MOVIE] FETCH_WATCH_LIST_SUCCESS',
    props<{ movies: Movie[] }>()
);

export const removeWatchList = createAction('[MOVIE] REMOVE_WATCH_LIST', props<{ movie: Movie }>());
export const removeWatchListFailed = createAction(
    '[MOVIE] REMOVE_WATCH_LIST_FAILURE',
    props<{ payload: string }>()
);
export const removeWatchListSuccess = createAction(
    '[MOVIE] REMOVE_WATCH_LIST_SUCCESS',
    props<{ moviesRemoved: any[] }>()
);

export const fetchRemovedWatchList = createAction(
    '[MOVIE] FETCH_REMOVED_WATCH_LIST',
    props<{ payload: any[] }>()
);

export const fetchRemovedWatchListSuccess = createAction(
    '[MOVIE] FETCH_REMOVED_WATCH_LIST_SUCCESS',
    props<{ movies: Movie[] }>()
);

export const addWatchList = createAction('[MOVIE] ADD_WATCH_LIST', props<{ movies: Movie }>());
export const addWatchListFailed = createAction(
    '[MOVIE] ADD_WATCH_LIST_FAILURE',
    props<{ payload: string }>()
);
export const addWatchListSuccess = createAction(
    '[MOVIE] ADD_WATCH_LIST_SUCCESS',
    props<{ movies: Movie[] }>()
);

export const fetchAddedWatchList = createAction(
    '[MOVIE] FETCH_ADDED_WATCH_LIST',
    props<{ payload: any[] }>()
);

export const fetchAddedWatchListSuccess = createAction(
    '[MOVIE] FETCH_ADDED_WATCH_LIST_SUCCESS',
    props<{ movies: Movie[] }>()
);

export const setPreferedMovieLanguage = createAction(
    '[MOVIE] SET_PREFERED_LANGUAGE',
    props<{ lang: string }>()
);

export const getDiscoverMovies = createAction(
    '[MOVIE] GET_DISCOVER_MOVIES',
    props<{ queryParams: MovieQueryParams }>()
);

export const discoverMoviesReset = createAction('[MOVIE] DISCOVER_MOVIES_RESET');

export const getDiscoverMoviesStart = createAction('[MOVIE] GET_DISCOVER_MOVIES_START');

export const getDiscoverMoviesNoResult = createAction('[MOVIE] GET_DISCOVER_MOVIES_NO_RESULTS');

export const getDiscoverMoviesSuccess = createAction(
    '[MOVIE] GET_DISCOVER_MOVIES_SUCCESS',
    props<{ movieResults: MovieResults }>()
);

export const fetchMoviesByGenre = createAction(
    '[MOVIE] FETCH_MOVIES_BY_GENRE',
    props<{ genreId: number; page: number }>()
);

export const fetchMoviesByGenreSuccess = createAction(
    '[MOVIE] FETCH_MOVIES_BY_GENRE_SUCCESS',
    props<{ movieResult: MovieResults; genreId: number; page: number }>()
);
