import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MoviesApiService } from './movies.api.service';
import { Movie } from '../models/movie';

@Injectable()
export class MoviesResolve implements Resolve<Movie[]> {

  constructor(private moviesApiService: MoviesApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.moviesApiService.getMoviesByGenre(route.params['id']);
  }
}
