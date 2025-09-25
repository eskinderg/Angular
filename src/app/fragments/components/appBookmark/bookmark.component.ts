import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrl: './bookmark.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent {
    @Input() saved = false;
    @Input() size: number = 40;
    @Output() savedChange = new EventEmitter<boolean>();

    toggle() {
        this.saved = !this.saved;
        this.savedChange.emit(this.saved);
    }
}
