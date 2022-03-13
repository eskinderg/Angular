export class Movie {
  id: number | undefined;
  name: string | undefined;
  original_title: string | undefined;
  title: string | undefined;
  vote_count: string | undefined;
  vote_average: string | undefined;
  overview: string | undefined;
  popularity: string | undefined;
  backdrop_path: string | undefined;
  poster_path: string | undefined;
  release_date: string | undefined;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
