import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { NotesApiService } from '../services/notes.api.service';
import { NoteComponent } from './note.component/note.component';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
})
export class NotesComponent {

  $notes: Observable<Note[]>;

  constructor(private notesApiService: NotesApiService) {
    this.$notes = this.notesApiService.getNotes();
  }

  onAddNote(colour) {

    const newNote = new Note({
      text: '',
      colour: colour,
      width: 200,
      height: 150,
      left: Math.floor(Math.random() * 600),
      top: Math.floor(Math.random() * 400)
    });

    this.notesApiService.addNote(newNote);
  }

  onChangeNoteText(newText: any , note: Note) {
    console.log( newText );
    this.notesApiService.changeNoteText({...note,text: newText});
  }

  onChangeNotePosition( {top , left} , note: Note) {
    this.notesApiService.changeNotePosition({...note, left: left, top: top});
  }

  onChangeNoteSize( {height , width} , note: Note) {
    this.notesApiService.changeNoteSize({...note, width: width, height: height});
  }

  onNoteDelete(note: Note) {
    this.notesApiService.deleteNote(note);
  }
}
