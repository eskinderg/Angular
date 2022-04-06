import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { Http} from '@angular/common/http';
// import { Response, URLSearchParams, Jsonp} from '@angular/common/http';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { Tv } from '../models/tv';

import { tap, catchError, retry, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieResults } from '../models/movie-results';

const API_URL = environment.MOVIES_API;
const API_KEY = environment.MOVIES_API_KEY;

@Injectable()
export class MoviesDataService {

  apikey = API_KEY;

  constructor(private http: HttpClient) {
    this.apikey = API_KEY;
  }

  getPopular() {
    const search = new HttpParams();
    search.set('sort_by', 'popularity.desc');
    search.set('api_key', this.apikey);
    return this.http.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK', { 'params': search })
      .pipe
      (
        map(res => {
          return res;
        })
      )
  }

  getPopularSeries(): Observable<Tv[]> {
    const search = new HttpParams();
    search.set('api_key', this.apikey);
    return this.http.get<Tv[]>('https://api.themoviedb.org/3/tv/popular?api_key=' + this.apikey)
      .pipe(
        map(data => {
          const tvs = data['results'];
          return tvs.map((tv: Tv) => new Tv(tv));
        })
      )
    //   .pipe
    //   (
    //     map(res => {
    //       const tvs = res;
    //       return tvs.map((tv: Tv) => new Tv(tv));
    //     })
    //   )
  }

  // getInTheaters() {
  //   const search = new URLSearchParams();
  //   search.set('primary_release_date.gt', '2015-10-20');
  //   search.set('primary_release_date.lte', '2015-12-20');
  //   search.set('sort_by', 'popularity.desc');
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getTopRatedMovies() {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/top_rated?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  searchMovies(searchStr: string) {
    return this.http.get<Movie[]>('https://api.themoviedb.org/3/search/movie' + '?api_key=' + this.apikey +'&query=' + searchStr)
      .pipe
      (
        map(res => {
          const result: MovieResults = new MovieResults();
          result.total_pages = res['total_pages'];
          result.total_results = res['total_results'];
          result.page = res['page']
          result.movies = res['results'].map((movie: Movie) => new Movie(movie));
          return result
        })
      )
  }

  getMovie(id: string) {
    const search = new URLSearchParams();
    search.set('api_key', this.apikey);
    return this.http.get<Movie>('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.apikey)
      .pipe
      (
        map(res => {
          return res;
        })
      )
  }

  // getGenres(): Observable<Genre[]> {
  //   let search = new URLSearchParams();
  //   search.set('language', 'en-US');
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK', {search})
  //     .map(res => {
  //       const genres = res.json().genres;
  //       return genres.map((genre: Genre) => {
  //         const newGenre = new Genre(genre);
  //         this.getGenreMovieCount(genre.id.toString())
  //             .subscribe(count => newGenre.total_results = count);
  //         return newGenre;
  //       });
  //     });
  // }

  getGenres(): Observable<Genre[]> {
    const search = new URLSearchParams();
    search.set('language', 'en-US');
    search.set('api_key', this.apikey);
    return this.http.get<Genre[]>('https://api.themoviedb.org/3/genre/movie/list?api_key=' + this.apikey)
      .pipe
      (
        map((res) => {
          const genres = res['genres'];
          return genres.map((genre: Genre) => new Genre(genre));
        })
      )
  }

  getGenreMovieCount(genreId: string) {
    const search = new URLSearchParams();
    search.set('api_key', this.apikey);
    // search.set('page', '10');
    return this.http.get('https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=' + this.apikey)
      .pipe
      (
        map(res => {
          return res['total_results'];
          // console.log(res.json().total_results);
          // return movies.map((movie: Movie) => new Movie(movie));
          // return res.json();
        })
      )
  }

  // getMoviesByGenre(id: string): Observable<Movie[]> {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   // search.set('page', '10');
  //   return this.http.get<Movie[]>('https://api.themoviedb.org/3/genre/' + id + '/movies?api_key=' + this.apikey)
  //   .pipe
  //   (
  //     map(res => {
  //       const movies = res['results'];
  //       // console.log(res.json().total_results);
  //       return movies.map((movie: Movie) => new Movie(movie));
  //       // return res.json();
  //     })
  //   )
  // }

  getMoviesByGenre(id: string, page: number = 1): Observable<MovieResults> {
    return this.http.get<MovieResults>('https://api.themoviedb.org/3/genre/' + id + '/movies?api_key=' + this.apikey + '&page=' + page.toString())
      .pipe(
        map(res => {
          const result: MovieResults = new MovieResults();
          result.total_pages = res['total_pages'];
          result.total_results = res['total_results'];
          result.page = res['page']
          result.movies = res['results'].map((movie: Movie) => new Movie(movie));
          return result
        })
      )
  }

  // getMovieReviews(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/reviews?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }
  // getMovieVideos(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/videos?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getSimilarMovies(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/similar?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getMovieCredits(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/credits?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getUpComingMovies() {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getPopularSeries(): Observable<Tv[]> {
  //   const search = new HttpParams();
  //   search.set('api_key', this.apikey);
  //   return this.http.get('https://api.themoviedb.org/3/tv/popular?callback=JSONP_CALLBACK', {'params':search})
  //   .pipe
  //   (
  //     map(res => {
  //       const tvs = res;
  //       return tvs.map((tv: Tv) => new Tv(tv));
  //     })
  //   )
  // }


  // getTopRatedSeries() {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/tv/top_rated?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getSerieDetails(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/tv/' + id + '?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getSerieVideos(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/tv/' + id + '/videos?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getPersonDetail(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/person/' + id + '?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  // getPersonCast(id: string) {
  //   const search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/person/' + id + '/movie_credits?callback=JSONP_CALLBACK', {search})
  //   .pipe
  //   (
  //     map(res => {
  //       return res.json();
  //     })
  //   )
  // }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return observableThrowError(error);
  }
}
