import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieResults } from '../models/movie-results';
import { Movie } from '../models/movie';
import { MovieDialogService } from '../service/movie.dialog.service';
import { PaginationComponent } from '../../../fragments/components/pagination/pagination';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { MovieCardAnimations } from '../../shared/animations/fadeInAndOutMovieCard';

@Component({
    selector: 'app-right-view',
    templateUrl: 'right-view.component.html',
    styleUrls: ['right-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [MovieCardAnimations],
    imports: [PaginationComponent, MovieCardComponent]
})
export class RightViewComponent implements OnDestroy {
    router = inject(ActivatedRoute);
    route = inject(Router);
    movieModalService = inject(MovieDialogService);

    routeSubscription: Subscription;
    apiSubscription: Subscription;

    /* withComponentInputBinding */
    @Input() id = '';
    @Input() name = '';
    @Input() page = '';
    @Input() moviesResult: MovieResults;

    loadPage(page: number) {
        // const url = this.router.snapshot.params;
        // this.route.navigate(['/movies/genres', url['id'], url['name'], page]);
        this.route.navigate(['/movies/genres', this.id, this.name, page]);
    }

    get collectionSize() {
        if (this.moviesResult.total_results / 20 > 500) return 500 * 20;
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
