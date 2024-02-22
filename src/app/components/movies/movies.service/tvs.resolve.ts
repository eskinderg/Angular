import { Injectable } from '@angular/core';

import { MoviesApiService } from './movies.api.service';

@Injectable()
export class TvsResolve {
  constructor(private moviesApiService: MoviesApiService) {}

  resolve() {
    return this.moviesApiService.getPopularSeries();
  }
}
