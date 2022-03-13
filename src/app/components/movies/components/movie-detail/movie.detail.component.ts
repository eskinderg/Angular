import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
// import { NgbdRatingDecimal } from '../../components/rating/rating';
import { MoviesApiService } from '../../movies.service/movies.api.service'

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie.detail.component.html',
  styleUrls: ['./movie.detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie | undefined;
  movieRating: number | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.movie = this.route.snapshot.data['movie'];
    this.movieRating = parseFloat(this.movie.vote_average);
    this.movieRating = ((5 * this.movieRating) / 10);
  }


}
