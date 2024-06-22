import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NoteApiService } from '../services/notes.api.service';
import { Note } from '../../../models/note';
import { FadeInOutNoteListItem } from '../../shared/animations/fadeInAndOutNoteListItem';
import { Router } from '@angular/router';
import { NoteComponent } from './note.component/note.component';
import { Store } from '@ngrx/store';
import * as fromNotes from 'src/app/store/reducers/note.reducer';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss', 'notes.colour.scss'],
  animations: [FadeInOutNoteListItem],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {
  @ViewChild(NoteComponent) appNoteComponent: NoteComponent;

  constructor(
    private oauthService: OAuthService,
    public notesApiService: NoteApiService,
    private noteStore: Store<fromNotes.INotesState>,
    public route: Router
  ) {}

  onChangeNoteText(note: Note) {
    this.notesApiService.updateNoteText(note);
  }

  saveSelection() {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.getSelection && document.getSelection().getRangeAt(0)) {
      return null;
    }
    return null;
  }

  selection: Range;
  x: number;
  y: number;

  selectionChange(note: Note) {
    this.notesApiService.updateNoteSelection(note);
  }

  selectNote(note: Note) {
    this.notesApiService.selectNote(note);
  }

  toggleSpellCheck(note: Note) {
    this.notesApiService.toggleSpellCheck(note);
    this.appNoteComponent.textarea.textarea.nativeElement.focus();
  }

  createNewNote() {
    this.notesApiService.createNewNote(
      new Note({ owner: this.oauthService.getIdentityClaims()['given_name'] })
    );
  }

  updatePinOrder(note: Note) {
    this.notesApiService.updateNotePinOrder(note);
  }

  updateNoteColour(note: Note) {
    this.notesApiService.updateNoteColour(note);
  }

  onArchiveNote(note: Note) {
    this.notesApiService.archiveNote(note);
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
