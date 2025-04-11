import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNotes from '../../../store/reducers/note.reducer';
import { Router } from '@angular/router';
import { NoteApiService } from '../services/notes.api.service';
import { Note } from 'src/app/models/note';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { TooltipDirective } from '../../../fragments/components/tooltip/tooltip.directive';
import { AgoDatePipe } from '../../movies/directives/dateagopipe';
import { NoteTitleTruncatePipe } from '../../movies/directives/noteTitleTruncate';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from 'src/app/shared/dialog/dialog.enum';

@Component({
    selector: 'app-note.archive',
    templateUrl: './note.archive.component.html',
    styleUrl: './note.archive.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, TooltipDirective, AsyncPipe, DatePipe, AgoDatePipe, NoteTitleTruncatePipe],
    providers: [NoteApiService]
})
export class NoteArchiveComponent {
    get ArchivedNotes() {
        return this.store.select(fromNotes.getArchivedNotes);
    }

    constructor(
        private store: Store<fromNotes.INotesState>,
        // public activeDialog: NgbActiveModal,
        private notesApiService: NoteApiService,
        private dialogService: DialogService,
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

    delete(note: Note) {
        this.dialogService
            .openDialog(
                'Delete Note',
                'Are you sure you want to permanently delete this note?',
                DIALOG_TYPE.YES_NO,
                true,
                DIALOG_SIGNS.WARNING
            )
            .then((result: DIALOG_RESPONSE) => {
                if (result === DIALOG_RESPONSE.YES) {
                    this.notesApiService.deleteNote(note);
                }
            });
    }

    restore(note: Note) {
        this.notesApiService.restoreNote({ ...note, archived: false } as Note);
        // this.notesApiService.deleteNote(note);
    }
}
