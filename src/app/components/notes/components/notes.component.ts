import { Component, ChangeDetectionStrategy, ViewChild, HostListener, ElementRef } from '@angular/core';
import { NoteApiService } from '../services/notes.api.service';
import { Note } from '../../../models/note';
import { FadeInOutNoteListItem } from '../../shared/animations/fadeInAndOutNoteListItem';
import { Router } from '@angular/router';
import { NoteComponent } from './note.component/note.component';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss', 'notes.colour.scss'],
  animations: [FadeInOutNoteListItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {

  @ViewChild(NoteComponent) appNoteComponent: NoteComponent;

  constructor(public notesApiService: NoteApiService, public route: Router) { }

  onChangeNoteText(note: Note) {
    this.notesApiService.updateNoteText(note);
  }

  saveSelection() {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.getSelection && document.getSelection().getRangeAt(0)) {
      return null
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

  createNewNote(_colour: string) {
    this.notesApiService.createNewNote(new Note());
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
