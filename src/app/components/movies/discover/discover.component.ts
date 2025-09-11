import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { MovieResults } from '../models/movie-results';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { MovieDialogService } from '../service/movie.dialog.service';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../service/movies.api.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, take, distinctUntilChanged, debounceTime, fromEvent } from 'rxjs';
import { MovieCardListAnimation } from '../../shared/animations/fadeInAndOutMovieCard';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { YearRangeSliderComponent } from './year/year-range-slider.component';

@Component({
    selector: 'app-movies-discover',
    templateUrl: 'discover.component.html',
    styleUrls: ['discover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: MovieCardListAnimation,
    imports: [MovieCardComponent, AsyncPipe, YearRangeSliderComponent]
})
export class DiscoverComponent implements OnInit {
    @Input() movieResult!: MovieResults;

    private readonly movieModalService = inject(MovieDialogService);
    public readonly movieApiService = inject(MoviesApiService);

    private page = 1;

    languages$ = this.movieApiService.getLanguages(['am', 'en', 'fr', 'it']);
    movies$ = new BehaviorSubject<Movie[]>([]);
    loading$ = new BehaviorSubject<boolean>(false);
    selectedLanguage$ = new BehaviorSubject<string>(null);
    startYear$ = new BehaviorSubject<string>(null);
    endYear$ = new BehaviorSubject<string>(null);
    sortDirection$ = new BehaviorSubject<string>(null);

    private readonly destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.movies$.next([...this.movieResult.movies]);
        this.setupInfiniteScroll();
    }

    private setupInfiniteScroll(): void {
        const contentEl = document.querySelector('.content');
        if (!contentEl) {
            console.error('Content element not found for infinite scroll.');
            return;
        }

        fromEvent(contentEl, 'scroll')
            .pipe(debounceTime(50), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                const threshold = 200;
                const position = contentEl.scrollTop + contentEl.clientHeight;
                const height = contentEl.scrollHeight;

                if (position >= height - threshold && !this.loading$.value) {
                    this.loadNextPage();
                }
            });
    }

    onClick(event: { movie: Movie; movieCardComponent: MovieCardComponent }) {
        this.movieModalService.load(event.movieCardComponent);
        this.movieModalService.showDialog();
    }

    private loadNextPage(): void {
        if (this.page >= this.movieResult.total_pages) return;

        this.loading$.next(true);
        this.page++;

        this.movieApiService
            .discoverMovies(
                this.page.toString(),
                this.selectedLanguage$.value,
                this.startYear$.value,
                this.endYear$.value,
                this.sortDirection$.value
            )
            .pipe(take(1), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res: MovieResults) => {
                    // Get the current array, create a new one, and emit it
                    this.movieResult = res;
                    this.movies$.next([...this.movies$.value, ...res.movies]);
                    this.loading$.next(false);
                },
                error: () => this.loading$.next(false)
            });
    }

    languageSelected(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedLanguage = selectElement.value;
        this.selectedLanguage$.next(selectedLanguage);
        this.page = 0;
        this.movies$.next([]);
        this.loadNextPage();
    }

    onYearRangeSelected(event: { startDate: string; endDate: string }) {
        this.startYear$.next(event.startDate);
        this.endYear$.next(event.endDate);
        this.sortDirection$.next('desc');
        this.page = 0;
        this.movies$.next([]);
        this.loadNextPage();
    }

    trackByMovie(index: number, movie: Movie) {
        return index + movie.id;
    }
}
