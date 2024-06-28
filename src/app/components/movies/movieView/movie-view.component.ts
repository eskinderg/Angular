import { Component, ComponentRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieResults } from '../models/movie-results';
import { Movie } from '../models/movie';
import { MovieModalComponent } from './movie-modal/movie-modal.component';
import { MoviesApiService } from '../movies.service/movies.api.service';

@Component({
    selector: 'app-movie-view',
    templateUrl: 'movie-view.component.html',
    styleUrls: ['movie-view.component.scss']
})
export class MovieListViewComponent implements OnDestroy, OnInit {
    movieResult: MovieResults;
    routeSubscription: Subscription;
    apiSubscription: Subscription;
    movieModalComponent: ComponentRef<MovieModalComponent>;

    constructor(
        public viewContainer: ViewContainerRef,
        public router: ActivatedRoute,
        public route: Router,
        public movieApiService: MoviesApiService
    ) {}

    ngOnInit() {
        this.routeSubscription = this.router.params.subscribe(() => {
            this.movieResult = this.router.snapshot.data['moviesResult'];
        });
    }

    loadPage(page: number) {
        const url = this.router.snapshot.params;
        this.route.navigate(['/movies/genres', url['id'], url['name'], page]);
    }

    get collectionSize() {
        if (this.movieResult.total_results / 20 > 500) return 500 * 20;
        else return 375 * 20;
    }

    onClick(movie: Movie) {
        this.apiSubscription = this.movieApiService.getMovie(movie.id.toString()).subscribe((md) => {
            this.viewContainer.clear();
            this.movieModalComponent = this.viewContainer.createComponent(MovieModalComponent);
            this.movieModalComponent.instance.movieDetail = md;
        });
    }

    ngOnDestroy() {
        this.routeSubscription?.unsubscribe();
        this.apiSubscription?.unsubscribe();

        if (this.movieModalComponent) {
            this.movieModalComponent.destroy();
        }
    }
}
