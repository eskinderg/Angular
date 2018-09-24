import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { SlideAnimation } from '../shared/animations/animations';
import { AuthService } from '../shared/services/auth/auth.service';
import { Genre } from './models/genre';
import { MoviesApiService } from './movies.service/movies.api.service';

/**
 * This class represents the lazy loaded MoviesComponent.
 */
@Component({
  selector: 'app-movies',
  templateUrl: 'movies.component.html',
  styleUrls: ['movies.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
})
export class MoviesComponent implements OnInit  {

  // public todos: Todo[];
  public movies: Array<Object>;
  public genres: Genre[];

  constructor(private route: ActivatedRoute) {
    // this.moviesApiService.getGenres()
    // .subscribe(res => {
    //   this.genres = res;
    // });

    }

  search(searchStr) {
    // this.moviesApiService.serachMovies(searchStr)
    //   .subscribe( (res) => {
    //     this.movies = res.results;
    //   });
    }

  ngOnInit() {
    // this.todos = this.route.snapshot.data['todos'];
    this.genres = this.route.snapshot.data['genres'];
  }

  onSelectGenre (genre: Genre) {
    // alert(genre.name);
    }

}
