import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResults } from '../models/movie-results';

@Component({
  selector: 'app-genres',
  templateUrl: 'genre.component.html',
  styleUrls: ['genre.component.scss'],
})
export class GenreComponent implements OnInit {

  movieResult: MovieResults;

  constructor(
    private router: ActivatedRoute,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.router.params.subscribe(() => {
      this.movieResult = this.router.snapshot.data['moviesResult']
    });
  }

  loadPage(page: number) {
    const url = this.router.snapshot.params;
    this.route.navigate(['/movies/genres', url['id'], url['name'], page])
  }

  get collectionSize() {
    if (this.movieResult.total_results / 20 > 500)
      return 500 * 20;
    else
      return 375 * 20;
  }
}
