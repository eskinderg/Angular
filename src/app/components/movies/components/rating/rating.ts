import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-ngbd-rating-decimal',
    templateUrl: './rating-decimal.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            .star {
                position: relative;
                display: inline-block;
                // font-size: 1rem;
                color: #d3d3d3;
            }
            .full {
                color: red;
            }
            .half {
                position: absolute;
                display: inline-block;
                overflow: hidden;
                color: red;
            }
        `
    ]
})
export class RatingDecimalComponent {
    @Input()
    rating: string;

    @Input()
    currentRate: number;

    @Input()
    size: number = 3;
}
