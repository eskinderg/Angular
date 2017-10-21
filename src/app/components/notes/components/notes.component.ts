import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NotesService } from '../services/notes.service';
import { NoteComponent } from './note.component/note.component';
import { AddButtonComponent } from './add-button/add.button.component';
import { SlideAnimation } from '../../shared/animations/animations';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../note';

import { Store } from '@ngrx/store';
import { NotesActions } from  '../notes.actions';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {
  $notes;
  notesService: NotesService;

  constructor(
    notesService: NotesService,
    private notesActions: NotesActions,
    private route: ActivatedRoute,
    private store: Store<Note>) {
    this.notesService = notesService;
    //this.$notes = this.route.snapshot.data['notes'];
    //this.store.dispatch(this.notesActions.fetchNotes());
  }

  onAddNote(colour) {
    this.store.dispatch(
      this.notesActions.createNote(
        new Note({text: '', colour: colour, left: Math.floor(Math.random() * 600), top: Math.floor(Math.random() * 400)})
      ));
  }

  onChangeNoteText(newText: string, note: Note) {
    // this.notesService.changeNoteText(newText, note);
    note.text = newText;
    this.store.dispatch(this.notesActions.updateNote(note.id, note));
    //this.notesService.updateNote(note)
      //.subscribe(
        //(updatedNote) => {
          //note = updatedNote;
        //}
      //);
  }

  onChangeNotePosition(newPosition: any, note: Note) {
    note.left = newPosition.left;
    note.top = newPosition.top;
    this.store.dispatch(this.notesActions.updateNote(note.id, note));
  }

  onNoteDelete(id: number, note: Note) {
    this.store.dispatch(this.notesActions.deleteNote(note.id));
    //this.notesService.deleteNote(note)
    //.subscribe(
    //(_) => {
    //this.$notes = this.$notes.filter((n) => n.id !== note.id);
    //}
    //);
  }

  ngOnInit() {
    this.$notes = this.notesService.getNotes();
    //this.notesService.initialise();
  }

}
