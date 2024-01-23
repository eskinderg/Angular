import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Note } from '../../../models/note';
import * as NotesActions from '../../../actions/note.action';
import * as fromRoot from '../../../reducers';
import * as fromNotes from '../../../reducers/notes.reducer';

@Injectable()
export class NotesApiService {

  constructor(private store: Store<fromRoot.IAppState>) { }

  getNotes(): Observable<Note[]> {
    return this.store.select(fromNotes.getNotes);
  }

  getNote(id: number): Observable<any> {
    return this.store.select(fromNotes.getNoteById(id));
  }

  addNote(newNote: Note) {
    return this.store.dispatch(NotesActions.createNote({ payload: newNote }));
  }

  updateNote(note: Note) {
    return this.store.dispatch(NotesActions.updateNote({ payload: note }));
  }

  updateNoteText(note: Note) {
    return this.store.dispatch(NotesActions.updateNoteText({ payload: note }));
  }

  deleteNote(note: Note) {
    this.store.dispatch(NotesActions.deleteNote({
      payload: { ...note, archived: true }
    }));
  }

  changeNoteText(note: Note) {
    this.store.dispatch(NotesActions.updateNoteText({ payload: note }));
  }

  updateNotePinOrder(note: Note) {
    if (note.pinOrder)
      this.store.dispatch(NotesActions.updatePinOrder({ payload: { ...note, pinOrder: null } }));
    else
      this.store.dispatch(NotesActions.updatePinOrder({ payload: { ...note, pinOrder: new Date() } }));
  }

  changeNotePosition(note: Note): void {
    this.store.dispatch(NotesActions.updateNotePosition({ payload: note }));
  }

  changeNoteSize(note: Note): void {
    this.store.dispatch(NotesActions.updateNoteSize({ payload: note }));
  }

}
