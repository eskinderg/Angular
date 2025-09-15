import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MoviesApiService } from './movies.api.service';

export const discoverResolver: ResolveFn<void> = () => inject(MoviesApiService).discoverMovies();
