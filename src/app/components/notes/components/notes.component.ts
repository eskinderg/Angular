import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { NotesApiService } from '../services/notes.api.service';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../../../models/note';
import * as fromNotes from '../../../reducers/notes';
import { ConfirmService } from 'src/app/theme/components/modal';
import { FadeInOutEventNoteItem } from '../../shared/animations/fadeInAndOutNoteItem';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [fadeInAnimation, FadeInOutEventNoteItem],
  host: { '[@routerFadeInAnimation]': '' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {

  constructor(
    private notesApiService: NotesApiService,
    private confirmService: ConfirmService,
    private store: Store<fromNotes.State>
  ) { }

  onAddNote(colour) {
    // alert(colour)

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

    this.confirmService.confirm({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete ?',
      backdrop: true
    }).then(() => {
      this.notesApiService.deleteNote(note);
    }, () => {
    });
    // alert(note.id);
  }

  get Notes() {
    return this.store.select(fromNotes.getNotes);
  }
}
