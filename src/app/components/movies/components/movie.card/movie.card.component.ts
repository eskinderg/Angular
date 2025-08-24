import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { RatingDecimalComponent } from '../rating/rating';
import { UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../directives/truncate';
import { MoviesApiService } from '../../service/movies.api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie.card.component.html',
    styleUrls: ['./movie.card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RatingDecimalComponent, UpperCasePipe, TruncatePipe]
})
export class MovieCardComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private movieApiService = inject(MoviesApiService);
    private authService = inject(AuthService);
    private host = inject(ElementRef<HTMLElement>);
    favorite$ = new BehaviorSubject<boolean>(false);
    router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    @Input() movie: Movie;
    @Output() clickMovieImage: EventEmitter<Movie> = new EventEmitter();

    imageLoading: boolean = true;
    imageUrl: string = '';
    imageLoadingUrl: string = '';
    noImageUrl: string = '';
    alt: string = '';

    movieRating: number;
    linkUrl: string = '';

    ngOnInit() {
        this.movieApiService.getUserMovies().subscribe({
            next: (res: []) => {
                res.forEach((m: Movie) => {
                    if (Number(m.id) === Number(this.movie.id)) {
                        this.favorite$.next(true);
                        this.cdr.markForCheck();
                    }
                });
            }
        });
        this.imageUrl = this.movie.get_poster_path();
        this.imageLoadingUrl = '/assets/images/placeholder.gif';
        this.noImageUrl = '/assets/images/placeholder.png';

        this.linkUrl =
            '/movies/genres' +
            '/' +
            this.route.snapshot.paramMap.get('id') +
            '/' +
            this.route.snapshot.paramMap.get('name') +
            '/';

        this.movieRating = parseFloat(this.movie.vote_average);
        this.movieRating = (5 * this.movieRating) / 10;
    }

    onImageLoaded() {
        this.imageLoading = false;
    }

    onMovieImageClick() {
        this.clickMovieImage.emit(this.movie);
    }

    btnWatchListClick() {
        this.movieApiService
            .favoriteMovie([{ movieId: this.movie.id, favorite: true, userId: this.authService.userId() }])
            .subscribe({
                next: (res: []) => {
                    res.forEach((m) => {
                        if (Number(m[1]) === this.movie.id) {
                            if (!m[2] as boolean) {
                                if (this.route.snapshot.routeConfig.path === 'search') {
                                    this.host.nativeElement.remove();
                                } else {
                                    this.favorite$.next(false);
                                    this.cdr.markForCheck();
                                }
                            } else {
                                this.favorite$.next(true);
                                this.cdr.markForCheck();
                            }
                        }
                    });
                    this.cdr.markForCheck();
                }
            });
    }

    handleEmptyImage() {
        this.imageLoading = false;
        this.imageUrl = this.noImageUrl;
    }
}
