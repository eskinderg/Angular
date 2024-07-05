import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieResults } from '../models/movie-results';
import { Movie } from '../models/movie';
import { MovieDialogService } from '../service/movie.dialog.service';

@Component({
    selector: 'app-right-view',
    templateUrl: 'right-view.component.html',
    styleUrls: ['right-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightViewComponent implements OnDestroy, OnInit {
    movieResult: MovieResults;
    routeSubscription: Subscription;
    apiSubscription: Subscription;

    constructor(
        public router: ActivatedRoute,
        public route: Router,
        public movieModalService: MovieDialogService
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
        this.movieModalService.setMovieId(movie.id.toString());
        this.movieModalService.showDialog();
    }

    ngOnDestroy() {
        this.routeSubscription?.unsubscribe();
        this.movieModalService.destroy();
    }
}
