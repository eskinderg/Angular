import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
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

    constructor(
        public router: ActivatedRoute,
        public route: Router,
        public viewContainer: ViewContainerRef,
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
            const comp = this.viewContainer.createComponent(MovieModalComponent);
            comp.instance.movieDetail = md;
            comp.instance.movieRating = parseFloat(comp.instance.movieDetail.vote_average);
            comp.instance.movieRating = (5 * comp.instance.movieRating) / 10;
        });
    }

    ngOnDestroy() {
        this.routeSubscription?.unsubscribe();
        this.apiSubscription?.unsubscribe();
    }
}
