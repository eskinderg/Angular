import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNotes from '../../../../store/reducers/note.reducer';
import { Router } from '@angular/router';
import { NoteApiService } from '../../services/notes.api.service';
import { Note } from 'src/app/models/note';

@Component({
    selector: 'app-note.archive',
    templateUrl: './note.archive.component.html',
    styleUrl: './note.archive.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteArchiveComponent {
    get ArchivedNotes() {
        return this.store.select(fromNotes.getArchivedNotes);
    }

    constructor(
        private store: Store<fromNotes.INotesState>,
        // public activeDialog: NgbActiveModal,
        private notesApiService: NoteApiService,
        public router: Router
    ) {}

    // ngOnInit() {
    // this.note = history.state['note']
    // }

    close() {
        // this.activeDialog.close();
    }

    no() {
        // this.activeDialog.close();
    }

    yes() {
        // this.notesApiService.deleteNote(this.note);
        // this.activeDialog.close('/notes');
    }

    restore(note: Note) {
        this.notesApiService.restoreNote({ ...note, archived: false } as Note);
        // this.notesApiService.deleteNote(note);
    }
}
