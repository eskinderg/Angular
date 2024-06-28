import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-modal.component.html',
    styleUrl: './movie-modal.component.scss'
})
export class MovieModalComponent implements OnInit, OnDestroy {
    public movieDetail: Movie;
    public movieRating: number;

    imageLoading: boolean = true;
    imageUrl: string = '';
    imageLoadingUrl: string = '';
    noImageUrl: string = '';
    apiSubscription: Subscription;

    constructor(
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.renderer.listen(this.host.nativeElement, 'keydown.esc', (event) => {
            this.close(event);
        });

        this.movieRating = parseFloat(this.movieDetail.vote_average);
        this.movieRating = (5 * this.movieRating) / 10;
        this.imageUrl = this.movieDetail.get_poster_path_w780();
        this.imageLoadingUrl = '/assets/images/placeholder.gif';
        this.noImageUrl = '/assets/images/placeholder.png';
    }

    close(event: any) {
        if (
            (event.srcElement as HTMLElement).id === 'backDrop' ||
            (event.srcElement as HTMLElement).id === 'footerClose' ||
            (event.srcElement as HTMLElement).id === 'modalClose'
        ) {
            this.host.nativeElement.remove();
        }
    }

    onImageLoaded() {
        this.imageLoading = false;
    }

    handleEmptyImage() {
        this.imageLoading = false;
        this.imageUrl = this.noImageUrl;
    }

    ngOnDestroy(): void {
        this.host.nativeElement.remove();
    }
}
