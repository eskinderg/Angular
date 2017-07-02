import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import { Store } from '@ngrx/store';
import 'rxjs/add/operator/mergeMap';
import { Note } from '../note';
import { NotesDataService } from './notes.data.service';

// import 'node-uuid';
// declare let uuid; //this is a hack stop Typescript compilation problems when addressing the globally available uuid interface

@Injectable()
export class NotesService {
    store: NotesDataService;

    constructor(store: NotesDataService) {
        this.store = store;
    }

    getNotes(): Observable<Note[]> {
      return this.store.getNotes(); // select<Note[]>('notes');
    }

    addNote(text: string, colour: string, left: number, top: number): Observable<Note> {
      // this.store.addOrUpdateNote(new Note({text:text,colour:colour}));
      // this.store.addOrUpdateNote({ type: "ADD_NOTE", payload: {text, colour, left, top, id:uuid.v1()} });
      // dispatch({ type: "ADD_NOTE", payload: {text, colour, left, top, id:uuid.v1()} });
      console.log('added new note of color ' + colour );

      return this.store.addNote(new Note({text: text, colour: colour, left: left, top: top}));
    }

    deleteNote(note: Note): Observable<Note> {
      return this.store.deleteNote(note);
    }

    changeNoteText(text: string, note: Note): Observable<Note>{

      console.log('changeNoteText');
      // this.store.dispatch({type: "UPDATE_NOTE_TEXT", payload: {id: note.id, text: text}})

      return this.store.addOrUpdateNote(note);
    }
    changeNotePosition(left: number, top: number, note: Note): void {
      // this.store.dispatch({type: "UPDATE_NOTE_POSITION", payload: {id: note.id, left: left, top: top}})
    }

    updateNote(note: Note): Observable<Note> {
      return this.store.updateNote(note);
    }

    initialise(): void {
        // this.store.dispatch({ type: "INIT_NOTES", payload: { } });
    }

}
