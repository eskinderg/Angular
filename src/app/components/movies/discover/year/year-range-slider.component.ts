import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-year-range-slider',
    templateUrl: './year-range-slider.component.html',
    styleUrls: ['./year-range-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, CommonModule]
})
export class YearRangeSliderComponent {
    @Input() minYear = 1950;
    @Input() maxYear = new Date().getFullYear() + 1;

    @Output() rangeSelected = new EventEmitter<{ startDate: string; endDate: string }>();

    endYear = this.minYear;
    startYear = this.maxYear;

    onRangeChange() {
        // const startDate = this.formatDate(new Date(this.startYear, 0, 1)); // Jan 1 of Start Year
        // const startDate = this.formatDate(new Date(this.startYear, 11, 31)); // Jan 1 of Start Year
        const startDate = this.formatDate(new Date(this.startYear, 11, 31)); // Dec 31 of End Year
        const endDate = this.formatDate(new Date(this.endYear, 0, 1)); // Jan 1 of Start Year
        this.rangeSelected.emit({ startDate, endDate });
    }

    onRangeInput() {
        // Prevent overlap
        if (this.endYear > this.startYear) {
            [this.endYear, this.startYear] = [this.startYear, this.endYear];
        }
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
