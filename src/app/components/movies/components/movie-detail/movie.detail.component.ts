import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormatDatePipe } from '../../directives/dateFormat';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie.detail.component.html',
    styleUrls: ['./movie.detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, FormatDatePipe]
})
export class MovieDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);

    movie: Movie;
    movieRating: number;

    ngOnInit() {
        this.movie = this.route.snapshot.data['movie'];
        this.movieRating = this.movie.vote_average;
        this.movieRating = (5 * this.movieRating) / 10;
    }
}
