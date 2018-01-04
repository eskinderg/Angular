import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MoviesApiService } from './movies.api.service';
import { Genre } from '../models/genre';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GenreResolve implements Resolve<Genre[]> {

  constructor(private moviesApiService: MoviesApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // this.moviesApiService.getGenres()
    //  .subscribe((value) => {
    //     value.forEach(function(g){
    //      g.name = 'cahgned';
    //     });;
    // });
    return this.moviesApiService.getGenres();
  }
}
