import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Note } from 'src/app/models/note';
import { NotesApiService } from '../../services/notes.api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-detail-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss'
})
export class NoteDetailDialogComponent implements OnInit {

  note: Note;

  constructor(
    public activeDialog: NgbActiveModal,
    private notesApiService: NotesApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.note = history.state['note']
  }

  close() {
    this.activeDialog.close();
  }

  no() {
    this.activeDialog.close();
  }

  yes() {
    this.notesApiService.deleteNote(this.note);
    // this.activeDialog.close('/notes');
  }

}
