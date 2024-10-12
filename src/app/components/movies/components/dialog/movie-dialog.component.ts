import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';
import { FadeInOut } from './animation';
import { RatingDecimalComponent } from '../rating/rating';
import { UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../directives/truncate';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-dialog.component.html',
    styleUrl: './movie-dialog.component.scss',
    animations: [FadeInOut(1000, 1000, true)],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RatingDecimalComponent, UpperCasePipe, TruncatePipe]
})
export class MovieDialogComponent implements OnInit, AfterViewInit, OnDestroy {
    public movieDetail: Movie;
    public movieRating: number;

    imageLoading: boolean = true;
    imageUrl: string = '';
    apiSubscription: Subscription;
    imageLoadingUrl: string = '/assets/images/placeholder.gif';
    noImageUrl: string = '/assets/images/placeholder.png';

    constructor(
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        (this.host.nativeElement.firstElementChild as HTMLElement).focus();
    }

    ngOnInit(): void {
        this.renderer.listen(this.host.nativeElement, 'keydown.esc', (event) => {
            this.close(event);
        });

        this.imageUrl = this.movieDetail.get_poster_path_w780();
        this.movieRating = parseFloat(this.movieDetail.vote_average);
        this.movieRating = (5 * this.movieRating) / 10;
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
