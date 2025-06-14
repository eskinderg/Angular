import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RatingDecimalComponent } from '../rating/rating';
import { FormatDatePipe } from '../../directives/dateFormat';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie.detail.component.html',
    styleUrls: ['./movie.detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, RatingDecimalComponent, FormatDatePipe]
})
export class MovieDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);

    movie: Movie;
    movieRating: number;

    ngOnInit() {
        this.movie = this.route.snapshot.data['movie'];
        this.movieRating = parseFloat(this.movie.vote_average);
        this.movieRating = (5 * this.movieRating) / 10;
    }
}
