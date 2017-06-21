import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotesService } from '../services/notes.service'
import { NoteComponent } from './note.component/note.component';
import { AddButtonComponent } from './add-button/add.button.component';
import { SlideAnimation }   from '../../shared/animations';
import { Note } from '../note';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [ SlideAnimation ],
  host: { '[@routerAnimation]': '' }
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {
  $notes: Note[]
  notesService: NotesService;

  constructor(notesService: NotesService) {
    this.notesService = notesService;

    this.notesService
    .getNotes()
    .subscribe(
      (notes)=>{
        this.$notes =notes;
      }
    );

  }

  onAddNote(colour){
    this.notesService
    .addNote("", colour, 200, 100)
    .subscribe(
      (newNote) => {
        this.$notes = this.$notes.concat(newNote);
      });
  }

  onChangeNoteText(newText: string, note: Note){
    // this.notesService.changeNoteText(newText, note);
    note.text = newText;
    this.notesService.updateNote(note)
    .subscribe(
        (updatedNote) => {
          note = updatedNote;
        }
    );
  }

  onChangeNotePosition(newPosition: any, note: Note){
    // this.notesService.changeNotePosition(newPosition.left, newPosition.top, note);
    console.log(newPosition);
    note.left = newPosition.left;
    note.top = newPosition.top;
    // console.log(newPosition);
    this.notesService.updateNote(note)
    .subscribe(
        (updatedNote) => {
          note = updatedNote;
        }
    );
  }

  ngOnInit() {
    this.notesService.initialise();
  }

}
