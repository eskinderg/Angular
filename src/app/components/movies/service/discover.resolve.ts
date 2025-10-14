import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MoviesApiService } from './movies.api.service';
import { MovieQueryParams } from './movies.data.service';
const homePage: MovieQueryParams = { page: 1, endDate: null, startDate: null, sortBy: null };
export const discoverResolver: ResolveFn<void> = () =>
    inject(MoviesApiService).discoverMoviesForHome(homePage);
