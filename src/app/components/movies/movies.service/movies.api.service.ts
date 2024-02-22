import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
// import { Movie } from '../models/movie';
import { Tv } from '../models/tv';
import { MoviesDataService } from './movies.data.service';
import { Observable, empty, map } from 'rxjs';
import { MovieResults } from '../models/movie-results';

@Injectable()
export class MoviesApiService {
  constructor(private api: MoviesDataService) {}

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
}
