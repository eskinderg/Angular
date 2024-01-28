import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NoteApiService } from '../services/notes.api.service';
import { Note } from '../../../models/note';
import { FadeInOutNoteListItem } from '../../shared/animations/fadeInAndOutNoteListItem';
import { Router } from '@angular/router';
import { NoteComponent } from './note.component/note.component';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [FadeInOutNoteListItem],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {

  @ViewChild(NoteComponent) appNoteComponent: NoteComponent;

  constructor(public notesApiService: NoteApiService, public route: Router) { }

  onChangeNoteText(note: Note) {
    this.notesApiService.updateNoteText(note);
  }

  selectNote(note: Note) {
    this.notesApiService.selectNote(note);
  }

  createNewNote(_colour: string) {
    this.notesApiService.createNewNote(new Note());
  }

  updatePinOrder(note: Note) {
    this.notesApiService.updateNotePinOrder(note);
  }

  onArchiveNote(note: Note) {
    this.notesApiService.archiveNote(note);
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
