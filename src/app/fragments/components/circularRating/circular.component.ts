import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from 'src/app/components/movies/models/movie';

@Component({
    selector: 'app-circular-rating',
    templateUrl: './circular.component.html',
    styleUrls: ['./circular.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class CircularRatingComponent {
    @Input() movie: Movie;
    @Input() size: number = 50;

    get voteAverage(): number {
        return Number(this.movie.vote_average);
    }
}
