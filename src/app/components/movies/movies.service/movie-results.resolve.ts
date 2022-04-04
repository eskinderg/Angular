
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MoviesApiService } from './movies.api.service';
import { MovieResults } from '../models/movie-results';

@Injectable()
export class MoviesResultResolve implements Resolve<MovieResults> {

  constructor(private moviesApiService: MoviesApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.moviesApiService.getMoviesByGenre(route.params['id'],route.params['page']);
  }
}
