import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MoviesApiService } from '../../service/movies.api.service';

@Injectable()
export class MoviesDetailsResolve {
    private moviesApiService = inject(MoviesApiService);

    resolve(route: ActivatedRouteSnapshot) {
        return this.moviesApiService.getMovie(route.params['movieid']);
    }
}
