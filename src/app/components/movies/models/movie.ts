export class Movie {
  id: number;
  name: string;
  original_title: string;
  title: string;
  vote_count: string;
  vote_average: string;
  overview: string;
  popularity: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
