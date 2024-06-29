import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Genre } from './models/genre';

@Component({
    selector: 'app-movies',
    templateUrl: 'movies.component.html',
    styleUrls: ['movies.component.scss'],
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush
    // host: { '[@routerFadeInAnimation]': '' }
})
export class MoviesComponent {
    public genres: Genre[];

    constructor(private route: ActivatedRoute) {
        this.genres = this.route.snapshot.data['genres'];
    }

    onGenreSelect() {}
}
