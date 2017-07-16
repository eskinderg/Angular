export class Tv {
  id: number;
  name: string;
  original_name: string;
  title: string;
  vote_count: string;
  vote_average: string;
  overview: string;
  popularity: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  origin_country: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
