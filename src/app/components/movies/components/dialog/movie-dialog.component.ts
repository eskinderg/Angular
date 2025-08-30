import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    inject
} from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';
import { DialogAnimations } from './animation';
import { RatingDecimalComponent } from '../rating/rating';
import { UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../directives/truncate';
//
// [style.backgroundImage]="isLoaded ? movieDetail.get_back_drop_image_url() : null"
// [style.backgroundColor]="movieDetail.get_back_drop_image_url() ?? 'var(--body-bg)'"
//         [src]="movieDetail.get_back_drop_image()"
//
@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-dialog.component.html',
    styleUrl: './movie-dialog.component.scss',
    animations: [DialogAnimations.modal],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RatingDecimalComponent, UpperCasePipe, TruncatePipe]
})
export class MovieDialogComponent implements OnInit, AfterViewInit, OnDestroy {
    private host = inject<ElementRef<HTMLElement>>(ElementRef);
    private renderer = inject(Renderer2);
    private cdr = inject(ChangeDetectorRef);

    public movieDetail: Movie;
    public movieRating: number;

    @Output() backdropImageLoaded = new EventEmitter<void>();
    @Output() posterImageLoaded = new EventEmitter<void>();

    isBackDropImageLoaded: boolean = false;
    isPosterImageLoaded: boolean = false;

    imageUrl: string = '';
    apiSubscription: Subscription;
    imageLoadingUrl: string = '/assets/images/placeholder.gif';
    noImageUrl: string = '/assets/images/placeholder.png';

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

    onPosterImageLoaded() {
        this.posterImageLoaded.emit();
    }

    handleBackdropEmptyImage() {
        this.backdropImageLoaded.emit();
    }

    onBackDropImageLoaded() {
        this.backdropImageLoaded.emit();
    }

    handleEmptyImage() {
        this.imageUrl = this.noImageUrl;
        this.posterImageLoaded.emit();
    }

    renderChanges() {
        this.cdr.markForCheck();
    }

    ngOnDestroy(): void {
        this.host.nativeElement.remove();
    }
}
