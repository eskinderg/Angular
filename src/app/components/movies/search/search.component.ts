import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../movies.service/movies.api.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/operator/do';
import {map} from 'rxjs/operator/map';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {_catch} from 'rxjs/operator/catch';
import {_do} from 'rxjs/operator/do';
import {switchMap} from 'rxjs/operator/switchMap';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {

  movies;
  model: any;
  searching = false;
  searchFailed = false;
  // term = new FormControl();

  constructor(
    private _moviesServices: MoviesApiService,
    private router: ActivatedRoute ) {
  }


  search = (text$: Observable<string>) =>
    _do.call(
      switchMap.call(
        _do.call(
          distinctUntilChanged.call(
            debounceTime.call(text$, 300)),
          () => this.searching = true),
        term =>
          _catch.call(
            _do.call(this._moviesServices.serachMovies(term), () => this.searchFailed = false),
            () => {
              this.searchFailed = true;
              return of.call([]);
            }
          )
      ),
      () => this.searching = false);

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

  btnSearch(value) {
    if (value) {
      this._moviesServices.serachMovies(value)
        .map(res => {
          const movies = res.results;
          return movies.map((movie: Movie) => new Movie(movie));
        })
        .subscribe(m => {
          this.movies = m;
        });
    }
  }

}
