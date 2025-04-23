import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    ViewContainerRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from 'src/app/models/note';
import { DialogService } from '../dialog.service';
import { TextareaExpandedComponent } from 'src/app/components/notes/main/right.view/textAreaExpanded/textAreaExpanded.component';
import { TextSelection } from 'src/app/components/notes/main/right.view/textAreaExpanded/text.selection';
import { NoteColourSelectorComponent } from 'src/app/components/notes/main/right.view/note.colour.selector/note.colour.selector.component';
import { AsyncPipe } from '@angular/common';
import { AdminNoteApiService } from 'src/app/admin/admin.notes.api.service';

@Component({
    selector: 'app-edit-note-dialog',
    standalone: true,
    imports: [
        AsyncPipe,
        NoteColourSelectorComponent,
        CommonModule,
        ReactiveFormsModule,
        TextareaExpandedComponent
    ],
    providers: [TextSelection],
    templateUrl: './edit-note-dialog.component.html',
    styleUrls: ['./edit-note-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNoteDialogComponent implements OnInit {
    @Input() note!: Note;
    @Output() closed = new EventEmitter<void>();
    @Output() saved = new EventEmitter<Note>();
    form!: FormGroup;
    dirty = false;

    constructor(
        private adminNoteApiService: AdminNoteApiService,
        private dialogService: DialogService,
        private vcRef: ViewContainerRef,
        private fb: FormBuilder
    ) {
        this.dialogService.registerHost(this.vcRef);
    }

    get Owners() {
        return this.adminNoteApiService.Users;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            header: [this.note.header],
            owner: [this.note.owner],
            userId: [this.note.userId],
            text: [this.note.text],
            colour: [this.note.colour],
            pinned: [this.note.pinned],
            active: [this.note.active],
            archived: [this.note.archived],
            spellCheck: [this.note.spellCheck]
        });

        this.form.valueChanges.subscribe(() => {
            this.dirty = true;
        });
    }

    onOwnerChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedUserId = selectElement.value;

        // Find the corresponding owner name based on the selected userId
        this.Owners.subscribe((users) => {
            const selectedUser = users?.find((user) => user[1] === selectedUserId);
            if (selectedUser) {
                this.form.get('owner')?.setValue(selectedUser[0]); // Update the owner field
            }
        });
    }

    onSave() {
        if (this.form.valid) {
            const updatedNote: Note = {
                ...this.note,
                ...this.form.value
            };
            this.dirty = false;
            this.saved.emit(updatedNote);
        }
    }

    onClose() {
        if (this.dirty) {
            this.dialogService
                .openConfirm('There are unsaved changes. Are you sure you want to close?')
                .then((confirm) => {
                    if (confirm) {
                        this.closed.emit();
                    }
                });
        } else {
            this.closed.emit();
        }
    }

    formatDate(date: Date): string {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        const value = new Date(date);

        return formatter.format(value);
    }
}
