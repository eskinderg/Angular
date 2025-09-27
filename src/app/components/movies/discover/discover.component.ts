import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { MovieDialogService } from '../service/movie.dialog.service';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../service/movies.api.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, distinctUntilChanged, debounceTime, fromEvent, combineLatest, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { YearRangeSliderComponent } from './year/year-range-slider.component';

@Component({
    selector: 'app-movies-discover',
    templateUrl: 'discover.component.html',
    styleUrls: ['discover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MovieCardComponent, AsyncPipe, YearRangeSliderComponent]
})
export class DiscoverComponent implements OnInit, OnDestroy {
    private readonly movieModalService = inject(MovieDialogService);
    public readonly movieApiService = inject(MoviesApiService);

    selectedLanguage$ = new BehaviorSubject<string>(null);
    startYear$ = new BehaviorSubject<string>(null);
    endYear$ = new BehaviorSubject<string>(null);
    sortDirection$ = new BehaviorSubject<string>(null);

    private readonly destroyRef = inject(DestroyRef);

    languages$ = combineLatest([this.movieApiService.getLanguages(), this.selectedLanguage$]).pipe(
        map(([langs, _selectedLang]) => {
            return langs;
        })
    );

    ngOnInit() {
        this.setupInfiniteScroll();
        this.loadNextPage();
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

                if (position >= height - threshold) {
                    this.loadNextPage();
                }
            });
    }

    onClick(event: { movie: Movie; movieCardComponent: MovieCardComponent }) {
        this.movieModalService.load(event.movieCardComponent);
        this.movieModalService.showDialog();
    }

    private loadNextPage(): void {
        const queryParams = {
            lang: this.selectedLanguage$.value,
            startDate: this.startYear$.value,
            endDate: this.endYear$.value,
            sortBy: this.sortDirection$.value
        };

        this.movieApiService.discoverMovies(queryParams);
    }

    languageSelected(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedLanguage = selectElement.value;
        this.movieApiService.setPreferedMovieLang(selectedLanguage);
        this.movieApiService.discoverReset();
        this.loadNextPage();
    }

    onYearRangeSelected(event: { startDate: string; endDate: string }) {
        this.startYear$.next(event.startDate);
        this.endYear$.next(event.endDate);
        this.sortDirection$.next('desc');
        this.movieApiService.discoverReset();
        this.loadNextPage();
    }

    get Movies() {
        return this.movieApiService.discoverdMovies();
    }

    get isDiscoverMoviesLoading() {
        return this.movieApiService.isDiscoverLoading();
    }

    get UserPreferedLanaguage() {
        return this.movieApiService.getPreferedMovieLang();
    }

    trackByMovie(index: number, movie: Movie) {
        return index + movie.id;
    }

    ngOnDestroy(): void {
        this.movieApiService.discoverReset();
    }
}
