import { ResolveFn } from '@angular/router';
import { Tv } from '../movies/models/tv';
import { inject } from '@angular/core';
import { MoviesApiService } from '../movies/service/movies.api.service';

export const resolveTvs: ResolveFn<Tv[]> = () => inject(MoviesApiService).getPopularSeries();
