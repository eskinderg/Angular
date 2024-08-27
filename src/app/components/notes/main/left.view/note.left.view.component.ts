import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteApiService } from '../../services/notes.api.service';
import { Store } from '@ngrx/store';
import * as fromNotes from 'src/app/store/reducers/note.reducer';
import { Router } from '@angular/router';
import { NoteRightViewComponent } from '../right.view/note.right.view.component';
import { NoteDialogService } from '../../components/note-dialog/note.dialog.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-note-left-view',
    templateUrl: './note.left.view.component.html',
    styleUrls: ['./note.left.view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteLeftViewComponent {
    appNoteComponent = viewChild.required<NoteRightViewComponent>('appNote');

    constructor(
        public notesApiService: NoteApiService,
        private noteStore: Store<fromNotes.INotesState>,
        private noteDialogService: NoteDialogService,
        public route: Router
    ) {}

    onChangeNoteText(note: Note) {
        this.notesApiService.updateNoteText(note);
    }

    selectionChange(note: Note) {
        this.notesApiService.updateNoteSelection(note);
    }

    selectNote(note: Note) {
        this.notesApiService.selectNote(note);
    }

    toggleSpellCheck(note: Note) {
        this.notesApiService.toggleSpellCheck(note);
        this.appNoteComponent().textAreaExpandedComponent().textAreaElementRef().nativeElement.focus();
    }

    createNewNote() {
        this.notesApiService.createNewNote({ ...new Note(), id: uuidv4() });
    }

    updatePinOrder(note: Note) {
        this.notesApiService.updateNotePinOrder(note);
    }

    updateNoteColour(note: Note) {
        this.notesApiService.updateNoteColour(note);
    }

    onArchiveNote(note: Note) {
        // this.notesApiService.archiveNote(note);
        this.noteDialogService.showDialog(note);
    }

    onUpdateNoteHeader(note: Note) {
        this.notesApiService.updateNoteHeader(note);
    }

    routeToArchivedNotes() {
        this.route.navigateByUrl('notes/archived');
    }

    get Notes() {
        return this.notesApiService.Notes;
    }

    get Animate() {
        return this.notesApiService.NoteAnimateState;
    }

    get NoteLoading() {
        return this.noteStore.select(fromNotes.getIsLoading);
    }

    get NotesCount() {
        return this.notesApiService.NotesLength;
    }

    get SelectedNote() {
        return this.notesApiService.SelectedNote;
    }

    get OpendNote() {
        return this.notesApiService.OpendNote;
    }
}
