import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bulk-update-dialog',
    templateUrl: './bulk-update-dialog.component.html',
    styleUrls: ['./bulk-update-dialog.component.scss'],
    imports: [FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkUpdateDialogComponent {
    @Input() users: [string, string, number][] = []; // List of users as [owner, userId, count]
    @Output() closed = new EventEmitter<void>();
    @Output() updated = new EventEmitter<{ owner: string; userId: string; active: boolean }>();

    selectedOwner: string = '';
    selectedUserId: string = '';
    isActive: boolean | null = null;

    // Update the selected userId when the owner changes
    onOwnerChange(owner: string) {
        const user = this.users.find((u) => u[0] === owner);
        if (user) {
            this.selectedUserId = user[1]; // Update userId based on the selected owner
        }
    }

    closeDialog() {
        this.closed.emit();
    }

    applyChanges() {
        this.updated.emit({
            owner: this.selectedOwner,
            userId: this.selectedUserId,
            active: this.isActive
        });
    }
}
