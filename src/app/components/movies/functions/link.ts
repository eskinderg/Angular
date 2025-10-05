import { Movie } from '../models/movie';

export function hrefLink(movie: Movie): string {
    return `https://theflixertv.to/search/${movie.title.replace(/ /g, '-')}`;
}

export function torLink(movie: Movie): string {
    return `https://ext.to/browse/?cat=1&q=${movie.title.replace(/ /g, '+')}&with_adult=1`;
}
