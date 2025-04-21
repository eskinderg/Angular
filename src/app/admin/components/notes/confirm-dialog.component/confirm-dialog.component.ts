import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
    @Input() message = 'Are you sure?';
    @Output() confirmed = new EventEmitter<boolean>();

    respond(value: boolean) {
        this.confirmed.emit(value);
    }

    onBackdropClick() {
        this.confirmed.emit(false);
    }
}
