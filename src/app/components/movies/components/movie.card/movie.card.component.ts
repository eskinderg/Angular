import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { RatingDecimalComponent } from '../rating/rating';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../directives/truncate';
import { MoviesApiService } from '../../service/movies.api.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie.card.component.html',
    styleUrls: ['./movie.card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RatingDecimalComponent, UpperCasePipe, TruncatePipe, AsyncPipe]
})
export class MovieCardComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private movieApiService = inject(MoviesApiService);

    @Input() movie: Movie;
    @Output() clickImage: EventEmitter<any> = new EventEmitter();

    dialogLoading$ = new BehaviorSubject<boolean>(false);

    imageLoading: boolean = true;
    imageUrl: string = '';
    imageLoadingUrl: string = '';
    noImageUrl: string = '';
    alt: string = '';

    movieRating: number;
    linkUrl: string = '';

    ngOnInit() {
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

    onImageClick() {
        this.clickImage.emit({ movie: this.movie, movieCardComponent: this });
    }

    handleEmptyImage() {
        this.imageLoading = false;
        this.imageUrl = this.noImageUrl;
    }

    movieDialogLoadStart() {
        this.dialogLoading$.next(true);
    }

    movieDialogLoadedFinish() {
        this.dialogLoading$.next(false);
    }

    get isInWatchList() {
        return this.movieApiService.isInWatchList(this.movie);
    }

    btnAddWatchListClick() {
        this.movieApiService.addWatchList(this.movie);
    }

    btnRemoveWatchListClick() {
        this.movieApiService.removeWatchList(this.movie);
    }
}
