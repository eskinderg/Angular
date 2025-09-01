import {
    ApplicationRef,
    ComponentRef,
    EventEmitter,
    Injectable,
    Injector,
    Output,
    createComponent,
    inject
} from '@angular/core';
import { forkJoin, Subscription, take } from 'rxjs';
import { MovieDialogComponent } from '../components/dialog/movie-dialog.component';
import { MoviesApiService } from './movies.api.service';
import { Movie } from '../models/movie';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';

@Injectable({
    providedIn: 'root'
})
export class MovieDialogService {
    movieApiService = inject(MoviesApiService);
    appRef = inject(ApplicationRef);
    injector = inject(Injector);

    // @Output() dialogLoadingStart = new EventEmitter<void>();
    @Output() dialogLoadingFinish = new EventEmitter<void>();

    private movieId: string;
    private movieModalComponentRef: ComponentRef<MovieDialogComponent>;
    private apiSubscription: Subscription;
    private _movieCardComponent: MovieCardComponent;
    private _dialogSubscription: Subscription;

    load(movieCardComponent: MovieCardComponent) {
        if (this._movieCardComponent) {
            this._movieCardComponent.movieDialogLoadedFinish();
            this.destroy();
        }
        this._movieCardComponent = movieCardComponent;
        this._movieCardComponent.movieDialogLoadStart();
        this.setMovieId(this._movieCardComponent.movie.id.toString());

        this._dialogSubscription = this.dialogLoadingFinish.subscribe(() => {
            this._movieCardComponent.movieDialogLoadedFinish();
        });
    }

    setMovieId(value: string) {
        this.movieId = value;
    }

    showDialog() {
        this.apiSubscription = this.movieApiService.getMovie(this.movieId).subscribe((movieDetail: Movie) => {
            this.movieModalComponentRef = createComponent(MovieDialogComponent, {
                environmentInjector: this.appRef.injector
            });

            this.movieModalComponentRef.instance.movieDetail = movieDetail;

            this.appRef.attachView(this.movieModalComponentRef.hostView);

            forkJoin([
                this.movieModalComponentRef.instance.backdropImageLoaded.pipe(take(1)),
                this.movieModalComponentRef.instance.posterImageLoaded.pipe(take(1))
            ]).subscribe(() => {
                requestAnimationFrame(() => {
                    this.movieModalComponentRef.instance.isPosterImageLoaded = true;
                    this.movieModalComponentRef.instance.isBackDropImageLoaded = true;

                    this.movieModalComponentRef.instance.renderChanges();

                    const rootElement = this.appRef.components[0].location.nativeElement;
                    rootElement.append(this.movieModalComponentRef.location.nativeElement);
                });
            });
        });
    }

    destroy() {
        this.apiSubscription?.unsubscribe();

        if (this._dialogSubscription) {
            this._dialogSubscription.unsubscribe();
        }

        if (this.movieModalComponentRef) {
            this.movieModalComponentRef.destroy();
            this.movieModalComponentRef = null;
        }
    }
}
