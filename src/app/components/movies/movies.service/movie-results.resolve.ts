import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MoviesApiService } from './movies.api.service';

@Injectable()
export class MoviesResultResolve {
  constructor(private moviesApiService: MoviesApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.moviesApiService.getMoviesByGenre(route.params['id'], route.params['page']);
  }
}
