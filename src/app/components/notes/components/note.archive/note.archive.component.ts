import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNotes from '../../../../reducers/notes.reducer';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesApiService } from '../../services/notes.api.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-note.archive',
  templateUrl: './note.archive.component.html',
  styleUrl: './note.archive.component.scss'
})
export class NoteArchiveComponent {

  get ArchivedNotes() {
    return this.store.select(fromNotes.getArchivedNotes);
  }

  constructor(
    private store: Store<fromNotes.NotesState>,
    // public activeDialog: NgbActiveModal,
    private notesApiService: NotesApiService,
    public router: Router
  ) { }

  ngOnInit() {
    // this.note = history.state['note']
  }

  close() {
    // this.activeDialog.close();
  }

  no() {
    // this.activeDialog.close();
  }

  yes() {
    // this.notesApiService.deleteNote(this.note);
    // this.activeDialog.close('/notes');
  }

  restore(note: Note) {
    this.notesApiService.updateNote({ ...note, archived: false } as Note)
    // this.notesApiService.deleteNote(note);
  }

}
