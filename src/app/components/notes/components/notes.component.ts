import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NotesService } from '../services/notes.service';
import { NoteComponent } from './note.component/note.component';
import { AddButtonComponent } from './add-button/add.button.component';
import { SlideAnimation } from '../../shared/animations/animations';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../note';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {
  $notes: Note[];
  notesService: NotesService;

  constructor(notesService: NotesService, private route: ActivatedRoute) {
    this.notesService = notesService;
    this.$notes = this.route.snapshot.data['notes'];
  }

  onAddNote(colour) {
    this.notesService
    .addNote('', colour, Math.floor(Math.random() * 600), Math.floor(Math.random() * 400))
    .subscribe(
      (newNote) => {
        this.$notes = this.$notes.concat(newNote);
      });
  }

  onChangeNoteText(newText: string, note: Note) {
    // this.notesService.changeNoteText(newText, note);
    note.text = newText;
    this.notesService.updateNote(note)
    .subscribe(
        (updatedNote) => {
          note = updatedNote;
        }
    );
  }

  onChangeNotePosition(newPosition: any, note: Note) {
    // this.notesService.changeNotePosition(newPosition.left, newPosition.top, note);
    // console.log(newPosition);
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

  onNoteDelete(id: any, note: Note) {
    this.notesService.deleteNote(note)
    .subscribe(
        (_) => {
          this.$notes = this.$notes.filter((n) => n.id !== note.id);
        }
    );
  }

  ngOnInit() {
    this.notesService.initialise();
  }

}
