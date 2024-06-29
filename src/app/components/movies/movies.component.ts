import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Genre } from './models/genre';

@Component({
    selector: 'app-movies',
    templateUrl: 'movies.component.html',
    styleUrls: ['movies.component.scss'],
    animations: [fadeInAnimation],
    // host: { '[@routerFadeInAnimation]': '' }
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit {
    public movies: Array<object>;
    public genres: Genre[];

    constructor(private route: ActivatedRoute) {
        // this.moviesApiService.getGenres()
        // .subscribe(res => {
        //   this.genres = res;
        // });
    }

    search() {
        // this.moviesApiService.serachMovies(searchStr)
        //   .subscribe( (res) => {
        //     this.movies = res.results;
        //   });
    }

    ngOnInit() {
        this.genres = this.route.snapshot.data['genres'];
    }

    onSelectGenre() {
        // alert(genre.name);
    }
}
