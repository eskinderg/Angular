import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie.detail.component.html',
  styleUrls: ['./movie.detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  movieRating: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.movie = this.route.snapshot.data['movie'];
    this.movieRating = parseFloat(this.movie.vote_average);
    this.movieRating = ((5 * this.movieRating) / 10);
  }


}
