import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { MovieDialogService } from '../service/movie.dialog.service';
import { Observable, Subscription } from 'rxjs';
import { MoviesApiService } from '../service/movies.api.service';
import { AsyncPipe } from '@angular/common';
import { MovieCardAnimations } from '../../shared/animations/fadeInAndOutMovieCard';

@Component({
    selector: 'app-movies-watchlist',
    templateUrl: 'watchlist.component.html',
    styleUrls: ['watchlist.component.scss'],
    animations: [MovieCardAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MovieCardComponent, AsyncPipe]
})
export class WatchListComponent implements OnDestroy {
    @Input() movies: Observable<Movie[]>;

    dialogSubscription: Subscription;

    movieModalService = inject(MovieDialogService);
    movieApiService = inject(MoviesApiService);

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
        this.movieModalService.destroy();
    }
}
