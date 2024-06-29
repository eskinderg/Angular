import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MoviesApiService } from '../../movies.service/movies.api.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable()
export class MovieModalService {
    private movieId: string;
    private viewContainer: ViewContainerRef;
    private movieModalComponentRef: ComponentRef<MovieDialogComponent>;
    private apiSubscription: Subscription;

    constructor(public movieApiService: MoviesApiService) {}

    showDialog() {
        this.apiSubscription = this.movieApiService.getMovie(this.movieId).subscribe((movieDetail: Movie) => {
            this.viewContainer.clear();
            this.movieModalComponentRef =
                this.viewContainer.createComponent<MovieDialogComponent>(MovieDialogComponent);
            this.movieModalComponentRef.instance.movieDetail = movieDetail;
        });
    }

    setMovieId(value: string) {
        this.movieId = value;
    }

    setViewContainer(view: ViewContainerRef) {
        this.viewContainer = view;
    }

    destroy() {
        this.apiSubscription?.unsubscribe();

        if (this.movieModalComponentRef) {
            this.movieModalComponentRef.destroy();
        }
    }
}
