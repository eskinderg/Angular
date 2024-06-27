import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-modal.component.html',
    styleUrl: './movie-modal.component.scss'
})
export class MovieModalComponent implements OnDestroy {
    @Input() public movieDetail: Movie;
    public movieRating: number;
    apiSubscription: Subscription;

    constructor(private host: ElementRef<HTMLElement>) {}

    close(event: any) {
        if (
            (event.srcElement as HTMLElement).id == 'backDrop' ||
            (event.srcElement as HTMLElement).id == 'footerClose' ||
            (event.srcElement as HTMLElement).id === 'modalClose'
        ) {
            this.host.nativeElement.remove();
        }
    }

    ngOnDestroy(): void {
        this.host.nativeElement.remove();
    }
}
