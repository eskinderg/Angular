import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-detail-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.scss'
})
export class MovieDetailDialogComponent implements OnInit {

  movieDetail: Movie;
  movieRating: number;

  constructor(public activeDialog: NgbActiveModal) {
  }

  ngOnInit() {
    // this.movie = this.route.snapshot.data['movie'];
    // console.log(this.movieDetail)
    this.movieRating = parseFloat(this.movieDetail.vote_average);
    this.movieRating = ((5 * this.movieRating) / 10);
  }

  close() {
    this.activeDialog.close();
  }

}
