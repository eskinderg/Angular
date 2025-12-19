import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { MovieDialogService } from '../service/movie.dialog.service';
import { Observable } from 'rxjs';
import { MoviesApiService } from '../service/movies.api.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-movies-watchlist',
    templateUrl: 'watchlist.component.html',
    styleUrls: ['watchlist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MovieCardComponent, AsyncPipe]
})
export class WatchListComponent implements OnDestroy {
    @Input() movies: Observable<Movie[]>;

    movieModalService = inject(MovieDialogService);
    movieApiService = inject(MoviesApiService);

    onClick(event: { movie: Movie; movieCardComponent: MovieCardComponent }) {
        this.movieModalService.load(event.movieCardComponent);
        this.movieModalService.showDialog();
    }

    ngOnDestroy() {
        this.movieModalService.destroy();
    }
}
