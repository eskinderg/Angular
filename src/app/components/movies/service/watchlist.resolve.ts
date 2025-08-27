import { inject } from '@angular/core';
import { MoviesApiService } from './movies.api.service';
import { ResolveFn } from '@angular/router';
import { Movie } from '../models/movie';

export const watchListResolver: ResolveFn<Movie[]> = () => inject(MoviesApiService).getUserMovies();
