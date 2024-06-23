import { Injectable } from '@angular/core';
import { MoviesApiService } from './movies.api.service';

@Injectable()
export class GenreResolve {
    constructor(private moviesApiService: MoviesApiService) {}

    resolve() {
        // this.moviesApiService.getGenres()
        //  .subscribe((value) => {
        //     value.forEach(function(g){
        //      g.name = 'cahgned';
        //     });;
        // });
        return this.moviesApiService.getGenres();
    }
}
