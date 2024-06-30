import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
    selector: 'app-note-header-control',
    templateUrl: './note.header.control.component.html',
    styleUrl: './note.header.control.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteHeaderControlComponent {
    @Input() note: Note;
    @Output() noteUpdateNoteHeader: EventEmitter<Note> = new EventEmitter<Note>();

    constructor() {}

    updateNoteHeader(event: Event) {
        const headerText: string = (event.target as HTMLInputElement).value;
        this.noteUpdateNoteHeader.emit({ ...this.note, header: headerText } as Note);
    }
}
