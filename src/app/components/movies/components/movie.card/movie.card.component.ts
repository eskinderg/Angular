import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
// import { NgbdRatingDecimal } from '../../components/rating/rating';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie.card.component.html',
    styleUrls: ['./movie.card.component.scss']
})
export class MovieCardComponent implements OnInit {
    @Input() movie: Movie;

    imageLoading: boolean = true;
    imageUrl: string = '';
    imageLoadingUrl: string = '';
    noImageUrl: string = '';
    alt: string = '';

    movieRating: number;
    linkUrl: string = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.imageUrl = this.movie.get_poster_path();
        this.imageLoadingUrl = '/assets/images/placeholder.gif';
        this.noImageUrl = '/assets/images/placeholder.png';

        this.linkUrl =
            '/movies/genres' +
            '/' +
            this.route.snapshot.paramMap.get('id') +
            '/' +
            this.route.snapshot.paramMap.get('name') +
            '/';

        this.movieRating = parseFloat(this.movie.vote_average);
        this.movieRating = (5 * this.movieRating) / 10;
    }

    onImageLoaded() {
        this.imageLoading = false;
    }

    handleEmptyImage() {
        this.imageLoading = false;
        this.imageUrl = this.noImageUrl;
    }
}
