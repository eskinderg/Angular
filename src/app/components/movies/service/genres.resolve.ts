import { inject } from '@angular/core';
import { MoviesApiService } from './movies.api.service';
import { ResolveFn } from '@angular/router';
import { Genre } from '../models/genre';

export const genreResolver: ResolveFn<Genre[]> = () => inject(MoviesApiService).getGenres();
