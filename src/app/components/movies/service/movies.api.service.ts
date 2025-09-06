import { Injectable, inject } from '@angular/core';
import { Genre } from '../models/genre';
import * as fromMovies from '../../../store/reducers/movie.reducer';
import * as fromRoot from '../../../store/reducers';
import * as AppActions from '../../../store/actions';
import { Tv } from '../models/tv';
import { MoviesDataService } from './movies.data.service';
import { Observable, empty } from 'rxjs';
import { MovieResults } from '../models/movie-results';
import { Store } from '@ngrx/store';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MoviesApiService {
    private api = inject(MoviesDataService);
    private store = inject<Store<fromRoot.IAppState>>(Store);

    serachMovies(searchStr: string) {
        if (searchStr !== undefined && searchStr !== '') {
            return this.api.searchMovies(searchStr);
        }
        return empty();
    }
    getPopularSeries(): Observable<Tv[]> {
        return this.api.getPopularSeries();
    }

    getGenres(): Observable<Genre[]> {
        return this.api.getGenres();
    }

    getMoviesCountByGenre(id: string) {
        return this.api.getGenreMovieCount(id);
    }

    getMoviesByGenre(id: string, page?: number): Observable<MovieResults> {
        return this.api.getMoviesByGenre(id, page);
        // .pipe(
        //     map((mr:MovieResults) => {
        //       mr.movies = mr.movies.filter((m:Movie) => m.original_language=="en" || m.original_language=="uk" )
        //       return mr;
        //     })
        //   )
    }

    getMovie(id: string) {
        return this.api.getMovie(id);
    }

    discoverMovies(page: string = '1'): Observable<MovieResults> {
        return this.api.getDiscoverMovies(page);
    }

    favoriteMovie(movie: Movie) {
        return this.store.dispatch(AppActions.removeWatchList({ movie: movie }));
    }

    getUserMovies() {
        return this.store.select(fromMovies.getWatchListMovies);
    }

    isInWatchList(movie: Movie) {
        return this.store.select(fromMovies.isInWatchList(movie));
    }

    addWatchList(movie: Movie) {
        this.store.dispatch(AppActions.addWatchList({ movies: movie }));
    }

    removeWatchList(movie: Movie) {
        this.store.dispatch(AppActions.removeWatchList({ movie: movie }));
    }
}
