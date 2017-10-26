import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Note } from '../note';
import { NotesActions } from  '../notes.actions';

@Injectable()
export class NotesApiService {

  constructor(private notesActions: NotesActions, private store: Store<Note>) {
    this.store.dispatch(this.notesActions.fetchNotes());
  }

  getNotes(): Observable<Note[]> {
    return this.store.select<Note[]>('notes');
  }

  addNote(newNote: Note) {
    return this.store.dispatch(this.notesActions.createNote(newNote));
  }

  deleteNote(note: Note) {
    this.store.dispatch(this.notesActions.deleteNote(note.id));
  }

  changeNoteText(text: string, note: Note) {
    this.store.dispatch(this.notesActions.updateNote(note.id, note));
  }

  changeNotePosition(left: number, top: number, note: Note): void {
    this.store.dispatch(this.notesActions.updateNote(note.id, note));
  }

}
