import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-watched',
    templateUrl: './watched.component.html',
    styleUrl: './watched.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchedComponent {
    @Input() watched = false;
    @Input() size: number = 40;
    @Output() watchedChange = new EventEmitter<boolean>();

    toggle() {
        this.watched = !this.watched;
        this.watchedChange.emit(this.watched);
    }
}
