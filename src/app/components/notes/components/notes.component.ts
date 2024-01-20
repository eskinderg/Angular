import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotesApiService } from '../services/notes.api.service';
import { Note } from '../../../models/note';
import * as fromNotes from '../../../reducers/notes.reducer';
import { FadeInOutNoteListItem } from '../../shared/animations/fadeInAndOutNoteListItem';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NoteComponent } from './note.component/note.component';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [FadeInOutNoteListItem],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {

  @ViewChild(NoteComponent) appNoteComponent: NoteComponent;

  constructor(
    private notesApiService: NotesApiService,
    private store: Store<fromNotes.NotesState>,
    public route: Router,
    public r: ActivatedRoute
  ) { }

  onAddNote(colour: string) {

    const newNote = new Note({
      header: 'Untitled',
      archived: false,
      text: '',
      colour: colour,
      width: 200,
      height: 150,
      left: Math.floor(Math.random() * 600),
      top: Math.floor(Math.random() * 400)
    });

    this.notesApiService.addNote(newNote);
  }

  updatePinOrder(note: Note) {
    this.notesApiService.updateNotePinOrder(note);
  }

  onNoteDelete(note: Note) {
    const navigationExtras: NavigationExtras = {
      state: { note: note },
      relativeTo: this.r.parent, replaceUrl: false
    };
    this.route.navigate([{ outlets: { 'dialog': ['dialog'] } }], navigationExtras);
  }

  onNoteClick(_note: Note) {
    // this.route.navigate(['notes', note.id]);
  }

  archivedNotes() {
    // this.route.navigate([{ outlets: { 'dialog': ['archive'] } }], {relativeTo: this.r.parent, replaceUrl: false});
    this.route.navigateByUrl('notes/archive');
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

  get Notes() {
    return this.store.select(fromNotes.getNotes);
  }

  get Animate() {
    return this.store.select(fromNotes.getNotesAnimate);
  }
}
