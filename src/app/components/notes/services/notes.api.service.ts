import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Note } from '../../../models/note';
import * as NotesActions from '../../../actions/note';
import * as fromRoot from '../../../reducers';
import * as fromNotes from '../../../reducers/notes';

@Injectable()
export class NotesApiService {

  constructor(private store: Store<fromRoot.State>) { }

  getNotes(): Observable<Note[]> {
    return this.store.select(fromNotes.getNotes);
  }

  getNote(id: number): Observable<any> {
    return this.store.select(fromNotes.getItemById(id));
  }

  addNote(newNote: Note) {
    return this.store.dispatch(new NotesActions.CreateNote(newNote));
  }

  updateNote(note: Note) {
    return this.store.dispatch(new NotesActions.UpdateNote(note));
  }

  deleteNote(note: Note) {
    this.store.dispatch(new NotesActions.DeleteNote(note));
  }

  changeNoteText(note: Note) {
    this.store.dispatch(new NotesActions.UpdateNoteText(note));
  }

  changeNotePosition(note: Note): void {
    this.store.dispatch(new NotesActions.UpdateNotePosition(note));
  }

  changeNoteSize(note: Note): void {
    this.store.dispatch(new NotesActions.UpdateNoteSize(note));
  }

}
