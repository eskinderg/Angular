import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Genre } from './models/genre';
import { LeftViewComponent } from './left.view/left.view.component';

@Component({
    standalone: true,
    selector: 'app-movies',
    templateUrl: 'movies.component.html',
    styleUrls: ['movies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LeftViewComponent, RouterOutlet]
})
export class MoviesComponent {
    /* withComponentInputBinding */
    @Input() genres: Genre[];

    constructor() {}

    onGenreSelect() {}
}
