import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    Input,
    viewChild
} from '@angular/core';

@Component({
    selector: 'app-circular-rating',
    templateUrl: './circular.component.html',
    styleUrls: ['./circular.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class CircularRatingComponent implements AfterViewInit {
    @Input() voteAverage = 0;
    @Input() size: number = 50;
    @Input() animate = false;
    @Input() duration = 1000; // ms
    displayedValue = 0;

    private cdr = inject(ChangeDetectorRef);
    circleEl = viewChild.required<ElementRef<HTMLDivElement>>('circle');

    ngAfterViewInit(): void {
        const circle = this.circleEl().nativeElement;
        const target = Math.round(this.voteAverage * 10); // percentage (0–100)

        if (!this.animate) {
            this.displayedValue = target;
            circle.style.setProperty('--progress', target.toString());
            this.cdr.markForCheck();
            return;
        }

        const start = performance.now();
        const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / this.duration, 1);
            const current = Math.round(progress * target);

            this.displayedValue = current;
            circle.style.setProperty('--progress', current.toString());
            this.cdr.markForCheck();

            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }
}
