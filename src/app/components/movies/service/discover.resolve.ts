import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MovieResults } from '../models/movie-results';
import { MoviesApiService } from './movies.api.service';

export const discoverResolver: ResolveFn<MovieResults> = () => inject(MoviesApiService).discoverMovies();
