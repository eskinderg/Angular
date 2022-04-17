import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoviesApiService } from '../movies.service/movies.api.service';
import { OperatorFunction, of, Observable, tap, switchMap, catchError, fromEvent, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieResults } from '../models/movie-results';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') input: ElementRef;

  movies: Observable<never>;
  model: Movie[];
  searching = false;
  searchFailed = false;
  searchTerm: string = "";
  movieResult: MovieResults;

  constructor(private _moviesServices: MoviesApiService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(450),
        distinctUntilChanged(),
        tap((text) => {
          this.onSearch(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     switchMap(term =>
  //       this._moviesServices.serachMovies(term).pipe(
  //         tap((m) => {
  //           this.searchFailed = false;
  //           // console.log('sdfsdfsdf');
  //           // this.movieSearch.push(m);
  //           // console.log(m)
  //         }),
  //         catchError(() => {
  //           this.searchFailed = true;
  //           return of([]);
  //         }))
  //     ),
  //     tap(() => this.searching = false)
  //   )

  // search : OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
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

  onSearch(searchText: string) {
    this._moviesServices.serachMovies(searchText).subscribe((m: MovieResults) => {
      this.movieResult = m;
      this.cdr.markForCheck();
    });
  }

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

  // btnSearch(value: string) {
  //   if (value) {
  //     this._moviesServices.serachMovies(value)
  //       .pipe(
  //         map(res => {
  //           // const movies = res.results;
  //           return empty();
  //           // return movies.map((movie: Movie) => new Movie(movie));
  //         })
  //       )
  //       .subscribe(m => {
  //         this.movies = m;
  //       });
  //   }
  // }

}
