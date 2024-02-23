import { Movie } from './movie';

export class MovieResults {
  movies: Movie[];
  page: number;
  total_pages: number;
  total_results: number;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
