import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieResults } from '../models/movie-results';
import { ConfirmService } from 'src/app/fragments/components/dialog';

@Component({
    selector: 'app-movie-view',
    templateUrl: 'movie-view.component.html',
    styleUrls: ['movie-view.component.scss']
})
export class MovieListViewComponent implements OnDestroy, OnInit {
    movieResult: MovieResults;
    routeSubscription: Subscription | undefined;

    constructor(
        public router: ActivatedRoute,
        public route: Router,
        public dialog: ConfirmService
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

    ngOnDestroy() {
        this.routeSubscription?.unsubscribe();
    }
}
