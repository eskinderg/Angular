import { ApplicationRef, ComponentRef, Injectable, Injector, createComponent, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDialogComponent } from '../components/dialog/movie-dialog.component';
import { MoviesApiService } from './movies.api.service';
import { Movie } from '../models/movie';

@Injectable({
    providedIn: 'root'
})
export class MovieDialogService {
    movieApiService = inject(MoviesApiService);
    appRef = inject(ApplicationRef);
    injector = inject(Injector);

    private movieId: string;
    private movieModalComponentRef: ComponentRef<MovieDialogComponent>;
    private apiSubscription: Subscription;

    setMovieId(value: string) {
        this.movieId = value;
    }

    showDialog() {
        this.apiSubscription = this.movieApiService.getMovie(this.movieId).subscribe((movieDetail: Movie) => {
            const rootElement = this.appRef.components[0].location.nativeElement;

            this.movieModalComponentRef = createComponent(MovieDialogComponent, {
                environmentInjector: this.appRef.injector
            });

            this.movieModalComponentRef.instance.movieDetail = movieDetail;

            this.appRef.attachView(this.movieModalComponentRef.hostView);

            rootElement.append(this.movieModalComponentRef.location.nativeElement);
        });
    }

    destroy() {
        this.apiSubscription?.unsubscribe();

        if (this.movieModalComponentRef) {
            this.movieModalComponentRef.destroy();
        }
    }
}
