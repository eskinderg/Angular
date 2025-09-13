import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    Input,
    OnInit,
    viewChild
} from '@angular/core';

@Component({
    selector: 'app-circular-rating',
    templateUrl: './circular.component.html',
    styleUrls: ['./circular.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class CircularRatingComponent implements AfterViewInit, OnInit {
    @Input() voteAverage = 0;
    @Input() voteCount = 0;
    @Input() size: number = 50;
    @Input() animate = false;
    @Input() duration = 1000; // ms
    displayedValue = 0;

    private cdr = inject(ChangeDetectorRef);
    circleEl = viewChild.required<ElementRef<HTMLDivElement>>('circle');

    ngOnInit(): void {
        const circleHTMLElement = this.circleEl().nativeElement;
        const percentage = Math.round(this.voteAverage * 10); // percentage (0–100)

        if (!this.animate) {
            // if no animation set then set initial value to display
            this.displayedValue = percentage;
            circleHTMLElement.style.setProperty('--progress', percentage.toString());
        }
    }

    ngAfterViewInit(): void {
        const circleHTMLElement = this.circleEl().nativeElement;
        const target = Math.round(this.voteAverage * 10); // percentage (0–100)

        if (!this.animate) return; // if no animation set then skip

        const start = performance.now();
        const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / this.duration, 1);
            const current = Math.round(progress * target);

            this.displayedValue = current;
            circleHTMLElement.style.setProperty('--progress', current.toString());
            this.cdr.markForCheck();

            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }
}
