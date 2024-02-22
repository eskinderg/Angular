import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import * as fromNotes from '../../../../store/reducers/note.reducer';
import { Router } from '@angular/router';
import { NoteApiService } from '../../services/notes.api.service';
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
    private store: Store<fromNotes.INotesState>,
    private oauthService: OAuthService,
    // public activeDialog: NgbActiveModal,
    private notesApiService: NoteApiService,
    public router: Router
  ) {}

  // ngOnInit() {
  // this.note = history.state['note']
  // }

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

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['given_name'];
  }

  restore(note: Note) {
    this.notesApiService.restoreNote({ ...note, archived: false } as Note);
    // this.notesApiService.deleteNote(note);
  }
}
