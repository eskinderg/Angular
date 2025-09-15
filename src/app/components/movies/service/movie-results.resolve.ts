import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { MovieResults } from '../models/movie-results';
import * as fromMovies from '../../../store/reducers/movie.reducer';
import * as AppActions from '../../../store/actions';
import * as fromRoot from '../../../store/reducers';

export const moviesResultResolver: ResolveFn<MovieResults> = (route) => {
    const store = inject<Store<fromRoot.IAppState>>(Store);

    const genreId = Number(route.params['id']);
    const page = Number(route.params['page'] ?? 1);

    // 1. Dispatch action
    store.dispatch(AppActions.fetchMoviesByGenre({ genreId, page }));

    return store.select(fromMovies.getMoviesByGenre(genreId, page)).pipe(
        filter((res): res is MovieResults => !!res),
        take(1)
    );
};
