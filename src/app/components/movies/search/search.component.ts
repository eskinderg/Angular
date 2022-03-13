import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../movies.service/movies.api.service';
import { FormControl } from '@angular/forms';

import { empty } from 'rxjs';

import { of, Observable, Subject, pipe } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {

  movies: Observable<never> | undefined;
  model: any;
  searching = false;
  searchFailed = false;
  // term = new FormControl();

  constructor(
    private _moviesServices: MoviesApiService,
    private router: ActivatedRoute ) {
  }


  // search = (text$: Observable<string>) =>
  //   pipe(
  //   tap.call(
  //     switchMap.call(
  //       tap.call(
  //         distinctUntilChanged.call(
  //           debounceTime.call(text$, 300)),
  //         () => this.searching = true),
  //       term =>
  //       catchError.call(
  //         tap.call(this._moviesServices.serachMovies(term), () => this.searchFailed = false),
  //         () => {
  //           this.searchFailed = true;
  //           return of.call([]);
  //         }
  //       )
  //     ),
  //     () => this.searching = false)
  //   );

  ngOnInit() {
    // this.movies = this.term.valueChanges
    //   .debounceTime(400)
    //   .distinctUntilChanged()
    //   .switchMap(term => this._moviesServices.serachMovies(term))
    //   .map(res => {
    //     const movies = res.results;
    //     return movies.map((movie: Movie) => new Movie(movie));
    //   });
  }

  btnSearch(value: string) {
    if (value) {
      this._moviesServices.serachMovies(value)
        .pipe(
          map(res => {
            // const movies = res.results;
            return empty();
            // return movies.map((movie: Movie) => new Movie(movie));
          })
        )
        .subscribe(m => {
          this.movies = m;
        });
    }
  }

}
