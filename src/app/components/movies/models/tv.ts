export class Tv {
    id: number | undefined;
    name: string | undefined;
    original_name: string | undefined;
    title: string | undefined;
    vote_count: string | undefined;
    vote_average: string | undefined;
    overview: string | undefined;
    popularity: string | undefined;
    backdrop_path: string | undefined;
    poster_path: string | undefined;
    first_air_date: string | undefined;
    origin_country: any;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
