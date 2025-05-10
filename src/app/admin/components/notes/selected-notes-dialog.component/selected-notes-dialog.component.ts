import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
    selector: 'app-selected-notes-dialog',
    templateUrl: './selected-notes-dialog.component.html',
    styleUrls: ['./selected-notes-dialog.component.scss'],
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedNotesDialogComponent {
    @Input() selectedNotes: Note[] = [];
    @Output() closed = new EventEmitter<void>();
    @Output() bulkUpdate = new EventEmitter<void>();

    closeDialog() {
        this.closed.emit();
    }

    openBulkUpdateDialog() {
        this.bulkUpdate.emit();
    }
}
