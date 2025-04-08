import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteApiService } from '../../services/notes.api.service';
import { Store } from '@ngrx/store';
import * as fromNotes from 'src/app/store/reducers/note.reducer';
import { Router } from '@angular/router';
import { NoteRightViewComponent } from '../right.view/note.right.view.component';
import { v4 as uuidv4 } from 'uuid';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { AsyncPipe } from '@angular/common';
import { FadeInOutNoteListItem } from 'src/app/components/shared/animations/fadeInAndOutNoteListItem';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DIALOG_BUTTONS } from 'src/app/shared/dialog/buttons.enum';
import { DIALOG_RESPONSE } from 'src/app/shared/dialog/result.enum';

@Component({
    selector: 'app-note-left-view',
    templateUrl: './note.left.view.component.html',
    styleUrls: ['./note.left.view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [FadeInOutNoteListItem],
    imports: [NoteListItemComponent, AsyncPipe]
})
export class NoteLeftViewComponent {
    appNoteComponent = viewChild.required<NoteRightViewComponent>('appNote');

    constructor(
        public notesApiService: NoteApiService,
        private dialogService: DialogService,
        private noteStore: Store<fromNotes.INotesState>,
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
        this.dialogService
            .openDialog(
                'Archive Note',
                'Do you want to archive this note?',
                DIALOG_BUTTONS.YES_NO,
                true,
                null
            )
            .then((result) => {
                if (result === DIALOG_RESPONSE.YES) {
                    this.notesApiService.archiveNote(note);
                }
            });
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
