
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MoviesApiService } from './movies.api.service';
import { MovieResults } from '../models/movie-results';

@Injectable()
export class MoviesResultResolve  {

  constructor(private moviesApiService: MoviesApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.moviesApiService.getMoviesByGenre(route.params['id'],route.params['page']);
  }
}
