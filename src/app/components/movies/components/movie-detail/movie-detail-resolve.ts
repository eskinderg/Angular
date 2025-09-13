import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Movie } from '../../models/movie';
import { MoviesApiService } from '../../service/movies.api.service';

export const moviesDetailsResolve: ResolveFn<Movie> = (route) =>
    inject(MoviesApiService).getMovie(route.params['movieId']);
