import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { MoviesDataService } from './movies.data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

@Injectable()
export class MoviesApiService {

  constructor(private api: MoviesDataService) { }

  serachMovies(searchStr: string) {
    if (searchStr !== undefined && searchStr !== '') {
      return this.api.searchMovies(searchStr);
    }
    return Observable.empty<any>();
  }
  getPopularSeries() {
    return this.api.getPopularSeries();
  }

  getGenres(): Observable<Genre[]> {
    return this.api.getGenres();
  }

  getMoviesCountByGenre(id: string) {
    return this.api.getGenreMovieCount(id);
  }

  getMoviesByGenre(id: string): Observable<Movie[]> {
    return this.api.getMoviesByGenre(id);
  }

  getMovie(id) {
    return this.api.getMovie(id);
  }
}
