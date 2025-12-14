import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, exhaustMap, take } from 'rxjs/operators';
import * as MoviesActions from '../actions/movie.actions';
import { MoviesDataService } from 'src/app/components/movies/service/movies.data.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as fromMovies from '../../store/reducers/movie.reducer';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class MoviesEffect {
    fetchWatchList = createEffect(
        (actions$ = inject(Actions), moviesDataService = inject(MoviesDataService)) =>
            actions$.pipe(
                ofType(MoviesActions.fetchWatchList),
                switchMap(() =>
                    moviesDataService.getUserMovies().pipe(
                        map((movies) => MoviesActions.fetchWatchListSuccess({ movies: movies })),
                        catchError((err) =>
                            of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
                        )
                    )
                )
            )
    );

    fetchWatchedList = createEffect(
        (actions$ = inject(Actions), moviesDataService = inject(MoviesDataService)) =>
            actions$.pipe(
                ofType(MoviesActions.fetchWatchedList),
                switchMap(() =>
                    moviesDataService.getUserWatchedMovies().pipe(
                        map((movies) => MoviesActions.fetchWatchedListSuccess({ movies: movies })),
                        catchError((err) =>
                            of({ type: MoviesActions.fetchWatchedListFailed.type, payload: err })
                        )
                    )
                )
            )
    );

    removeWatchList = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            authService = inject(AuthService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.removeWatchList),
                switchMap((action) =>
                    store.select(fromMovies.isInWatchedList(action.movies[0])).pipe(
                        take(1),
                        switchMap((isWatched) =>
                            moviesDataService
                                .favoriteMovie(
                                    action.movies.map((movie) => ({
                                        ...movie,
                                        watched: isWatched,
                                        favorite: false,
                                        userId: authService.userId()
                                    }))
                                )
                                .pipe(
                                    map((movies) =>
                                        MoviesActions.removeWatchListSuccess({
                                            moviesRemoved: movies
                                        })
                                    ),
                                    catchError((err) =>
                                        of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
                                    )
                                )
                        )
                    )
                )
            )
    );

    removeWatchedList = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            authService = inject(AuthService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.removeWatchedList),
                switchMap((action) =>
                    store.select(fromMovies.isInWatchList(action.movies[0])).pipe(
                        take(1),
                        switchMap((isFavorite) =>
                            moviesDataService
                                .watchedMovie(
                                    action.movies.map((movie) => ({
                                        ...movie,
                                        favorite: isFavorite,
                                        watched: false,
                                        userId: authService.userId()
                                    }))
                                )
                                .pipe(
                                    map((movies) =>
                                        MoviesActions.removeWatchedListSuccess({ moviesRemoved: movies })
                                    ),
                                    catchError((err) =>
                                        of(MoviesActions.removeWatchedListFailed({ payload: err }))
                                    )
                                )
                        )
                    )
                )
            )
    );

    addWatchedList = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            authService = inject(AuthService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.addWatchedList),
                switchMap((action) =>
                    store.select(fromMovies.isInWatchList(action.movies[0])).pipe(
                        take(1),
                        switchMap((isFavorite) =>
                            moviesDataService
                                .watchedMovie(
                                    action.movies.map((movie) => ({
                                        ...movie,
                                        favorite: isFavorite,
                                        watched: true,
                                        userId: authService.userId()
                                    }))
                                )
                                .pipe(
                                    map((movies) => MoviesActions.addWatchedListSuccess({ movies })),
                                    catchError((err) =>
                                        of(MoviesActions.fetchWatchedListFailed({ payload: err }))
                                    )
                                )
                        )
                    )
                )
            )
    );

    addWatchList = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            authService = inject(AuthService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.addWatchList),
                switchMap((action) =>
                    store.select(fromMovies.isInWatchedList(action.movies[0])).pipe(
                        take(1),
                        switchMap((isWatched) =>
                            moviesDataService
                                .favoriteMovie(
                                    action.movies.map((movie) => ({
                                        ...movie,
                                        watched: isWatched,
                                        favorite: true,
                                        userId: authService.userId()
                                    }))
                                )
                                .pipe(
                                    map((movies) =>
                                        MoviesActions.addWatchListSuccess({
                                            movies: movies
                                        })
                                    ),
                                    catchError((err) =>
                                        of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
                                    )
                                )
                        )
                    )
                )
            )
    );

    fetchAddedWatchList = createEffect(
        (actions$ = inject(Actions), moviesDataService = inject(MoviesDataService)) =>
            actions$.pipe(
                ofType(MoviesActions.fetchAddedWatchList),
                switchMap((action) =>
                    moviesDataService.getMovies(action.payload).pipe(
                        map((movies) =>
                            MoviesActions.addWatchListSuccess({
                                movies: movies
                            })
                        ),
                        catchError((err) =>
                            of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
                        )
                    )
                )
            )
    );

    setPreferedLanguage$ = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(MoviesActions.setPreferedMovieLanguage),
            switchMap((action) =>
                of(localStorage.setItem('lang', action.lang)).pipe(
                    map(() => MoviesActions.setPreferedMovieLanguageSuccess({ lang: action.lang }))
                )
            )
        )
    );

    getDiscoverMovies$ = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.getDiscoverMovies),
                concatLatestFrom(() => [
                    store.select(fromRoot.getUserLang),
                    store.select(fromMovies.getDiscoverdMoviesResults)
                ]),
                switchMap(([action, lang, loading]) => {
                    if (loading) {
                        if (loading.page >= loading.total_pages) {
                            return of(MoviesActions.getDiscoverMoviesNoResult());
                        }
                    }
                    return moviesDataService
                        .getDiscoverMovies(action.queryParams, lang, loading ? loading.page + 1 : 1)
                        .pipe(
                            map((movies) =>
                                MoviesActions.getDiscoverMoviesSuccess({
                                    movieResults: movies
                                })
                            ),
                            catchError((err) =>
                                of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
                            )
                        );
                })
            )
    );

    getDiscoverMoviesForHome$ = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.getDiscoverMoviesForHome),
                concatLatestFrom(() => [store.select(fromMovies.getPreferedMovieLanguage)]),
                switchMap(([action, lang]) => {
                    return moviesDataService
                        .getDiscoverMovies(action.queryParams, lang, action.queryParams.page)
                        .pipe(
                            map((movies) =>
                                MoviesActions.getDiscoverMoviesForHomeSuccess({
                                    movieResults: movies
                                })
                            ),
                            catchError((err) =>
                                of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
                            )
                        );
                })
            )
    );

    fetchMoviesByGenre$ = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.fetchMoviesByGenre),
                concatLatestFrom(() => [
                    store.select(fromRoot.getUserLang),
                    store.select(fromMovies.getDiscoverdMoviesResults)
                ]),
                switchMap(([action, lang, loading]) => {
                    if (loading) {
                        if (loading.page >= loading.total_pages) {
                            return of(MoviesActions.getDiscoverMoviesNoResult());
                        }
                    }
                    return moviesDataService.getMoviesByGenre(null, action.genreId, lang, action.page).pipe(
                        map((movies) =>
                            MoviesActions.fetchMoviesByGenreSuccess({
                                movieResult: movies,
                                genreId: action.genreId,
                                page: action.page
                            })
                        ),
                        catchError((err) =>
                            of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
                        )
                    );
                })
            )
    );
}
