import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../movies.service/movies.api.service';

@Component({
  selector: 'app-genres',
  templateUrl: 'genre.component.html',
  styleUrls: ['genre.component.scss']
})
export class GenreComponent implements OnInit {

  movies: Movie[];
  total_movies_count: number;

  constructor(
    private _moviesServices: MoviesApiService,
    private router: ActivatedRoute ) {
    }

    ngOnInit() {
      this.router.params.subscribe((params) => {
        this.movies = this.router.snapshot.data['movies'];
      });
    }
}
