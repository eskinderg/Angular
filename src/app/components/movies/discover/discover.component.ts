import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieResults } from '../models/movie-results';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { MovieDialogService } from '../service/movie.dialog.service';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../service/movies.api.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MovieCardListAnimation } from '../../shared/animations/fadeInAndOutMovieCard';

@Component({
    selector: 'app-movies-discover',
    templateUrl: 'discover.component.html',
    styleUrls: ['discover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: MovieCardListAnimation,
    imports: [MovieCardComponent, AsyncPipe]
})
export class DiscoverComponent implements OnInit, OnDestroy {
    /* withComponentInputBinding */
    @Input() movieResult: MovieResults;
    movieModalService = inject(MovieDialogService);
    movieApiService = inject(MoviesApiService);

    private page = 1;
    private scrollSub?: () => void;

    // movies$ = new BehaviorSubject<Movie[]>([]);
    movies: Movie[] = [];
    loading$ = new BehaviorSubject<boolean>(false);
    apiSubscription: Subscription;

    ngOnInit() {
        // this.movies$.next([...this.movieResult.movies]);
        this.movies = [...this.movieResult.movies];
        const contentEl = document.querySelector('.content');
        if (contentEl) {
            this.scrollSub = this.onScroll(contentEl);
        }
    }

    ngOnDestroy(): void {
        if (this.scrollSub) {
            this.scrollSub(); // remove listener
        }
    }

    onClick(event: { movie: Movie; movieCardComponent: MovieCardComponent }) {
        this.movieModalService.load(event.movieCardComponent);
        this.movieModalService.showDialog();
    }

    private onScroll(container: Element): () => void {
        const handler = () => {
            const threshold = 200; // px from bottom
            const position = container.scrollTop + container.clientHeight;
            const height = container.scrollHeight;

            if (position >= height - threshold) {
                this.loadNextPage();
            }
        };
        container.addEventListener('scroll', handler);
        return () => container.removeEventListener('scroll', handler);
    }

    private loadNextPage() {
        if (this.loading$.value) return;
        if (this.page >= this.movieResult.total_pages) return;

        this.loading$.next(true);
        this.page++;

        if (this.apiSubscription) {
            this.apiSubscription.unsubscribe();
        }

        this.apiSubscription = this.movieApiService.discoverMovies(this.page.toString()).subscribe({
            next: (res: MovieResults) => {
                // console.log(this.movies$.value);
                // this.movies$.next([...this.movies$.value, ...res.movies]);
                // console.log(this.movies$.value);
                this.movies = [...this.movies, ...res.movies];
                this.loading$.next(false);
            },
            error: () => this.loading$.next(false)
        });
    }
}
