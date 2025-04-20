import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="dialog-backdrop" (click)="onBackdropClick()">
            <div class="dialog-box" (click)="$event.stopPropagation()">
                <div class="dialog-header">
                    <div>Confirm</div>
                    <div class="close-btn" (click)="respond(false)">✕</div>
                </div>

                <div class="dialog-body">
                    <p>{{ message }}</p>
                </div>
                <div class="dialog-actions">
                    <button (click)="respond(false)">No</button>
                    <button class="btn-yes" (click)="respond(true)">Yes</button>
                </div>
            </div>
        </div>
    `,
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
