import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Note } from '../../../models/note';
import * as NotesActions from '../../../actions/note.actions';
import * as fromRoot from '../../../reducers';
import * as fromNotes from '../../../reducers/note.reducer';

@Injectable()
export class NoteApiService {

  constructor(private store: Store<fromRoot.IAppState>) { }

  get Notes(): Observable<Note[]> {
    return this.store.select(fromNotes.getNotes);
  }

  getNoteById(id: number): Observable<Note> {
    return this.store.select(fromNotes.getNoteById(id));
  }

  selectNote(note: Note): void {
    this.store.dispatch(NotesActions.noteSelect({ payload: note }))
  }

  createNewNote(newNote: Note): void {
    this.store.dispatch(NotesActions.createNote({ payload: newNote }));
  }

  updateNote(note: Note): void {
    this.store.dispatch(NotesActions.updateNote({ payload: note }));
  }

  restoreNote(note: Note): void {
    this.store.dispatch(NotesActions.restoreNote({ payload: note }));
  }

  updateNoteText(note: Note): void {
    this.store.dispatch(NotesActions.updateNoteText({ payload: note }));
  }

  updateNoteHeader(note: Note): void {
    this.store.dispatch(NotesActions.updateNoteHeader({ payload: note }));
  }

  updateNoteSelection(note: Note): void {
    this.store.dispatch(NotesActions.updateNoteSelection({ payload: note }));
  }

  restoreArchivedNote(note: Note): void {
    this.store.dispatch(NotesActions.restoreNote({ payload: note }));
  }

  archiveNote(note: Note): void {
    this.store.dispatch(NotesActions.archiveNote({ payload: { ...note, archived: true } }));
  }

  updateNoteColour(note: Note): void {
    this.store.dispatch(NotesActions.updateNoteColour({ payload: note }));
  }

  deleteNote(note: Note): void {
    this.store.dispatch(NotesActions.deleteNote({ payload: { ...note, archived: true } }));
  }

  changeNoteText(note: Note): void {
    this.store.dispatch(NotesActions.updateNoteText({ payload: note }));
  }

  updateNotePinOrder(note: Note): void {
    this.store.dispatch(NotesActions.updatePinOrder({ payload: { ...note, pinOrder: note.pinOrder ? null : new Date() } }));
  }

  changeNotePosition(note: Note): void {
    this.store.dispatch(NotesActions.updateNotePosition({ payload: note }));
  }

  changeNoteSize(note: Note): void {
    this.store.dispatch(NotesActions.updateNoteSize({ payload: note }));
  }

  get NoteAnimateState() {
    return this.store.select(fromNotes.getNotesAnimate);
  }

  get NotesLength(): Observable<number> {
    return this.store.select(fromNotes.getNotesLength);
  }

  get SelectedNote(): Observable<Note> {
    return this.store.select(fromNotes.getSelectedNote);
  }

  get OpendNote(): Observable<Note> {
    return this.store.select(fromNotes.getOpendNote);
  }

}
