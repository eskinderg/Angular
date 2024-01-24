import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotesApiService } from '../../services/notes.api.service';
import { Note } from '../../../../models/note';
import * as fromNotes from '../../../../reducers/notes.reducer';
import { FadeInOutNoteListItem } from '../../../shared/animations/fadeInAndOutNoteListItem';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteComponent } from './../note.component/note.component';
import { noteSelect } from 'src/app/actions';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  animations: [FadeInOutNoteListItem],
  styleUrl: './mynotes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MynotesComponent {

  @ViewChild(NoteComponent) appNoteComponent: NoteComponent;

  constructor(
    private notesApiService: NotesApiService,
    private store: Store<fromNotes.NotesState>,
    public route: Router,
    public r: ActivatedRoute
  ) { }

  selectNote(note: Note) {
    this.store.dispatch(noteSelect({ payload: note }))
  }

  onAddNote(_colour: string) {
    this.notesApiService.addNote(new Note());
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

  // onChangeNotePosition({ top, left }, note: Note) {
  //   this.notesApiService.changeNotePosition({ ...note, left: left, top: top });
  // }

  // onChangeNoteSize({ height, width }, note: Note) {
  //   this.notesApiService.changeNoteSize({ ...note, width: width, height: height });
  // }

  onChangeNoteText(_note: Note) {
    // alert(note.text)
    // this.notesApiService.changeNoteText({ ...note, text: newText });
  }

  get Notes() {
    return this.store.select(fromNotes.getNotes);
  }

  get Animate() {
    return this.store.select(fromNotes.getNotesAnimate);
  }

  get NotesCount() {
    return this.store.select(fromNotes.getNotesLength);
  }

  get SelectedNote() {
    return this.store.select(fromNotes.getSelectedNote);
  }

  get OpendNote() {
    return this.store.select(fromNotes.getOpendNote);
  }

}
