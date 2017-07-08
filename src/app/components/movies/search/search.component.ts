import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../movies.service/movies.api.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {

  movies;
  term = new FormControl();

  constructor(
    private _moviesServices: MoviesApiService,
    private router: ActivatedRoute ) {
  }

ngOnInit() {
  this.movies = this.term.valueChanges
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => this._moviesServices.serachMovies(term))
    .map(res => {
      const movies = res.results;
      return movies.map((movie: Movie) => new Movie(movie));
    });
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
