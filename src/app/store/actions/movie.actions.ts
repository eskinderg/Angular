import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/components/movies/models/movie';

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
