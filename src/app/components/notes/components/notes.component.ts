import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotesApiService } from '../services/notes.api.service';
import { NoteComponent } from './note.component/note.component';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../note';

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
    const newNote = new Note({text: '', colour: colour, left: Math.floor(Math.random() * 600), top: Math.floor(Math.random() * 400)});
    this.notesApiService.addNote(newNote);
  }

  onChangeNoteText(newText: string, note: Note) {
    note.text = newText;
    this.notesApiService.changeNoteText(newText, note);
  }

  onChangeNotePosition(newPosition: any, note: Note) {
    note.left = newPosition.left;
    note.top = newPosition.top;
    this.notesApiService.changeNotePosition(newPosition.left, newPosition.top, note);
  }

  onNoteDelete(id: number, note: Note) {
    this.notesApiService.deleteNote(note);
  }
}
