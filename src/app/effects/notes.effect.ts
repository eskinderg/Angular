import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import * as  NotesActions from '../actions/note';
import { NotesDataService } from '../components/notes/services/notes.data.service';
import { catchError, switchMap, map, tap } from 'rxjs/operators';

@Injectable()
export class NotesEffect {

  @Effect()
  save = this.actions$
    .ofType(NotesActions.CREATE_NOTE)
    .pipe(
      switchMap((action: NotesActions.createNote) =>
        this.notesApiService.addNote(action.payload)
        .pipe(
          map(note => new NotesActions.createNoteSuccess(note)),
          catchError(err => of(new NotesActions.createNoteFail(err)))
        )
      )
    );

  @Effect()
  updateNoteText: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE_TEXT)
    .pipe(
      switchMap((action: NotesActions.updateNoteText) =>
        this.notesApiService.updateNote(action.payload)
        .pipe(
          map(note => new NotesActions.updateNoteTextSuccess(note)),
          catchError(err => of(new NotesActions.updateNoteTextFail(err)))
        )
      )
    );

  @Effect()
  updateNotePosition: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE_POSITION)
    .pipe(
      switchMap((action: NotesActions.updateNotePosition) =>
        this.notesApiService.updateNote(action.payload)
        .pipe(
          map(note => new NotesActions.updateNotePositionSuccess(note)),
          catchError(err => of(new NotesActions.updateNotePositionFail(err)))
        )
      )
    );

  @Effect()
  updateNoteSize: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE_SIZE)
    .pipe(
      switchMap((action: NotesActions.updateNoteSize) =>
        this.notesApiService.updateNote(action.payload)
        .pipe(
          map(note => new NotesActions.updateNoteSizeSuccess(note)),
          catchError(err => of(new NotesActions.updateNoteSizeFail(err)))
        )
      )
    );

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE)
    .pipe(
      switchMap((action: NotesActions.updateNote) =>
        this.notesApiService.updateNote(action.payload)
        .pipe(
          map(note => new NotesActions.updateNoteSuccess(note)),
          catchError(err => of(new NotesActions.createNoteFail(err)))
        )
      )
    );

  @Effect()
  fetch: Observable<Action> = this.actions$
    .ofType(NotesActions.FETCH_NOTES)
    .pipe(
      switchMap(() => this.notesApiService.getNotes()
        .pipe(
          map(notes => new NotesActions.fetchNotesSuccess(notes)),
          catchError(err => of({ type: NotesActions.FETCH_NOTES_FAILURE, payload: err }))
        )
      )
    );

  @Effect()
  delete = this.actions$
    .ofType(NotesActions.DELETE_NOTE)
    .pipe(
      switchMap((action: NotesActions.deleteNote) =>
        this.notesApiService.deleteNote(action.payload)
        .pipe(
          map(note => new NotesActions.deleteNoteSuccess(note)),
          catchError(err => of(new NotesActions.deleteNoteFail(err)))
        )
      )
    );


  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private notesApiService: NotesDataService) { }


}
