import { ChangeDetectionStrategy, Component, ElementRef, Input, viewChild, inject } from '@angular/core';
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
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from 'src/app/shared/dialog/dialog.enum';
import { BehaviorSubject } from 'rxjs';
import { SvgIconComponent } from 'src/app/components/shared/svg/svg.component';

@Component({
    selector: 'app-note-left-view',
    templateUrl: './note.left.view.component.html',
    styleUrls: ['./note.left.view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [FadeInOutNoteListItem],
    imports: [NoteListItemComponent, AsyncPipe, SvgIconComponent]
})
export class NoteLeftViewComponent {
    notesApiService = inject(NoteApiService);
    private dialogService = inject(DialogService);
    private noteStore = inject<Store<fromNotes.INotesState>>(Store);
    route = inject(Router);

    appNoteComponent = viewChild.required<NoteRightViewComponent>('appNote');
    searchInputRef = viewChild.required<ElementRef<HTMLInputElement>>('search');

    @Input() searchTerm$: BehaviorSubject<string>;
    @Input() notes: Note[];
    searchVisible: boolean = false;

    showSearch() {
        this.searchVisible = true;
        setTimeout(() => this.searchInputRef().nativeElement.focus(), 0);
    }

    onSearchInput(event: any) {
        const element = event.currentTarget as HTMLInputElement;
        const value = element.value;
        if (value.length) this.notesApiService.unselectNote();
        this.searchTerm$.next(value);
    }

    onSearchInputFocus(event: any) {
        this.onSearchInput(event);
    }

    clearSearch() {
        this.searchVisible = false;
        this.searchTerm$.next('');
    }

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
                DIALOG_TYPE.YES_NO,
                true,
                DIALOG_SIGNS.TRASH
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
        return this.noteStore.select(fromNotes.getIsNoteLoading);
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
