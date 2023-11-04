
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MoviesApiService } from '../../movies.service/movies.api.service'
import { Movie } from '../../models/movie';

@Injectable()
export class MoviesDetailsResolve  {

  constructor(private moviesApiService: MoviesApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.moviesApiService.getMovie(route.params['idmovie']);
  }
}
