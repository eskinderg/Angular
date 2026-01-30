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
import { CircularRatingComponent } from 'src/app/fragments/components/circularRating/circular.component';
import { BookmarkComponent } from 'src/app/fragments/components/appBookmark/bookmark.component';
import { MoviesDataService } from '../../service/movies.data.service';
import { hrefLink, torLink } from '../../functions/link';
import { WatchedComponent } from 'src/app/fragments/components/appWatched/watched.components';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie.card.component.html',
    styleUrls: ['./movie.card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        BookmarkComponent,
        WatchedComponent,
        CircularRatingComponent,
        CommonModule,
        UpperCasePipe,
        TruncatePipe,
        AsyncPipe
    ]
})
export class MovieCardComponent implements OnInit {
    private movieApiService = inject(MoviesApiService);

    @Input() movie: Movie;
    @Output() clickImage: EventEmitter<any> = new EventEmitter();
    @Input() index: number;
    movieDataService = inject(MoviesDataService);

    dialogLoading$ = new BehaviorSubject<boolean>(false);
    imageLoaded$ = new BehaviorSubject<boolean>(false);

    imageUrl = new BehaviorSubject<string>('');
    noImageUrl: string = '/assets/images/placeholder.png';
    // imageLoadingUrl: string = '/assets/images/placeholder.gif';

    ngOnInit() {
        const imgUrl = this.movie.get_poster_path() ?? this.noImageUrl;
        this.imageUrl.next(imgUrl);
    }

    onImageLoaded() {
        this.imageLoaded$.next(true);
    }

    onImageClick() {
        this.clickImage.emit({ movie: this.movie, movieCardComponent: this });
    }

    get WatchLink(): string {
        return hrefLink(this.movie);
    }

    get TorLink(): string {
        return torLink(this.movie);
    }

    handleEmptyImage() {
        this.imageUrl.next(this.noImageUrl);
        this.onImageLoaded();
    }

    movieDialogLoadStart() {
        this.dialogLoading$.next(true);
    }

    movieDialogLoadedFinish() {
        this.dialogLoading$.next(false);
    }

    onAnimationEnd($event: any) {
        ($event.target as HTMLElement).classList.add('animated');
    }

    get isInWatchList() {
        return this.movieApiService.isInWatchList(this.movie);
    }

    get isInWatchedList() {
        return this.movieApiService.isInWatchedList(this.movie);
    }

    onBookmarkToggled(event: any) {
        if (event) this.movieApiService.addWatchList(this.movie);
        else this.movieApiService.removeWatchList(this.movie);
    }

    onWatchedToggled(event: any) {
        if (event) this.movieApiService.addWatchedList(this.movie);
        else this.movieApiService.removeWatchedList(this.movie);
    }
}
