import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { AsyncPipe, CommonModule, UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../directives/truncate';
import { MoviesApiService } from '../../service/movies.api.service';
import { BehaviorSubject } from 'rxjs';
import { MovieCardComponentAnimations } from './movie.card.component.animation';
import { CircularRatingComponent } from 'src/app/fragments/components/circularRating/circular.component';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie.card.component.html',
    styleUrls: ['./movie.card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: MovieCardComponentAnimations,
    imports: [RouterLink, CircularRatingComponent, CommonModule, UpperCasePipe, TruncatePipe, AsyncPipe]
})
export class MovieCardComponent implements OnInit {
    private movieApiService = inject(MoviesApiService);

    @Input() movie: Movie;
    @Output() clickImage: EventEmitter<any> = new EventEmitter();

    dialogLoading$ = new BehaviorSubject<boolean>(false);
    imageLoaded$ = new BehaviorSubject<boolean>(false);

    imageLoaded: boolean = false;
    imageUrl: string = '';
    imageLoadingUrl: string = '/assets/images/placeholder.gif';
    noImageUrl: string = '/assets/images/placeholder.png';
    alt: string = '';

    linkUrl: string = '';

    ngOnInit() {
        this.imageUrl = this.movie.get_poster_path() ?? this.noImageUrl;
    }

    onImageLoaded() {
        this.imageLoaded$.next(true);
        this.imageLoaded = true;
    }

    onImageClick() {
        this.clickImage.emit({ movie: this.movie, movieCardComponent: this });
    }

    handleEmptyImage() {
        this.imageUrl = this.noImageUrl;
        this.imageLoaded = true;
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
