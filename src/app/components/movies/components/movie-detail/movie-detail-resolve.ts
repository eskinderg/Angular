import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MoviesApiService } from '../../movies.service/movies.api.service';

@Injectable()
export class MoviesDetailsResolve {
    constructor(private moviesApiService: MoviesApiService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.moviesApiService.getMovie(route.params['movieid']);
    }
}
