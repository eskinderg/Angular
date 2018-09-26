import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
// import { NgbdRatingDecimal } from '../../components/rating/rating';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie.card.component.html',
  styleUrls: ['./movie.card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;

  movieRating;

  constructor() {
  }

  ngOnInit() {
    this.movieRating = parseFloat(this.movie.vote_average);
    this.movieRating = ((5 * this.movieRating) / 10);
  }
}

