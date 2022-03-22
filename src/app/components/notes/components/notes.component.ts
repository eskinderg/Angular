import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NotesApiService } from '../services/notes.api.service';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../../../models/note';
import * as fromNotes from '../../../reducers/notes';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@routerFadeInAnimation]': '' }
})
export class NotesComponent {

  constructor(private notesApiService: NotesApiService, private store: Store<fromNotes.State>) {
    this.store.dispatch({ type: 'FETCH_NOTES' })
  }

  onAddNote(colour) {
    alert(colour)

    const newNote = new Note({
      header: 'Untitled',
      text: '',
      colour: colour,
      width: 200,
      height: 150,
      left: Math.floor(Math.random() * 600),
      top: Math.floor(Math.random() * 400)
    });

    this.notesApiService.addNote(newNote);
  }

  onChangeNoteText(newText: any, note: Note) {
    // console.log( newText );
    this.notesApiService.changeNoteText({ ...note, text: newText });
  }

  onChangeNotePosition({ top, left }, note: Note) {
    this.notesApiService.changeNotePosition({ ...note, left: left, top: top });
  }

  onChangeNoteSize({ height, width }, note: Note) {
    this.notesApiService.changeNoteSize({ ...note, width: width, height: height });
  }

  onNoteDelete(note: Note) {
    // this.notesApiService.deleteNote(note);
    alert(note.text);
  }

  get Notes() {
    return this.store.select(fromNotes.getNotes);
  }
}
