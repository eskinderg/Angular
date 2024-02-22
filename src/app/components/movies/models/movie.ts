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
  genres: string[];
  homepage: string;
  runtime: number;
  status: string;
  original_language: string;
  spoken_languages: string[];
  casts: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  get_poster_path() {
    if (this.poster_path !== null) return 'https://image.tmdb.org/t/p/w300/' + this.poster_path;
    else return null;
  }

  get_poster_path_w500() {
    if (this.poster_path !== null) return 'https://image.tmdb.org/t/p/w500/' + this.poster_path;
    else return null;
  }

  get_poster_path_w780() {
    if (this.poster_path !== null) return 'https://image.tmdb.org/t/p/w780/' + this.poster_path;
    else return null;
  }
}
