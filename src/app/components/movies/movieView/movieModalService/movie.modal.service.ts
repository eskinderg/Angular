import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { MoviesApiService } from '../../movies.service/movies.api.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable()
export class MovieModalService {
    private movieId: string;
    private viewContainer: ViewContainerRef;
    private movieModalComponentRef: ComponentRef<MovieModalComponent>;
    private apiSubscription: Subscription;

    constructor(public movieApiService: MoviesApiService) {}

    showDialog() {
        this.apiSubscription = this.movieApiService.getMovie(this.movieId).subscribe((movieDetail: Movie) => {
            this.viewContainer.clear();
            this.movieModalComponentRef =
                this.viewContainer.createComponent<MovieModalComponent>(MovieModalComponent);
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
