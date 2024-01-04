import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { NotesApiService } from '../services/notes.api.service';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../../../models/note';
import * as fromNotes from '../../../reducers/notes.reducer';
import { ConfirmService } from 'src/app/fragments/components/dialog';
import { FadeInOutEventNoteItem } from '../../shared/animations/fadeInAndOutNoteItem';
import { FadeInOutNoteListItem } from '../../shared/animations/fadeInAndOutNoteListItem';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [fadeInAnimation, FadeInOutEventNoteItem, FadeInOutNoteListItem],
  host: { '[@routerFadeInAnimation]': '' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {

  constructor(
    private notesApiService: NotesApiService,
    private confirmService: ConfirmService,
    private store: Store<fromNotes.NotesState>,
    public route: Router,
    public r: ActivatedRoute
  ) { }

  onAddNote(colour) {

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

  onNoteDelete(note: Note) {
    const navigationExtras: NavigationExtras = {
      state: { note: note },
      relativeTo: this.r.parent
    };
    this.route.navigate([{ outlets: { 'dialog': ['dialog'] } }], navigationExtras);
  }

  onNoteClick(note: Note) {
    this.route.navigate(['notes', note.id]);
  }

  onChangeNoteText(newText: any, note: Note) {
    this.notesApiService.changeNoteText({ ...note, text: newText });
  }

  onChangeNotePosition({ top, left }, note: Note) {
    this.notesApiService.changeNotePosition({ ...note, left: left, top: top });
  }

  onChangeNoteSize({ height, width }, note: Note) {
    this.notesApiService.changeNoteSize({ ...note, width: width, height: height });
  }

  // onNoteDelete(note: Note) {
  //   this.confirmService.confirm({
  //     title: 'Confirm deletion',
  //     message: 'Are you sure you want to delete ?',
  //     backdrop: true,
  //     centered: false
  //   }).then(() => {
  //     this.notesApiService.deleteNote(note);
  //   }, () => {
  //   });
  //   // alert(note.id);
  // }

  get Notes() {
    return this.store.select(fromNotes.getNotes);
  }

  get Animate() {
    return this.store.select(fromNotes.getNotesAnimate);
  }
}
