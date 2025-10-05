import {
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
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../directives/truncate';
import { MovieDialogService } from '../../service/movie.dialog.service';
import { MoviesApiService } from '../../service/movies.api.service';
import { CircularRatingComponent } from 'src/app/fragments/components/circularRating/circular.component';
import { BookmarkComponent } from 'src/app/fragments/components/appBookmark/bookmark.component';
import { hrefLink, torLink } from '../../functions/link';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-dialog.component.html',
    styleUrl: './movie-dialog.component.scss',
    animations: [DialogAnimations.modal],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CircularRatingComponent, BookmarkComponent, AsyncPipe, UpperCasePipe, TruncatePipe]
})
export class MovieDialogComponent implements OnInit, OnDestroy {
    private host = inject<ElementRef<HTMLElement>>(ElementRef);
    private renderer = inject(Renderer2);
    private cdr = inject(ChangeDetectorRef);
    private modalDialogService = inject(MovieDialogService);
    private movieApiService = inject(MoviesApiService);

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

    private unlistenEsc?: () => void;

    ngOnInit(): void {
        this.unlistenEsc = this.renderer.listen('document', 'keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.code === 'Escape') {
                e.preventDefault();
                this.requestClose('esc');
            }
        });

        this.imageUrl = this.movieDetail.get_poster_path_w780();
        this.movieRating = this.movieDetail.vote_average;
        this.movieRating = (5 * this.movieRating) / 10;
    }

    private requestClose(_reason: 'click' | 'esc') {
        const backDropEl = this.host.nativeElement.querySelector('#backDrop') as HTMLElement;

        // Trigger fade-out (your SCSS already has the transition)
        backDropEl.classList.add('closing');
        backDropEl.querySelector('#scrollWrapper').classList.add('closing');

        let done = false;
        const cleanup = () => {
            if (done) return;
            done = true;
            this.modalDialogService.destroy();
        };

        const onEnd = (e: TransitionEvent) => {
            // Only when the backdrop’s own opacity finishes
            if (e.currentTarget === backDropEl && e.propertyName === 'opacity') {
                backDropEl.removeEventListener('transitionend', onEnd);
                cleanup();
            }
        };

        backDropEl.addEventListener('transitionend', onEnd);
        // Fallback in case the browser skips transitionend
        setTimeout(cleanup, 400); // slightly > 0.3s in your CSS
    }

    onBackdropOrButtonClick(event: MouseEvent) {
        const id = (event.target as HTMLElement).id;
        if (id === 'backDrop' || id === 'footerClose' || id === 'modalClose') {
            this.requestClose('click');
        }
    }

    onBookmarkToggled(event: any) {
        if (event) this.movieApiService.addWatchList(this.movieDetail);
        else this.movieApiService.removeWatchList(this.movieDetail);
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

    get WatchLink(): string {
        return hrefLink(this.movieDetail);
    }

    get TorLink(): string {
        return torLink(this.movieDetail);
    }

    get isInWatchList() {
        return this.movieApiService.isInWatchList(this.movieDetail);
    }

    ngOnDestroy(): void {
        this.unlistenEsc?.();
    }
}
