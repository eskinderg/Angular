import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import * as MoviesActions from '../actions/movie.actions';
import { MoviesDataService } from 'src/app/components/movies/service/movies.data.service';
import { AuthService } from 'src/app/shared/auth.service';

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

    removeWatchList = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            authService = inject(AuthService)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.removeWatchList),
                switchMap((action) =>
                    moviesDataService
                        .favoriteMovie([
                            { movieId: action.movie.id, favorite: false, userId: authService.userId() }
                        ])
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
    );

    addWatchList = createEffect(
        (
            actions$ = inject(Actions),
            moviesDataService = inject(MoviesDataService),
            authService = inject(AuthService)
        ) =>
            actions$.pipe(
                ofType(MoviesActions.addWatchList),
                switchMap((action) =>
                    moviesDataService
                        .favoriteMovie([
                            { movieId: action.movies.id, favorite: true, userId: authService.userId() }
                        ])
                        .pipe(
                            map((movies) =>
                                MoviesActions.fetchAddedWatchList({
                                    payload: movies
                                })
                            ),
                            catchError((err) =>
                                of({ type: MoviesActions.fetchWatchListFailed.type, payload: err })
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
}
