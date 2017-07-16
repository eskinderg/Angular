import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MoviesApiService } from './movies.api.service';
import { Tv } from '../models/tv';

@Injectable()
export class TvsResolve implements Resolve<Tv[]> {

  constructor(private moviesApiService: MoviesApiService) {}

  resolve() {
      return this.moviesApiService.getPopularSeries();
  }
}
