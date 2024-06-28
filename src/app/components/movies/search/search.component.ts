import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    OnDestroy,
    ViewContainerRef,
    viewChild
} from '@angular/core';
import { MoviesApiService } from '../movies.service/movies.api.service';
import { Observable, tap, fromEvent, filter, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieResults } from '../models/movie-results';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModalComponent } from '../movieView/movie-modal/movie-modal.component';
import { MovieModalService } from '../movieView/movieModalService/movie.modal.service';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnDestroy, AfterViewInit {
    input = viewChild.required<ElementRef>('searchInput');

    movies: Observable<never>;
    model: Movie[];
    searching = false;
    searchFailed = false;
    searchTerm: string = '';
    movieResult: MovieResults;
    searchSubscription$: Subscription | undefined;
    apiSubscription: Subscription;
    movieModalComponent: ComponentRef<MovieModalComponent>;

    constructor(
        public viewContainer: ViewContainerRef,
        public movieModalService: MovieModalService,
        public route: Router,
        public router: ActivatedRoute,
        private _moviesServices: MoviesApiService,
        private cdr: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        this.searchSubscription$ = fromEvent(this.input().nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(450),
                distinctUntilChanged(),
                tap(() => {
                    this.onSearch(this.input().nativeElement.value);
                })
            )
            .subscribe();
    }

    onClick(movie: Movie) {
        this.movieModalService.setMovieId(movie.id.toString());
        this.movieModalService.setViewContainer(this.viewContainer);
        this.movieModalService.showDialog();
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

    // ngOnInit() {
    //     console.log(this.router.snapshot);
    //     this.movies = this.term.valueChanges
    //       .debounceTime(400)
    //       .distinctUntilChanged()
    //       .switchMap(term => this._moviesServices.serachMovies(term))
    //       .map(res => {
    //         const movies = res.results;
    //         return movies.map((movie: Movie) => new Movie(movie));
    //       });
    // }

    ngOnDestroy() {
        this.searchSubscription$?.unsubscribe();
        this.movieModalService.destroy();
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
