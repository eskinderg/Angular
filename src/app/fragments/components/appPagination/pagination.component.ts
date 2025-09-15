import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class PaginationComponent implements OnChanges {
    @Input() page = 1;
    @Input() pageSize = 20;
    @Input() collectionSize = 0;
    @Input() maxSize = 10;
    @Output() pageChange = new EventEmitter<number>();

    pages: (number | string)[] = [];

    ngOnChanges(): void {
        this.buildPages();
    }

    private buildPages() {
        const totalPages = Math.ceil(this.collectionSize / this.pageSize);
        const pages: (number | string)[] = [];

        if (totalPages <= this.maxSize) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, this.page - Math.floor(this.maxSize / 2));
            let end = start + this.maxSize - 1;

            if (end > totalPages) {
                end = totalPages;
                start = end - this.maxSize + 1;
            }

            if (start > 1) {
                pages.push(1);
                if (start > 2) {
                    pages.push('…');
                }
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages) {
                if (end < totalPages - 1) {
                    pages.push('…');
                }
                pages.push(totalPages);
            }
        }

        this.pages = pages;
    }

    selectPage(p: number | string) {
        if (p === '…' || p === this.page) return;
        this.pageChange.emit(p as number);
    }

    prev() {
        if (this.page > 1) {
            this.pageChange.emit(this.page - 1);
        }
    }

    next() {
        const totalPages = Math.ceil(this.collectionSize / this.pageSize);
        if (this.page < totalPages) {
            this.pageChange.emit(this.page + 1);
        }
    }

    get totalPages(): number {
        return Math.max(1, Math.ceil(this.collectionSize / this.pageSize));
    }
}
