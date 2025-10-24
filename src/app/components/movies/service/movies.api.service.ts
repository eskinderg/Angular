import { Injectable, inject } from '@angular/core';
import { Genre } from '../models/genre';
import * as fromMovies from '../../../store/reducers/movie.reducer';
import * as fromRoot from '../../../store/reducers';
import * as AppActions from '../../../store/actions';
import { Tv } from '../models/tv';
import { MovieQueryParams, MoviesDataService } from './movies.data.service';
import { EMPTY, map, Observable } from 'rxjs';
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
        return EMPTY;
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

    getMoviesByGenre(id: string, page?: number) {
        // return this.api.getMoviesByGenre(null, Number(id), 'fr', page);
        this.store.dispatch(AppActions.fetchMoviesByGenre({ genreId: Number(id), page: page }));
    }

    // getMoviesByGenre_(): Observable<MovieResults> {
    //     return this.store.select(fromMovies.getMoviesByGenre);
    // }

    getMovie(id: string) {
        return this.api.getMovie(id);
    }

    discoverdMovies(): Observable<Movie[]> {
        return this.store.select(fromMovies.getDiscoverdMovies);
    }

    discoverMovies(queryParams: MovieQueryParams = null) {
        this.store.dispatch(AppActions.getDiscoverMovies({ queryParams: queryParams }));
    }

    discoverMoviesForHome(queryParams: MovieQueryParams = null) {
        this.store.dispatch(AppActions.getDiscoverMoviesForHome({ queryParams: queryParams }));
    }

    favoriteMovie(movies: Movie) {
        return this.store.dispatch(AppActions.removeWatchList({ movies: [movies] }));
    }

    getUserMovies() {
        return this.store.select(fromMovies.getWatchListMovies);
    }

    discoverReset() {
        this.store.dispatch(AppActions.discoverMoviesReset());
    }

    isInWatchList(movie: Movie) {
        return this.store.select(fromMovies.isInWatchList(movie));
    }

    isInWatchedList(movie: Movie) {
        return this.store.select(fromMovies.isInWatchedList(movie));
    }

    isDiscoverLoading() {
        return this.store.select(fromMovies.getDiscoverdMoviesLoading);
    }

    setPreferedMovieLang(lang: string) {
        return this.store.dispatch(AppActions.setPreferedMovieLanguage({ lang: lang }));
    }

    getPreferedMovieLang() {
        return this.store.select(fromMovies.getPreferedMovieLanguage);
    }

    addWatchList(movie: Movie) {
        this.store.dispatch(AppActions.addWatchList({ movies: [movie] }));
    }

    removeWatchList(movie: Movie) {
        this.store.dispatch(AppActions.removeWatchList({ movies: [movie] }));
    }

    addWatchedList(movie: Movie) {
        this.store.dispatch(AppActions.addWatchedList({ movies: [movie] }));
    }

    updateUserMovieList(movie: Movie, favorite: boolean, watched: boolean) {
        this.store.dispatch(
            AppActions.updateUserMovieList({ movies: [movie], watched: watched, favorite: favorite })
        );
    }

    removeWatchedList(movie: Movie) {
        this.store.dispatch(AppActions.removeWatchedList({ movies: [movie] }));
    }

    getLanguages(filterLangs: string[] = []) {
        return this.api
            .getLanguages(filterLangs)
            .pipe(
                map((l) =>
                    l.filter((lang) =>
                        filterLangs.length
                            ? filterLangs.includes(lang.iso_639_1)
                            : ['am', 'en'].includes(lang.iso_639_1)
                    )
                )
            );
    }

    getYears() {
        const years: number[] = [];
        for (let y = 2026; y >= 1950; y--) {
            years.push(y);
        }

        return years;
    }
}
