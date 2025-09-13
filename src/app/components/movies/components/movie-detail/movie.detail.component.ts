import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule, Location } from '@angular/common';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie.detail.component.html',
    styleUrls: ['./movie.detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class MovieDetailComponent {
    @Input() movie: Movie;

    private location = inject(Location);

    constructor() {
        (document.getElementsByClassName('content')[0] as HTMLElement).style.margin = '0';
    }

    goBack() {
        this.location.back();
    }
}
