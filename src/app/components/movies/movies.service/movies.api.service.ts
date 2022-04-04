import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { Tv } from '../models/tv';
import { MoviesDataService } from './movies.data.service';
import { Observable, empty } from 'rxjs';
import { MovieResults } from '../models/movie-results';


@Injectable()
export class MoviesApiService {

  constructor(
    private api: MoviesDataService
  ) { }

  serachMovies(searchStr: string) {
    if (searchStr !== undefined && searchStr !== '') {
      // return this.api.searchMovies(searchStr);
      return empty();
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
  }

  getMovie(id: string) {
    return this.api.getMovie(id);
  }
}
