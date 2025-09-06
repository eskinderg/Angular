import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ElementRef,
    OnDestroy,
    viewChild,
    inject
} from '@angular/core';
import { MoviesApiService } from '../service/movies.api.service';
import { Observable, Subscription, BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieResults } from '../models/movie-results';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDialogComponent } from '../components/dialog/movie-dialog.component';
import { MovieDialogService } from '../service/movie.dialog.service';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { AsyncPipe } from '@angular/common';
import { MovieCardListAnimation } from '../../shared/animations/fadeInAndOutMovieCard';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [MovieCardListAnimation],
    imports: [MovieCardComponent, AsyncPipe]
})
export class SearchComponent implements OnDestroy, AfterViewInit {
    movieModalService = inject(MovieDialogService);
    route = inject(Router);
    router = inject(ActivatedRoute);
    public _moviesServices = inject(MoviesApiService);

    dialogSubscription: Subscription;
    input = viewChild.required<ElementRef>('searchInput');

    searchTerm$ = new BehaviorSubject<string>('');
    movieResults$ = new BehaviorSubject<MovieResults>(null);
    movies: Observable<never>;
    model: Movie[];
    searching = false;
    searchFailed = false;
    searchSubscription$: Subscription | undefined;
    apiSubscription: Subscription;
    movieModalComponent: ComponentRef<MovieDialogComponent>;

    ngAfterViewInit() {
        this.searchSubscription$ = this.searchTerm$
            .pipe(debounceTime(450), distinctUntilChanged())
            .subscribe((term) => {
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
        this.movieResults$.next(null);
        this._moviesServices.serachMovies(searchText).subscribe((m: MovieResults) => {
            this.movieResults$.next(m);
            // this.movieResult = m;
            // this.cdr.markForCheck();
        });
    }

    onSearchInput(event: any) {
        const element = event.currentTarget as HTMLInputElement;
        const value = element.value;
        if (!value.length) {
            this.clearSearch();
        } else {
            this.searchTerm$.next(value);
        }
    }

    clearSearch() {
        this.searchTerm$.next('');
    }

    onClick(event: { movie: Movie; movieCardComponent: MovieCardComponent }) {
        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
        }

        event.movieCardComponent.movieDialogLoadStart();

        this.movieModalService.setMovieId(event.movie.id.toString());
        this.movieModalService.showDialog();

        this.dialogSubscription = this.movieModalService.dialogLoadingFinish.subscribe(() => {
            event.movieCardComponent.movieDialogLoadedFinish();
        });
    }

    ngOnDestroy() {
        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
        }

        this.searchSubscription$?.unsubscribe();
        this.movieModalService.destroy();
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
