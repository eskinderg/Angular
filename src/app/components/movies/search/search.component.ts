import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    OnDestroy,
    viewChild,
    inject
} from '@angular/core';
import { MoviesApiService } from '../service/movies.api.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieResults } from '../models/movie-results';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDialogComponent } from '../components/dialog/movie-dialog.component';
import { MovieDialogService } from '../service/movie.dialog.service';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MovieCardComponent]
})
export class SearchComponent implements OnDestroy, AfterViewInit {
    movieModalService = inject(MovieDialogService);
    route = inject(Router);
    router = inject(ActivatedRoute);
    public _moviesServices = inject(MoviesApiService);
    private cdr = inject(ChangeDetectorRef);

    input = viewChild.required<ElementRef>('searchInput');

    searchTerm$ = new BehaviorSubject<string>('');
    movies: Observable<never>;
    model: Movie[];
    searching = false;
    searchFailed = false;
    movieResult: MovieResults;
    searchSubscription$: Subscription | undefined;
    apiSubscription: Subscription;
    movieModalComponent: ComponentRef<MovieDialogComponent>;

    ngAfterViewInit() {
        this.searchSubscription$ = this.searchTerm$.subscribe((term) => {
            this.onSearch(term);
        });
        // this.searchSubscription$ = fromEvent(this.input().nativeElement, 'keyup')
        //     .pipe(
        //         filter(Boolean),
        //         debounceTime(450),
        //         distinctUntilChanged(),
        //         tap(() => {
        //             this.onSearch(this.input().nativeElement.value);
        //         })
        //     )
        //     .subscribe();
    }

    onSearch(searchText: string) {
        this._moviesServices.serachMovies(searchText).subscribe((m: MovieResults) => {
            this.movieResult = m;
            this.cdr.markForCheck();
        });
    }

    ngOnDestroy() {
        this.searchSubscription$?.unsubscribe();
        this.movieModalService.destroy();
    }

    onSearchInput(event: any) {
        const element = event.currentTarget as HTMLInputElement;
        const value = element.value;
        this.searchTerm$.next(value);
    }

    onClick(movie: Movie) {
        this.movieModalService.setMovieId(movie.id.toString());
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
