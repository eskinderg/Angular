import { Movie } from '../models/movie';

export function hrefLink(movie: Movie): string {
    return `https://theflixertv.to/search/${movie.title.replace(/ /g, '-')}`;
}
